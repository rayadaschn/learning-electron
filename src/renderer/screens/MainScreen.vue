<script setup lang="tsx">
import { onMounted, ref } from 'vue'
import { login } from '../api/user'

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

const handleLogin = () => {
  login({
    password: '123456',
    username: '1122',
    key: '123456',
    captcah: '123456',
  }).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div>你好呀! {{ appVersion }}</div>
  <el-button @click="handleLogin">请求用户</el-button>
</template>
