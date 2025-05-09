import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        isCollapse: false,
        windowWidth: 0
    }),
    actions: {
        setIsCollapse(isCollapse: boolean) {
            this.isCollapse = isCollapse
        },
        setWindowWidth(windowWidth: number) {
            this.windowWidth = windowWidth
        }
    }
})