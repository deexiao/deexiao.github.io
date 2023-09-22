<script setup>
import Table from '~/components/Table/BudgetTable.vue'
import { ref, watchEffect, onBeforeMount, onBeforeUnmount } from 'vue'
import { useBudgetStore } from '~/store/budgetStore.js'
import { getData } from '~/api'

const store = useBudgetStore()
const activeName = ref('left')
const selectedTab = ref('每月定期支出')
const isMobileScreen = ref(false)

watchEffect(() => {
  store.currTab = selectedTab.value
  getData(store.currTab)
})

const handleClick = (tab, event) => {
  selectedTab.value = tab.props.label
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

const budgetColumn = ref([
  { prop: 'Name', label: 'Name' },
  { prop: 'Price', label: 'Price' },
])

const foodColumn = ref([
  { prop: 'Name', label: 'Name' },
  { prop: 'Price', label: 'Price' },
  { prop: 'Date', label: 'Date' },
])
</script>

<template>
  <el-tabs
    class="demo-tabs"
    @tab-click="handleClick"
    :tab-position="activeName"
  >
    <el-tab-pane label="每月定期支出">
      <Table
        :tableData="store.budgetTable"
        :echartsData="store.budgetEchartsData"
        :tableName="`budget-table`"
        :priceAll="store.monthPriceAll"
        v-model:form="store.budgetForm"
        :isMobileScreen="isMobileScreen"
        :column="budgetColumn"
      />
    </el-tab-pane>
    <el-tab-pane label="买菜开销">
      <Table
        :tableData="store.foodTable"
        :echartsData="store.foodEchartsData"
        :tableName="`food-table`"
        :priceAll="store.foodPriceAll"
        v-model:form="store.foodForm"
        :isMobileScreen="isMobileScreen"
        :column="foodColumn"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<style></style>
