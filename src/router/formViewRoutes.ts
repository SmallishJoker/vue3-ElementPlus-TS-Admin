export const formViewRoutes = [
    {
        path: 'basicForm',
        name: 'basicForm',
        component: () => import('@/views/formViews/BasicForm.vue'),
        meta: {
            title: '基础表单',
            activeMenu: 'BasicForm',
            requiresAuth: true
        }
    },
    {
        path: 'stepForm',
        name: 'stepForm',
        component: () => import('@/views/formViews/StepForm.vue'),
        meta: {
            title: '分步表单',
            activeMenu: 'StepForm',
            requiresAuth: true
        }
    },
    {
        path: 'advancedForm',
        name: 'advancedForm',
        component: () => import('@/views/formViews/AdvanceForm.vue'),
        meta: {
            title: '高级表单',
            activeMenu: 'AdvancedForm',
            requiresAuth: true
        }
    }
]