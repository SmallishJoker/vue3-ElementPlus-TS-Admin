export const detailViewRoutes = [
    {
        path: 'basicDetail',
        name: 'basicDetail',
        component: () => import('@/views/detailViews/BasicDetail.vue'),
        meta: {
            title: '基础详情',
            activeMenu: 'BasicDetail',
            requiresAuth: true
        }
    },
    {
        path: 'advancedDetail',
        name: 'advancedDetail',
        component: () => import('@/views/detailViews/AdvancedDetail.vue'),
        meta: {
            title: '高级详情',
            activeMenu: 'AdvancedDetail',
            requiresAuth: true
        }
    }
]
