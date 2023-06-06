<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const theme = ref(window.localStorage.getItem('nuxt-color-mode') === 'dark')

document.addEventListener('storage', (event: any) => {
  theme.value = event.newValue
})

watchEffect(() => {
  window.localStorage.setItem('nuxt-color-mode', theme.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', theme.value)
})

</script>

<template>
  <div>
    <label for='theme'>Dark</label>
    <input type='checkbox' id='theme' v-model='theme' />
  </div>
</template>
