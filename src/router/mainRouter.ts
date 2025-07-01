import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from '@/utils/nprogress'
import { dashboardRoutes } from './dashboardRoutes'
import { formViewRoutes } from './formViewRoutes'
import { listViewRoutes } from './listViewRoutes'
import { detailViewRoutes } from './detailViewRoutes'
import { systemViewRoutes } from './systemViewRoutes'
import { useAuthStore } from '@/stores/useAuthStore'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue'),
        meta: { public: true } // 标记为公共路由，无需登录
    },
    {
        path: '/',
        component: () => import('@/views/layout/Layout.vue'),
        redirect: '/analytics',
        meta: {
            title: 'Layout',
            activeMenu: 'Layout',
            requiresAuth: true
        },
        children: [
            ...dashboardRoutes,
            ...formViewRoutes,
            ...listViewRoutes,
            ...detailViewRoutes,
            ...systemViewRoutes
        ]
    },
    // 404 路由 - 必须放在最后
    {
        path: '/:pathMatch(.*)*',  // Vue Router 4 的新语法
        name: 'NotFound',
        redirect: '/login'
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const useAuth = useAuthStore()
    NProgress.start()
    if (to.name === 'Login' && useAuth.isAuthenticated) {
        next({
            name: 'Analytics'
        })
    } else if (to.meta.requiresAuth && !useAuth.isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
})

router.afterEach(() => {
    NProgress.done()
})  
