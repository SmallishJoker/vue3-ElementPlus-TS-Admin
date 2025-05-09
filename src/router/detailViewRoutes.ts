export const detailViewRoutes = [
    {
        path: '/detail/',
        name: 'detail',
        component: () => import('@/views/detailViews/Detail.vue'),
        redirect: '/detail/basicDetail',
        meta: {
            title: '基础详情',
            activeMenu: 'BasicDetail'
        },
        children: [
            {
                path: 'basicDetail',
                name: 'basicDetail',
                component: () => import('@/views/detailViews/BasicDetail.vue'),
                meta: {
                    title: '基础详情',
                    activeMenu: 'BasicDetail'
                }
            },
            {
                path: 'advancedDetail',
                name: 'advancedDetail',
                component: () => import('@/views/detailViews/AdvancedDetail.vue'),
                meta: {
                    title: '高级详情',
                    activeMenu: 'AdvancedDetail'
                }
            }
        ]
    }
]
