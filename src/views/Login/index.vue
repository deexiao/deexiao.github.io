<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '~/lib/supabaseClient'
import { useMainStore } from '~/store/index.js'

const store = useMainStore()

const router = useRouter()

onMounted(() => {
  store.signedInAdmin = false
  store.signedInGuest = false
  localStorage.clear()
})

const ruleFormAdmin = reactive({
  pass: '',
})

const ruleFormGuest = reactive({
  pass: '',
})

const submitFormAdmin = async (rule) => {
  store.signAdminLoading = true
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'mopjtv@gmail.com',
    password: ruleFormAdmin.pass,
  })
  store.signAdminLoading = false
  if (!error && data.user && data.session) {
    router.push({ path: 'home' })
    store.signedInAdmin = true
    localStorage.setItem('signedIn', true)
  } else {
    rule.pass = ''
    ElMessage.error('Password is Incorrect.')
  }
}

const submitFormGuest = async (rule) => {
  store.signGuestLoading = true
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'deexiao1994@outlook.com',
    password: ruleFormGuest.pass,
  })
  store.signGuestLoading = false
  if (!error && data.user && data.session) {
    router.push({ path: 'home' })
    store.signedInGuest = true
    localStorage.setItem('signedIn', true)
  } else {
    rule.pass = ''
    ElMessage.error('Password is Incorrect.')
  }
}
</script>

<template>
  <el-card class="box-card" v-loading="store.signAdminLoading">
    <template #header>
      <div class="card-header">
        <span>Admin</span>
      </div>
    </template>
    <el-form :model="ruleFormAdmin" status-icon>
      <el-form-item label="Password" prop="pass">
        <el-input
          v-model="ruleFormAdmin.pass"
          type="password"
          autocomplete="off"
          style="width: 180px"
        />
        <el-button
          @click="submitFormAdmin(ruleFormAdmin)"
          style="margin-left: 10px"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
  <br />
  <el-card class="box-card" v-loading="store.signGuestLoading">
    <template #header>
      <div class="card-header">
        <span>Guest</span>
      </div>
    </template>
    <el-form :model="ruleFormGuest" status-icon>
      <el-form-item label="Password" prop="pass">
        <el-input
          v-model="ruleFormGuest.pass"
          autocomplete="off"
          type="password"
          style="width: 180px"
        />
        <el-button
          @click="submitFormGuest(ruleFormGuest)"
          style="margin-left: 10px"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
