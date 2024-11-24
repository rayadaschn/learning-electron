import http from '@/renderer/utils/request'
import type { LoginData } from './types'

/**
 * 登录
 */
export function login(data: LoginData) {
  return http.post<string>('/u/loginByJson', data)
}

/**
 * 退出登陆
 */
export function logout() {
  return http.post('/u/loginByJson')
}
