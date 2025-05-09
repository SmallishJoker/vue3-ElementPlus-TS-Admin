<template>
    <el-scrollbar height="100%">
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :default-active="activeMenu"
            @select="handleSelect" :border="false">
            <template v-for="item in menuData" :key="item.index || item.title">
                <MenuNode :node="item" />
            </template>
        </el-menu>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { watch, getCurrentInstance, computed } from 'vue'
import MenuNode from '../menu/MenuNode.vue'
import { useRouterActive } from '@/stores/useRouter'
import { useLayoutStore } from '@/stores/useLayoutStore'
import { storeToRefs } from 'pinia'

const instance = getCurrentInstance()
const route = useRoute()
const routerStore = useRouterActive()
const { activeMenu } = storeToRefs(routerStore)
const layoutStore = useLayoutStore()
const isCollapse = computed(() => layoutStore.isCollapse)

// 监听路由变化 窗口宽度变化 折叠状态变化
watch([route, isCollapse, () => layoutStore.windowWidth], ([newRoute, newIsCollapse, newWidth], [, , oldWidth]) => {
    if (newRoute.name) {
        routerStore.setActiveMenu(newRoute.name as string)
    }

    document.documentElement.style.setProperty('--el-aside-width', newIsCollapse ? '64px' : '200px');
    layoutStore.setIsCollapse(newIsCollapse)

    if (newWidth !== 0 && newWidth !== oldWidth) {
        resizeHandler()
    }
}, { immediate: true })

const router = useRouter()

function handleSelect(value: string) {
    router.push({
        name: value
    })
}

const menuData = [
    {
        index: 'Dashborad',
        title: 'Dashborad',
        icon: 'Odometer',
        isRoot: true,
        children: [
            { index: 'Analytics', label: '分析页' },
            { index: 'Monitor', label: '监控页' },
            { index: 'Workplace', label: '工作台' }
        ]
    },
    {
        index: 'Form',
        title: '表单页',
        icon: 'Edit',
        isRoot: true,
        children: [
            { index: 'basicForm', label: '基础表单' },
            { index: 'stepForm', label: '分步表单' },
            { index: 'advancedForm', label: '高级表单' },
        ]
    },
    {
        index: 'List',
        title: '列表页',
        icon: 'List',
        isRoot: true,
        children: [
            {
                index: 'basicList',
                title: '搜索列表',
                children: [
                    { index: 'articleList', label: '文章列表' },
                    { index: 'applicationList', label: '应用列表' },
                    { index: 'projectList', label: '项目列表' },
                ]
            },
            { index: 'searchList', label: '搜索列表' },
            { index: 'advancedList', label: '高级列表' },
        ]
    },
    {
        index: 'Detail',
        title: '详情页',
        icon: 'Document',
        isRoot: true,
        children: [
            { index: 'basicDetail', label: '基础详情' },
            { index: 'advancedDetail', label: '高级详情' },
        ]
    },
    {
        index: 'System',
        title: '系统管理',
        icon: 'Setting',
        isRoot: true,
        children: [
            { index: 'userManagement', label: '用户管理' },
            { index: 'roleManagement', label: '角色管理' },
            { index: 'permissionManagement', label: '权限管理' },
        ]
    }
]

const resizeHandler = instance?.appContext.config.globalProperties.$deBounce(() => {
    layoutStore.setIsCollapse(layoutStore.windowWidth < 990)
}, 200)

</script>

<style lang="scss" scoped>
.el-menu {
    border-right: none;
}
</style>