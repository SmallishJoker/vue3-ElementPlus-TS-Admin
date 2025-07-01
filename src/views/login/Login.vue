<template>
    <div class="login-container">
        <div class="login-form-container">
            <div class="login-form-title">
                <img src="../../assets/image/logo.png" alt="logo" class="logo">
                <div class="logo-text">OnePiece</div>
            </div>
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
                label-width="auto" class="demo-ruleForm">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <div class="login-form-btn__container">
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            Sign in
                        </el-button>
                        <el-button @click="resetForm(ruleFormRef)">Sign up</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const ruleFormRef = ref<FormInstance>()
const authStore = useAuthStore()
const router = useRouter()


const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the Username'))
    } else {
        return true
    }
}
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the Password'))
    } else {
        return true
    }
}

const ruleForm = reactive({
    username: '',
    password: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        console.log(valid)
        if (valid) {
            console.log('submit!')
            authStore.setAuthStore(true)
            authStore.setToken('qazwsxedcrfvtgbyhn')
            router.replace({
                name: 'Analytics'
            })
        } else {
            console.log('error submit!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped lang="scss">
.login-container {
    height: 100vh;
    background: url('../../assets/image/bg.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-form-container {
        width: 350px;
        height: max-content;
        padding: 40px;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

        .login-form-title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;

            .logo {
                width: 48px;
            }

            .logo-text {
                font-size: 18px;
                color: var(--regular-text-color);
                font-weight: 600;
            }
        }

        .login-form-btn__container {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
            padding-top: 10px;
        }
    }
}
</style>