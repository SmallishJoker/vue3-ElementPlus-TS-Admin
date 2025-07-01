export const systemViewRoutes = [
    {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/views/system/UserManagement.vue'),
        meta: {
            title: '用户管理',
            activeMenu: 'UserManagement',
            requiresAuth: true
        }
    },
    {
        path: 'roleManagement',
        name: 'roleManagement',
        component: () => import('@/views/system/RoleManagement.vue'),
        meta: {
            title: '角色管理',
            activeMenu: 'RoleManagement',
            requiresAuth: true
        }
    },
    {
        path: 'permissionManagement',
        name: 'permissionManagement',
        component: () => import('@/views/system/PermissionManagement.vue'),
        meta: {
            title: '权限管理',
            activeMenu: 'PermissionManagement',
            requiresAuth: true
        }
    }
]