<script setup>
import { RouterView } from 'vue-router'
import { useMainStore } from '~/store/index.js'
import { useRoute } from 'vue-router'

const store = useMainStore()
const route = useRoute()
</script>

<template>
  <div
    v-if="store.signedInAdmin || store.signedInGuest || route.fullPath === '/'"
  >
    <RouterView />
  </div>
</template>

<style scoped></style>
