<script setup>
import { ref } from 'vue'
import TravelDrawer from '~/components/Drawer/TravelDrawer.vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { getData } from '~/api'
import { Plus } from '@element-plus/icons'
import moment from 'moment'
import { useTravelStore } from '~/store/travelStore.js'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

const dialog = ref(false) //抽屉里的对话框
const controlButton = ref('')
const editID = ref(0)

const classPCScreen = 'pc-screen'
const classMobileScreen = 'mobile-screen'

const store = useTravelStore()

const props = defineProps([
  'priceAll',
  'form',
  'tableData',
  'echartsData',
  'tableName',
  'isMobileScreen',
  'column',
])

const emit = defineEmits(['update:form'])

const addDialog = () => {
  dialog.value = true
  controlButton.value = 'Add'
  let newObj = {}
  for (let o in props.form) {
    if (o === 'id') continue
    if (o === 'Group') {
      newObj[o] = []
    } else {
      newObj[o] = ''
    }
  }
  newObj.Date = moment().format('YYYY-MM-DD')
  emit('update:form', newObj)
}

const handleRowClick = (row) => {
  editID.value = row.id
  dialog.value = true
  const tempRow = JSON.parse(JSON.stringify(row))
  tempRow.Date = '2023-' + tempRow.Date
  emit('update:form', tempRow)
  controlButton.value = 'Edit'
}
</script>

<template>
  <div :class="isMobileScreen ? classMobileScreen : classPCScreen">
    <el-table
      :data="props.tableData"
      @row-click="handleRowClick"
      style="width: 100%"
      v-loading="store.tableLoading"
    >
      <template v-for="c in props.column" :key="c.prop">
        <el-table-column :prop="c.prop" :label="c.label" />
      </template>
    </el-table>
  </div>
  <el-affix position="bottom" :offset="20">
    <el-button
      circle
      type="primary"
      @click="addDialog"
      style="width: 50px; height: 50px"
    >
      <Plus @click="addDialog" style="width: 1em; height: 1em" />
    </el-button>
  </el-affix>
  <TravelDrawer
    @updatePageData="getData('Indonesia')"
    :tableName="props.tableName"
    :controlButton="controlButton"
    :editID="editID"
    :tableData="props.tableData"
    v-model:dialog="dialog"
    v-model:form="props.form"
    :isMobileScreen="props.isMobileScreen"
  />
</template>

<style scoped>
.add-button {
  width: 115px;
}
.pc-screen {
  display: flex;
  flex: space-around;
}
.price-show {
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
}
.mobile-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 800px;
}
</style>
