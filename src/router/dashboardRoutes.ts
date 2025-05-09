export const dashboardRoutes = [
    {
        path: '/dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        redirect: '/dashboard/analytics',
        meta: {
            title: 'Dashboard',
            activeMenu: 'Analytics'
        },
        children: [
            {
                path: 'analytics',
                name: 'Analytics',
                component: () => import('@/views/dashboard/Analytics.vue'),
                meta: {
                    title: '分析页',
                    activeMenu: 'Analytics'
                }
            },
            {
                path: 'monitor',
                name: 'Monitor',
                component: () => import('@/views/dashboard/Monitor.vue'),
                meta: {
                    title: '监控页',
                    activeMenu: 'Monitor'
                }
            },
            {
                path: 'workplace',
                name: 'Workplace',
                component: () => import('@/views/dashboard/Workplace.vue'),
                meta: {
                    title: '工作台',
                    activeMenu: 'Workplace'
                }
            }
        ]
    }
]
