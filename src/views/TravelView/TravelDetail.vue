<script setup>
import { ref, watchEffect, onBeforeMount, onBeforeUnmount } from 'vue'
import { useTravelStore } from '~/store/travelStore.js'
import { getData } from '~/api'
import TravelTable from '~/components/Table/TravelTable.vue'
import TravelBill from '~/views/TravelView/TravelBill.vue'
import TravelCurrency from '~/views/TravelView/TravelCurrency.vue'
import TravelLog from '~/views/TravelView/TravelLog.vue'

const store = useTravelStore()
const activeName = ref('left')
const selectedTab = ref('Indonesia')
const isMobileScreen = ref(false)

watchEffect(async () => {
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
</script>

<template>
  <el-tabs
    class="demo-tabs"
    @tab-click="handleClick"
    :tab-position="activeName"
  >
    <el-tab-pane label="印尼记账">
      <TravelTable
        :tableData="store.travelTableView"
        :echartsData="store.budgetEchartsData"
        :tableName="`travel-order-table`"
        :priceAll="store.monthPriceAll"
        v-model:form="store.travelForm"
        :isMobileScreen="isMobileScreen"
      />
    </el-tab-pane>
    <el-tab-pane label="账单统计">
      <TravelBill />
    </el-tab-pane>
    <el-tab-pane label="汇率换算">
      <TravelCurrency />
    </el-tab-pane>
    <el-tab-pane label="日志">
      <TravelLog />
    </el-tab-pane>
  </el-tabs>
</template>

<style></style>
