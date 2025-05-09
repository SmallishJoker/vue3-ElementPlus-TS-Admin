<!-- MenuNode.vue -->
<template>
    <!-- 分组 -->
    <el-menu-item-group v-if="node.type === 'group'" :title="node.title">
        <MenuNode v-for="child in node.children" :key="child.index || child.title" :node="child" />
    </el-menu-item-group>

    <!-- 子菜单 -->
    <el-sub-menu v-else-if="node.children" :index="node.index">
        <template #title>
            <CustomIcon :icon-name="node.icon" v-if="node.isRoot" />
            <span>{{ node.title }}</span>
        </template>
        <MenuNode v-for="child in node.children" :key="child.index || child.title" :node="child" />
    </el-sub-menu>

    <!-- 普通菜单项 -->
    <el-menu-item v-else :index="node.index" @click="$emit('handleSelect', node)">
        {{ node.label }}
    </el-menu-item>
</template>

<script setup lang="ts">
import CustomIcon from '../icon/CustomIcon.vue'
defineProps<{ node: any }>()
const emit = defineEmits(['handleSelect'])
</script>