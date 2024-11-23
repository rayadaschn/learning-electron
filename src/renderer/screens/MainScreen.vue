<script setup lang="tsx">
import { onMounted, ref } from 'vue'

const appVersion = ref('Unknown')

onMounted((): void => {
  // Get application version from package.json version string (Using IPC communication)
  getApplicationVersionFromMainProcess()
})

const getApplicationVersionFromMainProcess = (): void => {
  window.mainApi.invoke('msgRequestGetVersion').then((result: string) => {
    appVersion.value = result
  })
}
</script>

<template>
  <div>你好呀!</div>
  <el-button>按钮11</el-button>
</template>
