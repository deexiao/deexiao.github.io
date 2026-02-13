import { supabase } from '~/lib/supabaseClient'
import { useTravelStore } from '~/store/travelStore.js'
import _ from 'lodash'
import { fx } from 'money'
import moment from 'moment'

fx.base = 'USD'
fx.rates = {
  CNY: 6.92,
  PHP: 58.5,
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
    const obj = fx(Number(d[o].Paid)).from('PHP').to('CNY').toFixed(0)
    if (d[o].PaidBy === 'CNY') d[o].Paid = cny
    if (d[o].PaidBy === 'USD') d[o].Paid = usd
    if (d[o].PaidBy === 'PHP') d[o].Paid = obj

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
    const obj = fx(Number(data.Paid)).from('CNY').to('PHP').toFixed(0)

    if (data.PaidBy === 'CNY') {
      data.Paid = cny
      data.PaidTableShow =
        '🇨🇳 ' + cny + ' *' + '\n' + '🇺🇸 ' + usd + '\n' + '🇵🇭 ' + obj
    }
    if (data.PaidBy === 'USD') {
      data.Paid = usd
      data.PaidTableShow =
        '🇨🇳 ' + cny + '\n' + '🇺🇸 ' + usd + ' *' + '\n' + '🇵🇭 ' + obj
    }
    if (data.PaidBy === 'PHP') {
      data.Paid = obj
      data.PaidTableShow =
        '🇨🇳 ' + cny + '\n' + '🇺🇸 ' + usd + '\n' + '🇵🇭 ' + obj + ' *'
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
    case 'travelPlace':
      await getTravelOrderData()
      break
    default:
      break
  }
}
