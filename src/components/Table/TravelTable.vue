<script setup>
import { ref, onMounted } from 'vue'
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
import { useMainStore } from '~/store/index.js'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

const isAdmin = ref(false)

const dialog = ref(false) //抽屉里的对话框
const controlButton = ref('')
const editID = ref(0)

const classPCScreen = 'pc-screen'
const classMobileScreen = 'mobile-screen'

const store = useTravelStore()
const storeMain = useMainStore()

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

onMounted(() => {
  const email = JSON.parse(
    localStorage.getItem('sb-zamyvhhsclvooccinpdk-auth-token')
  ).user.email
  if (email === 'mopjtv@gmail.com') {
    isAdmin.value = true
  } else {
    isAdmin.value = false
  }
})

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
  if (isAdmin.value) {
    editID.value = row.id
    dialog.value = true
    const tempRow = JSON.parse(JSON.stringify(row))
    tempRow.Date = '2023-' + tempRow.Date
    emit('update:form', tempRow)
    controlButton.value = 'Edit'
  }
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
      <el-table-column prop="Date" label="Date" width="58" />
      <el-table-column prop="Owner" label="Owner" width="68" />
      <el-table-column prop="Type" label="Type" width="54" />
      <el-table-column prop="Info" label="Info" width="80" />
      <el-table-column prop="Paid" label="Paid" width="55" />
      <el-table-column prop="Group" label="Group" width="72" />

      <!-- <template v-for="c in props.column" :key="c.prop">
        <el-table-column :prop="c.prop" :label="c.label" />
      </template> -->
    </el-table>
    <!-- <div class="example-pagination-block"> -->
    <!-- <el-pagination layout="prev, pager, next" :total="100" /> -->
    <!-- </div> -->
  </div>
  <el-affix position="bottom" :offset="20" v-if="isAdmin">
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
