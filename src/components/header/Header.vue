<template>
    <div class="header-wrap">
        <div class="logo-wrap">
            <img src="../../assets/image/logo.png" alt="logo" class="logo">
            <div class="logo-text">One Piece</div>
        </div>
        <div class="header-right">
            <div ref="themeSwitch">
                <el-switch v-model="value" @change="toggleDark()" size="default"
                    style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2;--el-switch-border-color: #dcdfe6">
                    <template #active-action>
                        <el-icon>
                            <Moon color="#606266" />
                        </el-icon>
                    </template>
                    <template #inactive-action>
                        <el-icon>
                            <Sunny color="#606266" />
                        </el-icon>
                    </template>
                </el-switch>
            </div>
            <div class="user-info">
                <el-avatar :size="28" :src="avatar01" />
                <el-text class="mx-1">Luffy</el-text>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { changeTheme, isDark } from '@/utils/changeTheme'
import type { Ref } from 'vue'
import avatar01 from '@/assets/avatar/avatar01.svg'

const value = ref(false)
value.value = isDark.value

const themeSwitch: Ref<HTMLElement | null | undefined> = ref()

function toggleDark() {
    changeTheme(value.value, themeSwitch)
}
</script>

<style scoped lang="scss">
.header-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;

    .logo-wrap {
        width: 180px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;

        .logo {
            width: 48px;
        }

        .logo-text {
            font-size: 18px;
            color: var(--primary-text-color);
            font-weight: 600;
        }
    }

    .header-right,
    .user-info {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .header-right {
        column-gap: 24px;
    }

    .user-info {
        column-gap: 12px;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 4px;

        .el-text {
            font-size: 14px;
            color: var(--regular-text-color);
        }
    }

    .user-info:hover {
        background-color: var(--primary-hover-color);

        .el-text {
            color: #606266;
        }
    }
}
</style>