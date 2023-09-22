import { supabase } from '~/lib/supabaseClient'
import { useBudgetStore } from '~/store/budgetStore.js'
import { useTravelStore } from '~/store/travelStore.js'
import _ from 'lodash'

function refreshTravelBill() {
  const store = useTravelStore()
  const format = {
    萧笛: { 张秋禾: 0, 吴世杰: 0, 李树叶: 0 },
    张秋禾: { 萧笛: 0, 吴世杰: 0, 李树叶: 0 },
    吴世杰: { 张秋禾: 0, 萧笛: 0, 李树叶: 0 },
    李树叶: { 张秋禾: 0, 吴世杰: 0, 萧笛: 0 },
  }

  const d = JSON.parse(JSON.stringify(store.travelTableView))
  let tableData = []

  for (let o = 0; o < d.length; o++) {
    const owner = d[o].Owner
    const group = d[o].Group
    const paid = d[o].Paid
    for (let i = 0; i < group.length; i++) {
      if (group.includes(owner)) {
        group[i] !== owner && (format[owner][group[i]] += paid / group.length)
        group[i] !== owner && (format[group[i]][owner] -= paid / group.length)
      } else {
        format[owner][group[i]] += paid / group.length
        format[group[i]][owner] -= paid / group.length
      }
    }
  }
  for (let o in format) {
    for (let i in format[o]) format[o][i] = Math.round(format[o][i])
    const newFormat = Object.assign({ name: o }, format[o])
    tableData.push(newFormat)
  }
  store.travelBillTable = tableData
}

export async function getTravelOrderData() {
  const store = useTravelStore()
  store.tableLoading = true
  const { data } = await supabase.from('travel-order-table').select()
  store.tableLoading = false
  store.travelTableView = _.orderBy(data, 'Date', 'desc')
  for (let o = 0; o < store.travelTableView.length; o++) {
    store.travelTableView[o].Date = store.travelTableView[o].Date.slice(-5)
  }
  refreshTravelBill()
}

export async function getTravelData() {
  const store = useTravelStore()
  const { data } = await supabase.from('travel-table').select()
  store.travelTable = data
}

export async function addData(tableName, form) {
  if (tableName === 'travel-order-table') {
    await supabase.from(tableName).insert([form]).select()
  } else {
    await supabase.from(tableName).insert([form]).select()
  }
}

export async function editData(tableName, form, editID) {
  if (tableName === 'travel-order-table') {
    await supabase.from(tableName).update([form]).eq('id', editID)
  } else {
    await supabase.from(tableName).update([form]).eq('id', editID)
  }
}

export async function getData(tab) {
  console.log('tab', tab)
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
