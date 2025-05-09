export const systemViewRoutes = [
    {
        path: '/system',
        component: () => import('@/views/system/System.vue'),
        redirect: '/system/userManagement',
        meta: {
            title: '系统管理',
            activeMenu: 'System'
        },
        children: [
            {
                path: 'userManagement',
                name: 'userManagement',
                component: () => import('@/views/system/UserManagement.vue'),
                meta: {
                    title: '用户管理',
                    activeMenu: 'UserManagement'
                }
            },
            {
                path: 'roleManagement',
                name: 'roleManagement',
                component: () => import('@/views/system/RoleManagement.vue'),
                meta: {
                    title: '角色管理',
                    activeMenu: 'RoleManagement'
                }
            },
            {
                path: 'permissionManagement',
                name: 'permissionManagement',
                component: () => import('@/views/system/PermissionManagement.vue'),
                meta: {
                    title: '权限管理',
                    activeMenu: 'PermissionManagement'
                }
            }
        ]
    }
]