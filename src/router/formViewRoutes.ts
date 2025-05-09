export const formViewRoutes = [
    {
        path: '/formViews',
        component: () => import('@/views/formViews/Form.vue'),
        redirect: '/formViews/basicForm',
        meta: {
            title: '表单页',
            activeMenu: 'Form'
        },
        children: [
            {
                path: 'basicForm',
                name: 'basicForm',
                component: () => import('@/views/formViews/BasicForm.vue'),
                meta: {
                    title: '基础表单',
                    activeMenu: 'BasicForm'
                }
            },
            {
                path: 'stepForm',
                name: 'stepForm',
                component: () => import('@/views/formViews/StepForm.vue'),
                meta: {
                    title: '分步表单',
                    activeMenu: 'StepForm'
                }
            },
            {
                path: 'advancedForm',
                name: 'advancedForm',
                component: () => import('@/views/formViews/AdvanceForm.vue'),
                meta: {
                    title: '高级表单',
                    activeMenu: 'advancedForm'
                }
            }
        ]
    }
]