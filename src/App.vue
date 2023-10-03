<script setup>
import { RouterView } from 'vue-router'
import { useMainStore } from '~/store/index.js'
import { useRoute } from 'vue-router'

const store = useMainStore()
const route = useRoute()

const isSignedIn = () => {
  const o = localStorage.getItem('signedIn')
  return o
}
</script>

<template>
  <div
    v-if="
      store.signedInAdmin ||
      store.signedInGuest ||
      isSignedIn() ||
      route.fullPath === '/'
    "
  >
    <RouterView />
  </div>
  <div v-else>
    <router-link to="/">please login</router-link>
  </div>
</template>

<style scoped></style>
