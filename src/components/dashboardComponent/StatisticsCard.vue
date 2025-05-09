<template>
    <div class="statistics-card">
        <el-card>
            <div class="statistics-card-title">
                <div class="statistics-card-title-text">销售额类别占比</div>
                <el-radio-group v-model="radio">
                    <el-radio-button label="全部渠道" value="all" border
                        style="color: var(--primary-text-color);font-weight: 400;" />
                    <el-radio-button label="线上" value="online" border
                        style="color: var(--primary-text-color);font-weight: 400;" />
                    <el-radio-button label="门店" value="offline" border
                        style="color: var(--primary-text-color);font-weight: 400;" />
                </el-radio-group>
                <div>
                    <el-dropdown placement="bottom">
                        <el-icon class="search-card-title-icon">
                            <MoreFilled />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>操作一</el-dropdown-item>
                                <el-dropdown-item>操作二</el-dropdown-item>
                                <el-dropdown-item>操作三</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="statistics-card-chart-container">
                <div class="statistics-card-chart-item">
                    <div class="statistics-card-chart-item-title">
                        <span>搜索用户数</span>
                    </div>
                    <div class="chart-container" ref="chartContainer"></div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue';
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import { useLayoutStore } from '@/stores/useLayoutStore';

const radio = ref('all')

const chartContainer = ref<HTMLDivElement>();
const instance = getCurrentInstance()
const layoutStore = useLayoutStore()

let charts: echarts.ECharts | undefined;

watch([() => layoutStore.windowWidth, () => layoutStore.isCollapse], ([newWidth, newIsCollapse], [oldWidth, oldIsCollapse]) => {
    if (newWidth !== oldWidth || newIsCollapse !== oldIsCollapse) {
        resizeHandler()
    }
})

const resizeHandler = instance?.appContext.config.globalProperties.$deBounce(() => {
    charts?.resize({
        animation: {
            duration: 200,
            easing: 'linear'
        }
    });
}, 300);

onMounted(() => {
    charts = echarts.init(chartContainer.value as HTMLElement)
    const option = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'sales-volume',
                type: 'pie',
                radius: ['35%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    formatter: '{b}',
                },
                labelLine: {
                    show: true,
                    length: 20,
                    length2: '10%'
                },
                data: [
                    { value: 1048, name: '数码' },
                    { value: 735, name: '服饰' },
                    { value: 580, name: '食品' },
                    { value: 484, name: '日用品' },
                    { value: 300, name: '其他' }
                ]
            }
        ]
    };
    charts.setOption(option)
})
</script>

<style scoped lang="scss">
.statistics-card {
    flex: 1;
    width: 50%;
    color: var(--primary-text-color);

    :deep(.el-card__body) {
        padding-top: 0;
        height: 490px;
    }

    .statistics-card-title {
        display: flex;
        align-items: center;
        gap: 20px;
        height: 56px;
        border-bottom: 1px solid var(--el-border-color);
        margin-bottom: 20px;

        .statistics-card-title-text {
            flex: 1;
        }

        .statistics-card-title-icon {
            cursor: pointer;
        }
    }

    .statistics-card-chart-container {
        .statistics-card-chart-item-title {
            font-size: 14px;
            font-weight: 400;
            color: var(--regular-text-color);
        }

        .chart-container {
            height: 380px;
            width: 100%;
        }
    }
}
</style>