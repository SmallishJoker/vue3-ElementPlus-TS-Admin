export const listViewRoutes = [
    {
        path: '/listViews',
        component: () => import('@/views/listViews/List.vue'),
        redirect: '/listViews/basicList',
        meta: {
            title: '列表页',
            activeMenu: 'List'
        },
        children: [
            {
                path: 'basicList',
                name: 'basicList',
                component: () => import('@/views/listViews/basicList/BasicList.vue'),
                redirect: '/listViews/basicList/articleList',
                meta: {
                    title: '搜索列表',
                    activeMenu: 'BasicList'
                },
                children: [
                    {
                        path: 'articleList',
                        name: 'articleList',
                        component: () => import('@/views/listViews/basicList/ArticleList.vue'),
                        meta: {
                            title: '文章列表',
                            activeMenu: 'ArticleList'
                        }
                    },
                    {
                        path: 'applicationList',
                        name: 'applicationList',
                        component: () => import('@/views/listViews/basicList/ApplicationList.vue'),
                        meta: {
                            title: '应用列表',
                            activeMenu: 'ApplicationList'
                        }
                    },
                    {
                        path: 'projectList',
                        name: 'projectList',
                        component: () => import('@/views/listViews/basicList/ProjectList.vue'),
                        meta: {
                            title: '项目列表',
                            activeMenu: 'ProjectList'
                        }
                    }
                ]
            },
            {
                path: 'searchList',
                name: 'searchList',
                component: () => import('@/views/listViews/SearchList.vue'),
                meta: {
                    title: '搜索列表',
                    activeMenu: 'SearchList'
                }
            },
            {
                path: 'advancedList',
                name: 'advancedList',
                component: () => import('@/views/listViews/AdvancedList.vue'),
                meta: {
                    title: '高级列表',
                    activeMenu: 'AdvancedList'
                }
            }
        ]
    }
]
