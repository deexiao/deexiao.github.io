import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainStore = defineStore('store', () => {
  const signedInAdmin = ref(false)
  const signedInGuest = ref(false)

  return {
    signedInAdmin,
    signedInGuest,
  }
})
