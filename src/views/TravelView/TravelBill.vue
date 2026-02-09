<script setup>
import { useTravelStore } from '~/store/travelStore'
import { computed } from 'vue'
const store = useTravelStore()

const debtText = computed(() => {
  const table = store.travelBillTable
  if (!Array.isArray(table)) return ''

  for (const row of table) {
    const creditor = row.name
    for (const [person, amount] of Object.entries(row)) {
      if (person !== 'name' && amount > 0) {
        return `${person} 需要转账给 ${creditor} ${amount} 元`
      }
    }
  }
  return ''
})
</script>
<template>
  <el-table :data="store.travelBillTable" style="width: 100%" border stripe>
    <el-table-column prop="name" label="" />
    <el-table-column prop="张秋禾" label="张秋禾(欠)" />
    <el-table-column prop="萧笛" label="萧笛(欠)" />
    
  </el-table>

  <div v-if="debtText" style="margin-top: 12px; text-align: center; color: #606266">
      {{ debtText }}
    </div>

  <el-card style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <span>统计消费</span>
      </div>
    </template>
    <el-table
      :data="store.travelBillPerPerson"
      style="--el-table-border-color: none"
    >
      <el-table-column prop="张秋禾" label="张秋禾" />
      <el-table-column prop="萧笛" label="萧笛" />
    </el-table>
  </el-card>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
  margin-bottom: 18px;
}
</style>
