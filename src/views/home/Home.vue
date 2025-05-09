<template>
    <div class="home-wrap">
        <el-tag type="primary">{{ modelValue.name }}</el-tag>
        <Card :model-value="modelValue" @update-model-value="updateModelValue" />
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Card from '@/components/card/Card.vue'

const modelValue = reactive({
    name: 'zhangwei',
    age: 12,
    tall: '188cm'
})

function updateModelValue(val: string) {
    modelValue.name = val
}
</script>

<style lang="scss" scoped>
.home-wrap {
    width: 100%;
    height: 100%;
}
</style>