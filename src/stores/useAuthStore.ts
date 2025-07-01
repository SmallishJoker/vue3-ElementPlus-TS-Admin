import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: !!cookies.get('token'),
        token: cookies.get('token') || ''
    }),
    actions: {
        setAuthStore(isAuthenticated: boolean) {
            this.isAuthenticated = isAuthenticated
        },
        setToken(token: string) {
            cookies.set('token', token, '1h')
            this.token = token
        }
    }
})
