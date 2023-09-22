<script setup>
import { getTravelData } from '~/api'
import { watchEffect } from 'vue'
import { useTravelStore } from '~/store/travelStore'

const store = useTravelStore()
watchEffect(() => {
  getTravelData('travel-table')
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>记日常的旅行 ✈️</span>
      </div>
    </template>
    <div v-for="o in store.travelTable" :key="o" class="text item">
      <router-link :to="`/budget-app/travels/${o.TravelPlace}`">{{
        o.TravelPlace
      }}</router-link>
    </div>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
</style>
