<script setup>
import { onMounted, ref } from 'vue'

const isAdmin = ref(false)

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
</script>

<template>
  <el-divider><div style="font-size: 18px">记账</div></el-divider>
  <el-card class="box-card">
    <!-- <div class="text" v-if="isAdmin">
      <router-link to="/budget">记日常的账 🧾</router-link>
    </div> -->
    <div class="text">
      <router-link to="/travels/Japan">日本 Okinawa 2024.07</router-link>
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
