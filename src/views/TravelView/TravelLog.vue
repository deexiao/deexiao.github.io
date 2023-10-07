<script setup>
import { useTravelStore } from '~/store/travelStore.js'

const store = useTravelStore()
</script>

<template>
  <div class="home">
    <el-table :data="store.travelLogView" style="width: 100%" border stripe>
      <el-table-column prop="Date" label="Date" min-width="110" />
      <el-table-column prop="Type" label="Type" width="78">
        <template #default="scope">
          <div v-if="scope.row.Type === 'Add'">
            <el-tag>{{ scope.row.Type }}</el-tag>
          </div>
          <div v-if="scope.row.Type === 'Edit'">
            <el-tag type="info">{{ scope.row.Type }}</el-tag>
          </div>
          <div v-if="scope.row.Type === 'Delete'">
            <el-tag type="danger">{{ scope.row.Type }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Log" label="Log" width="169" />
    </el-table>
  </div>
</template>

<style scoped>
.home {
  :deep(.el-table .cell) {
    white-space: pre-line;
  }
}
</style>
