import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTravelStore = defineStore('store', () => {
  const currTab = ref('Indonesia')
  const tableLoading = ref(false)
  const pageLoading = ref(false)
  const travelTable = ref([])
  const travelTableView = ref([])
  const travelBillTable = ref([])
  const travelBillPerPerson = ref([])
  const travelLog = ref([])
  const travelLogView = ref([])
  const travelForm = ref({
    Date: '',
    Info: '',
    Group: [],
    Paid: 0,
    Owner: '',
    PaidBy: 'CNY',
  })

  return {
    currTab,
    tableLoading,
    travelTable,
    travelTableView,
    travelBillTable,
    travelBillPerPerson,
    travelForm,
    pageLoading,
    travelLog,
    travelLogView,
  }
})
