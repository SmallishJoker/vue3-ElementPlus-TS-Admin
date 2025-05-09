<template>
    <div class="card-wrap">
        <el-input v-model="model.name"></el-input>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const formData = defineProps<{
    name?: string,
    age?: number,
    tall?: string,
}>()

const emit = defineEmits(['updateModelValue'])

const model = computed({
    get() {
        console.log(formData.name)
        return formData
    },
    set(val) {
        console.log(val)
        // emit('updateModelValue', val)
    }
})

</script>
