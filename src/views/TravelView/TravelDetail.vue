<script setup>
import { ref, watchEffect, onBeforeMount, onBeforeUnmount } from 'vue'
import { useTravelStore } from '~/store/travelStore.js'
import { getData } from '~/api'
import { useRoute } from 'vue-router'
import TravelTable from '~/components/Table/TravelTable.vue'
import TravelBill from '~/views/TravelView/TravelBill.vue'

const store = useTravelStore()
const activeName = ref('left')
const selectedTab = ref('Indonesia')
const isMobileScreen = ref(false)

// 当前路径
const currPath = ref('')

watchEffect(async () => {
  const route = useRoute()
  currPath.value = route.params.id
  store.currTab = selectedTab.value
  await getData('Indonesia')
})

const handleClick = (tab, event) => {
  selectedTab.value = store.currTab
  getData('Indonesia')
}

onBeforeMount(() => {
  renderResize()
  window.addEventListener('resize', renderResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', renderResize)
})
const renderResize = () => {
  let width = document.documentElement.clientWidth
  if (width < 500) {
    isMobileScreen.value = true
    activeName.value = 'top'
  } else {
    isMobileScreen.value = false
    activeName.value = 'left'
  }
}

const travelColumn = ref([
  { prop: 'Date', label: 'Date' },
  { prop: 'Owner', label: 'Owner' },
  { prop: 'Type', label: 'Type' },
  { prop: 'Info', label: 'Info' },
  { prop: 'Paid', label: 'Paid' },
  { prop: 'Group', label: 'Group' },
])
</script>

<template>
  <el-tabs
    class="demo-tabs"
    @tab-click="handleClick"
    :tab-position="activeName"
  >
    <el-tab-pane :label="currPath + ' 记账'">
      <TravelTable
        :tableData="store.travelTableView"
        :echartsData="store.budgetEchartsData"
        :tableName="`travel-order-table`"
        :priceAll="store.monthPriceAll"
        v-model:form="store.travelForm"
        :isMobileScreen="isMobileScreen"
        :column="travelColumn"
      />
    </el-tab-pane>
    <el-tab-pane :label="currPath + ' 账单'">
      <TravelBill />
    </el-tab-pane>
  </el-tabs>
</template>

<style></style>
