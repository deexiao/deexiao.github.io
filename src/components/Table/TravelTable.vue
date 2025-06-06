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

const props = defineProps([
  'priceAll',
  'form',
  'tableData',
  'echartsData',
  'tableName',
  'isMobileScreen',
])

const emit = defineEmits(['update:form'])

onMounted(() => {
  const email = JSON.parse(
    localStorage.getItem('sb-jwhybdelwblaonsjhauy-auth-token')
  ).user.email
  if (email === 'mopjtv@gmail.com') {
    isAdmin.value = true
  } else {
    isAdmin.value = false
  }
})

const addDialog = () => {
  groupButtonName.value = '全选'
  dialog.value = true
  controlButton.value = 'Add'
  let newObj = {}
  for (let o in props.form) {
    if (o === 'user_id') continue
    if (o === 'Group') {
      newObj[o] = []
    } else {
      newObj[o] = ''
    }
  }
  newObj.Date = moment().format('YYYY-MM-DD')
  // newObj.PaidDrawerShow = {}
  emit('update:form', newObj)
}

const groupButtonName = ref('全选')
const handleRowClick = (row) => {
  if (isAdmin.value) {
    editID.value = row.user_id
    dialog.value = true
    const tempRow = JSON.parse(JSON.stringify(row))
    tempRow.Date = '2023-' + tempRow.Date
    emit('update:form', tempRow)
    if (tempRow.Group.length === 4) {
      groupButtonName.value = '清空'
    } else {
      groupButtonName.value = '全选'
    }

    controlButton.value = 'Edit'
  }
}
</script>

<template>
  <div class="home">
    <div :class="isMobileScreen ? classMobileScreen : classPCScreen">
      <el-table
        :data="props.tableData"
        @row-click="handleRowClick"
        style="width: 100%"
        v-loading="store.tableLoading"
      >
        <el-table-column prop="Payer" label="Payer" width="69" />
        <el-table-column prop="Info" label="Info" />
        <el-table-column prop="PaidTableShow" label="Spending" width="115" />
        <el-table-column prop="Group" label="Group" />
      </el-table>
    </div>
  </div>
  <el-affix position="bottom" :offset="20" v-if="isAdmin">
    <el-button
      circle
      type="primary"
      style="width: 50px; height: 50px"
      class="clear-button-shadow"
      @click="addDialog"
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
    v-model:groupButtonName="groupButtonName"
    :isMobileScreen="props.isMobileScreen"
  />
</template>

<style scoped>
.home {
  :deep(.el-table .cell) {
    white-space: pre-line;
  }
}
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
.clear-button-shadow {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
</style>
