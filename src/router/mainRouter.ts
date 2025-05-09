import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from '@/utils/nprogress'
import { dashboardRoutes } from './dashboardRoutes'
import { formViewRoutes } from './formViewRoutes'
import { listViewRoutes } from './listViewRoutes'
import { detailViewRoutes } from './detailViewRoutes'   
import { systemViewRoutes } from './systemViewRoutes'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard/analytics',
        meta: {
            title: 'Dashboard',
            activeMenu: 'Analytics'
        }
    },
    ...dashboardRoutes,
    ...formViewRoutes,
    ...listViewRoutes,
    ...detailViewRoutes,
    ...systemViewRoutes
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})  
