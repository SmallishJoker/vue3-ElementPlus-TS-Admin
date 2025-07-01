<template>
    <div class="custom-chart">
        <div class="custom-chart-container" ref="chartContainer"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance } from 'vue'
import * as echarts from 'echarts'
import { useLayoutStore } from '@/stores/useLayoutStore'

const layoutStore = useLayoutStore()

const instance = getCurrentInstance()

const chartContainer = ref<HTMLElement>()

interface requestType {
    url?: string,
    data?: [],
    params?: {},
}

const props = defineProps<{
    option: any,
    requestOption?: requestType
}>()

let chart: echarts.ECharts | null = null

watch([() => layoutStore.windowWidth, () => layoutStore.isCollapse], ([newWidth, newIsCollapse], [oldWidth, oldIsCollapse]) => {
    if (newWidth !== oldWidth || newIsCollapse !== oldIsCollapse) {
        resizeHandler()
    }
})

const resizeHandler = instance?.appContext.config.globalProperties.$deBounce(() => {
    if (chart) {
        chart.resize({
            animation: {
                duration: 200,
                easing: 'linear'
            }
        })
    }
}, 300)

onMounted(() => {
    chart = echarts.init(chartContainer.value as HTMLElement)
    if (props.requestOption) {
        chart.showLoading()
        setTimeout(() => {
            chart?.setOption(props.option)
            chart?.appendData({
                seriesIndex: 0,
                data: [9, 3, 7, 9, 4, 7, 5, 8, 1, 10]
            })
            chart?.hideLoading()
            chart?.resize({
                animation: {
                    duration: 300,
                    easing: 'linear'
                }
            })
        }, 1000);
    } else {
        chart.setOption(props.option)
    }

})

</script>

<style lang="scss" scoped>
.custom-chart {
    width: 100%;
    height: 100%;

    .custom-chart-container {
        width: 100%;
        height: 100%;
    }
}
</style>
