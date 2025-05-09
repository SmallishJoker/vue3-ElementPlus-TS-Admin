<template>
    <div class="breadcrumb-container">
        <el-icon class="aside-collapse-icon" @click="handleCollapse" color="var(--primary-text-color)" size="18">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
        </el-icon>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item.path">
                {{ item.meta.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Fold, Expand } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/stores/useLayoutStore'

const route = useRoute()
const breadcrumbList = computed(() => route.matched)
const layoutStore = useLayoutStore()
const isCollapse = computed(() => layoutStore.isCollapse)

const handleCollapse = () => {
    layoutStore.setIsCollapse(!isCollapse.value)
}
</script>

<style scoped lang="scss">
.breadcrumb-container {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    column-gap: 10px;

    .aside-collapse-icon {
        cursor: pointer;
    }
}
</style>
