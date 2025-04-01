<script setup>
import { ref } from 'vue'
import { supabase } from '~/lib/supabaseClient'
import Drawer from '~/components/Drawer/BudgetDrawer.vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { getData } from '~/api'
import { Delete, Plus, Edit } from '@element-plus/icons'
import moment from 'moment'

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

const deleteRow = async (index) => {
  ElMessageBox.confirm('Do you want to submit?')
    .then(async () => {
      const deleteRow = props.tableData.splice(index, 1)
      await supabase
        .from(props.tableName)
        .delete()
        .eq('user_id', deleteRow[0].user_id)
      getData()
    })
    .catch(() => {
      // catch error
      console.log('catch error')
    })
}

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
    >
      <template v-for="c in props.column" :key="c.prop">
        <el-table-column :prop="c.prop" :label="c.label" />
      </template>
      <el-table-column fixed="right" width="80px">
        <template #header>
          <Plus @click="addDialog" style="width: 1em; height: 1em" />
        </template>
        <template #default="scope">
          <Delete
            @click="deleteRow(scope.$index)"
            style="width: 1em; height: 1em; margin-right: 15px"
          />
          <Edit
            @click="handleEdit(scope.$index, scope.row)"
            style="width: 1em; height: 1em"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="price-show">Price: {{ props.priceAll }}</div>
    <v-chart
      :option="props.echartsData"
      autoresize
      :init-options="{ width: 320, height: 320 }"
    />
  </div>
  <Drawer
    @updatePageData="getData()"
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
