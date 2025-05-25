/* eslint-disable style/indent */
import type { FetchError } from 'ofetch'
import { defineStore } from 'pinia'

interface User {
    id: string
    email: string
    name: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: false
    }),

    actions: {
        async login(credentials: { email: string; password: string }) {
            try {
                await $fetch('/auth/login', {
                    method: 'POST',
                    baseURL: useRuntimeConfig().public.apiBase as string,
                    credentials: 'include',
                    body: credentials
                })

                await this.fetchUser()
                return true
            } catch (error: unknown) {
                const fetchError = error as FetchError
                console.error('Login failed:', fetchError.data?.message || fetchError.message)
                return false
            }
        },

        async fetchUser() {
            try {
                const user = await $fetch<User>('/auth/me', {
                    baseURL: useRuntimeConfig().public.apiBase as string,
                    credentials: 'include'
                })

                this.user = user
                this.isAuthenticated = true
                return user
            } catch (error: unknown) {
                const fetchError = error as FetchError
                console.error('Fetch user failed:', fetchError.data?.message || fetchError.message)
                this.logout()
                return null
            }
        },

        async logout() {
            try {
                await $fetch('/auth/logout', {
                    method: 'POST',
                    baseURL: useRuntimeConfig().public.apiBase as string,
                    credentials: 'include'
                })
            } catch (error: unknown) {
                const fetchError = error as FetchError
                console.error('Logout failed:', fetchError.data?.message || fetchError.message)
            } finally {
                this.$reset()
            }
        },

        async refreshToken() {
            try {
                await $fetch('/auth/refresh', {
                    method: 'POST',
                    baseURL: useRuntimeConfig().public.apiBase as string,
                    credentials: 'include'
                })
                return true
            } catch (error: unknown) {
                const fetchError = error as FetchError
                console.error('Refresh token failed:', fetchError.data?.message || fetchError.message)
                this.logout()
                return false
            }
        }
    }
})