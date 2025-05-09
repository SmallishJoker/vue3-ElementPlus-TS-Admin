import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export const useRouterActive = defineStore('routerActive', {
    state: () => ({
        activeMenu: 'Analytics',
        routerList: [] as RouteRecordRaw[]
    }),
    actions: {
        setActiveMenu(menu: string) {
            this.activeMenu = menu
        },
        setRouterList(list: RouteRecordRaw[]) {
            this.routerList = list
        }
    },
    getters: {
        getActiveMenu: (state) => state.activeMenu,
        getRouterList: (state) => state.routerList
    }
}) 