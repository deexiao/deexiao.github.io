<script setup>
import { useTravelStore } from '~/store/travelStore'

const store = useTravelStore()
</script>
<template>
  <el-table :data="store.travelBillTable" style="width: 100%" border stripe>
    <el-table-column prop="name" label="" width="73" />
    <el-table-column prop="萧笛" label="萧笛" width="73" />
    <el-table-column prop="张秋禾" label="张秋禾" width="73" />
    <el-table-column prop="吴世杰" label="吴世杰" width="73" />
    <el-table-column prop="李树叶" label="李树叶" />
  </el-table>
  <div></div>
  <el-card style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <span>人均消费</span>
      </div>
    </template>
    <div class="text">¥ {{ store.travelBillPerPerson }}</div>
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
