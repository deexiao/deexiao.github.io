import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTravelStore = defineStore('store', () => {
  const currTab = ref('Indonesia')
  const tableLoading = ref(false)
  const travelTable = ref([])
  const travelTableView = ref([])
  const travelBillTable = ref([])
  const travelForm = ref({
    Date: '',
    Info: '',
    Group: [],
    Paid: 0,
    Owner: '',
  })

  return {
    currTab,
    tableLoading,
    travelTable,
    travelTableView,
    travelBillTable,
    travelForm,
  }
})
