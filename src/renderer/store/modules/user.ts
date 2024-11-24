import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    token: '',
    userInfo: null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
  },
})
