export const listViewRoutes = [
    {
        path: 'basicList',
        name: 'basicList',
        component: () => import('@/views/listViews/basicList/BasicList.vue'),
        meta: {
            title: '搜索列表',
            activeMenu: 'BasicList',
            requiresAuth: true
        }
    },
    {
        path: 'searchList',
        name: 'searchList',
        component: () => import('@/views/listViews/SearchList.vue'),
        meta: {
            title: '搜索列表',
            activeMenu: 'SearchList',
            requiresAuth: true
        }
    },
    {
        path: 'advancedList',
        name: 'advancedList',
        component: () => import('@/views/listViews/AdvancedList.vue'),
        meta: {
            title: '高级列表',
            activeMenu: 'AdvancedList',
            requiresAuth: true
        }
    }
]
