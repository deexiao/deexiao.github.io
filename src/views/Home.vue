<template>
  <el-divider><div style="font-size: 18px">XD 日常</div></el-divider>
  <el-card class="box-card">
    <div class="text">
      <router-link to="/budget-app/budget">记日常的账 🧾</router-link>
    </div>
    <div class="text">
      <router-link to="/budget-app/travels">记日常的旅行 ✈️</router-link>
    </div>
  </el-card>
</template>

<style scoped>
.text {
  font-size: 14px;
  padding: 8px 0;
}

.box-card {
  width: 100%;
}
</style>
