<template>
    <el-icon>
        <component :is="iconComponent" />
    </el-icon>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'

interface Props {
    iconName: string
}

const props = withDefaults(defineProps<Props>(), {
    iconName: 'ElementPlus'
})

const iconComponent = shallowRef()

const loadIcon = async () => {
    try {
        const module = await import('@element-plus/icons-vue')
        iconComponent.value = module[props.iconName as keyof typeof module]
    } catch (error) {
        console.error('图标加载失败:', error)
    }
}

loadIcon()
</script>