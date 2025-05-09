<template>
    <div class="chart-container" ref="chartsRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, watch } from 'vue';
import * as echarts from 'echarts';
import { useLayoutStore } from '@/stores/useLayoutStore';

const layoutStore = useLayoutStore()

const instance = getCurrentInstance();

const chartsRef = ref<HTMLDivElement>();

const props = defineProps<{
    data: number[]
}>()

let charts: echarts.ECharts | undefined;

watch([() => layoutStore.windowWidth, () => layoutStore.isCollapse], ([newWidth, newIsCollapse], [oldWidth, oldIsCollapse]) => {
    if (newWidth !== oldWidth || newIsCollapse !== oldIsCollapse) {
        resizeHandler()
    }
})

const resizeHandler = instance?.appContext.config.globalProperties.$deBounce(() => {
    if (charts) {
        charts.resize({
            animation: {
                duration: 200,
                easing: 'linear'
            }
        });
    }
}, 300);

onMounted(() => {
    if (chartsRef.value) {
        charts = echarts.init(chartsRef.value);
        charts.setOption({
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            },
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: 16,
                right: 16,
                bottom: 16,
                containLabel: true
            },
            yAxis: {
                type: 'value',
                boundaryGap: false
            },
            series: [
                {
                    data: props.data,
                    type: 'bar',
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#4facfe'
                        },
                        {
                            offset: 1,
                            color: '#00f2fe'
                        }
                    ])
                }
            ]
        });
    }
});
</script>

<style scoped lang="scss">
.chart-container {
    width: 60%;
    height: 350px;
}
</style>
