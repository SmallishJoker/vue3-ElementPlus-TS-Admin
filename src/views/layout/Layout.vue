<template>
    <el-header>
        <Header />
    </el-header>
    <el-container>
        <el-aside>
            <Aside />
        </el-aside>
        <el-main>
            <BreadCrumb />
            <RouterView />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import Header from "@/components/header/Header.vue"
import Aside from "@/components/aside/Aside.vue"
import BreadCrumb from "@/components/breadcrumb/BreadCrumb.vue"
</script>

<style lang="scss" scoped>
.el-aside {
    border-right: 1px solid var(--el-border-color);
}
@media screen and (max-width: 580px) {
    .el-aside {
        display: none;
    }
    .breadcrumb-container {
        display: none;
    }
}
</style>