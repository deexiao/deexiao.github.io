<script setup>
import { useMainStore } from '~/store/index.js'
import { onMounted } from 'vue'

const store = useMainStore()

onMounted(() => {
  const email = JSON.parse(
    localStorage.getItem('sb-zamyvhhsclvooccinpdk-auth-token')
  ).user.email
  if (email === 'mopjtv@gmail.com') {
    store.signedInAdmin = true
  } else {
    store.signedInAdmin = false
  }
})
</script>

<template>
  <el-divider><div style="font-size: 18px">XD 日常</div></el-divider>
  <el-card class="box-card">
    <div class="text" v-if="store.signedInAdmin">
      <router-link to="/budget">记日常的账 🧾</router-link>
    </div>
    <div class="text">
      <router-link to="/travels">记日常的旅行 ✈️</router-link>
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
