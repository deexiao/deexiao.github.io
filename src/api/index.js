import { supabase } from '~/lib/supabaseClient'
import { useBudgetStore } from '~/store/budgetStore.js'
import { useTravelStore } from '~/store/travelStore.js'
import _ from 'lodash'
import { fx } from 'money'
import moment from 'moment'

fx.base = 'USD'
fx.rates = {
  CNY: 6.92,
  JPY: 58.5,
  USD: 1,
}

function refreshTravelBill() {
  const store = useTravelStore()
  // 账单表格
  const formatTb = {
    张秋禾: { 萧笛: 0 },
    萧笛: { 张秋禾: 0 },
  }
  // 个人消费
  const formatEc = {
    张秋禾: 0,
    萧笛: 0,
  }

  const d = JSON.parse(JSON.stringify(store.travelTableView))
  let tableData = []

  for (let o = 0; o < d.length; o++) {
    const cny = Number(d[o].Paid).toFixed(0)
    const usd = fx(Number(d[o].Paid)).from('USD').to('CNY').toFixed(0)
    const jpy = fx(Number(d[o].Paid)).from('JPY').to('CNY').toFixed(0)
    if (d[o].PaidBy === 'CNY') d[o].Paid = cny
    if (d[o].PaidBy === 'USD') d[o].Paid = usd
    if (d[o].PaidBy === 'JPY') d[o].Paid = jpy

    const owner = d[o].Owner
    const group = d[o].Group
    const paid = d[o].Paid
    for (let i = 0; i < group.length; i++) {
      formatEc[group[i]] += paid / group.length
      if (group.includes(owner)) {
        group[i] !== owner && (formatTb[owner][group[i]] += paid / group.length)
        group[i] !== owner && (formatTb[group[i]][owner] -= paid / group.length)
      } else {
        formatTb[owner][group[i]] += paid / group.length
        formatTb[group[i]][owner] -= paid / group.length
      }
    }
  }
  for (let o in formatTb) {
    for (let i in formatTb[o]) formatTb[o][i] = Math.round(formatTb[o][i])
    const newFormat = Object.assign({ name: o }, formatTb[o])
    tableData.push(newFormat)
  }
  store.travelBillTable = tableData
  store.travelBillPerPerson = [formatEc]
}

export async function getTravelOrderData() {
  const store = useTravelStore()
  store.tableLoading = true
  const { data } = await supabase.from('travel-order-table').select()
  store.tableLoading = false
  store.travelTableView = _.orderBy(data, 'Date', 'desc')
  for (let o = 0; o < store.travelTableView.length; o++) {
    const data = store.travelTableView[o]
    data.Date = data.Date.slice(-5)
    data.Payer = data.Date.slice(-5) + '\n' + data.Owner + '\n' + data.Type

    const cny = Number(data.Paid).toFixed(0)
    const usd = fx(Number(data.Paid)).from('CNY').to('USD').toFixed(0)
    const jpy = fx(Number(data.Paid)).from('CNY').to('JPY').toFixed(0)

    if (data.PaidBy === 'CNY') {
      data.Paid = cny
      data.PaidTableShow =
        '🇨🇳 ' + cny + ' *' + '\n' + '🇺🇸 ' + usd + '\n' + '🇵🇭 ' + jpy
    }
    if (data.PaidBy === 'USD') {
      data.Paid = usd
      data.PaidTableShow =
        '🇨🇳 ' + cny + '\n' + '🇺🇸 ' + usd + ' *' + '\n' + '🇵🇭 ' + jpy
    }
    if (data.PaidBy === 'JPY') {
      data.Paid = jpy
      data.PaidTableShow =
        '🇨🇳 ' + cny + '\n' + '🇺🇸 ' + usd + '\n' + '🇵🇭 ' + jpy + ' *'
    }

    store.travelTableView[o] = data
  }
  refreshTravelBill()
  getTravelLog()
}

export async function getTravelData() {
  const store = useTravelStore()
  store.pageLoading = true
  const { data } = await supabase.from('travel-table').select()
  store.pageLoading = false
  store.travelTable = data
  //sss
}

export async function getTravelLog() {
  const store = useTravelStore()
  const { data } = await supabase.from('travel-log').select()
  let tempData = []
  for (let o = 0; o < data.length; o++) {
    let obj = data[o]
    obj.Log = JSON.stringify(data[o].Log)
    tempData.push(obj)
  }
  tempData = _.orderBy(tempData, 'Date', 'desc')
  store.travelLog = data
  store.travelLogView = tempData
}

export async function addData(tableName, form) {
  if (tableName === 'travel-order-table') {
    await supabase.from(tableName).insert([form]).select()
    await supabase
      .from('travel-log')
      .insert([
        {
          Date: moment().format('MM-DD h:mm A'),
          Type: 'Add',
          Log: form,
        },
      ])
      .select()
  } else {
    await supabase.from(tableName).insert([form]).select()
  }
}

export async function editData(tableName, form, editID) {
  if (tableName === 'travel-order-table') {
    await supabase.from(tableName).update([form]).eq('user_id', editID)
    await supabase
      .from('travel-log')
      .insert([
        {
          Date: moment().format('MM-DD h:mm a'),
          Type: 'Edit',
          Log: form,
        },
      ])
      .select()
  } else {
    await supabase.from(tableName).update([form]).eq('user_id', editID)
  }
}

export async function getData(tab) {
  switch (tab) {
    case '每月定期支出':
      getBudgetData()
      break
    case '买菜开销':
      getFoodData()
      break
    case 'Indonesia':
      await getTravelOrderData()
      break
    default:
      getBudgetData()
      getFoodData()
      break
  }
}

export async function getBudgetData(tableName) {
  const store = useBudgetStore()

  const { data } = await supabase.from('budget-table').select()

  store.budgetTable = data
  store.budgetTableEcharts = []
  store.monthPriceAll = data.reduce((n, { Price }) => n + Price, 0)

  for (let o = 0; o < data.length; o++) {
    let obj = {}
    obj.name = data[o].Name
    obj.value = data[o].Price
    store.budgetTableEcharts[o] = obj
  }
  store.budgetEchartsData = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
      {
        name: 'Traffic Sources',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: store.budgetTableEcharts,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
}

export async function getFoodData(tableName) {
  const store = useBudgetStore()

  const { data } = await supabase.from('food-table').select()

  store.foodTable = data
  store.foodTableEcharts = []
  store.foodPriceAll = data.reduce((n, { Price }) => n + Price, 0)

  for (let o = 0; o < data.length; o++) {
    let obj = {}
    obj.name = data[o].Name
    obj.value = data[o].Price
    store.foodTableEcharts[o] = obj
  }
  const arr = store.foodTableEcharts.reduce(function (accumulator, cur) {
    const name = cur.name,
      found = accumulator.find(function (elem) {
        return elem.name == name
      })
    if (found) found.value += cur.value
    else accumulator.push(cur)
    return accumulator
  }, [])
  store.foodEchartsData = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
      {
        name: 'Traffic Sources',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: arr,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
}
