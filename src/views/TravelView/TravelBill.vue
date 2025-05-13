<script setup>
import { useTravelStore } from '~/store/travelStore'

const store = useTravelStore()
</script>
<template>
  <el-table :data="store.travelBillTable" style="width: 100%" border stripe>
    <el-table-column prop="name" label="" />
    <el-table-column prop="萧岗" label="萧岗(欠)" />
    <el-table-column prop="萧笛" label="萧笛(欠)" />
  </el-table>

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
      <el-table-column prop="萧岗" label="萧岗" />
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
