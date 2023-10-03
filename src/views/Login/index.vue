<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '~/lib/supabaseClient'
import { useMainStore } from '~/store/index.js'

const store = useMainStore()

const router = useRouter()

const ruleFormAdmin = reactive({
  pass: '',
})

const ruleFormGuest = reactive({
  pass: '',
})

onMounted(() => {
  store.signedInAdmin = false
  store.signedInGuest = false
})

const submitFormAdmin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'mopjtv@gmail.com',
    password: ruleFormAdmin.pass,
  })
  if (!error && data.user && data.session) {
    router.push({ path: 'home' })
    store.signedInAdmin = true
  }
}

const submitFormGuest = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'deexiao1994@outlook.com',
    password: ruleFormGuest.pass,
  })
  if (!error && data.user && data.session) {
    console.log('dataGuest', data)
    router.push({ path: 'home' })
    store.signedInGuest = true
  }
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Admin</span>
      </div>
    </template>
    <el-form :model="ruleFormAdmin" status-icon>
      <el-form-item label="Password" prop="pass">
        <el-input
          v-model="ruleFormAdmin.pass"
          autocomplete="off"
          style="width: 190px"
        />
        <el-button @click="submitFormAdmin()" style="margin-left: 10px"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
  <br />
  <el-card class="box-card">
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
          style="width: 190px"
        />
        <el-button @click="submitFormGuest()" style="margin-left: 10px"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
