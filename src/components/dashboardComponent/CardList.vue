<template>
    <div class="analytics-container-card-list">
        <el-card v-for="item in cardList" :key="item.title">
            <div class="card-header">
                <p class="card-header-title">{{ item.title }}</p>
                <div class="card-header-right">
                    <el-tooltip class="box-item" effect="dark" content="指标说明" placement="top">
                        <el-icon>
                            <Warning color="var(--regular-text-color)" />
                        </el-icon>
                    </el-tooltip>
                </div>
            </div>
            <div class="card-body">
                <div class="card-body-title">{{ item.value }}</div>
                <div
                    :class="{ 'card-body-subtitle': true, 'card-body-subtitle-progress': item.id === 'operation-effect' }">
                    <template v-if="item.id === 'total-sales'">
                        <div class="card-body-subtitle-item">
                            <span>周同比 12%</span>
                            <el-icon color="#F5222F">
                                <CaretTop />
                            </el-icon>
                        </div>
                        <div class="card-body-subtitle-item">
                            <span>日同比 11%</span>
                            <el-icon color="#52c41a">
                                <CaretBottom />
                            </el-icon>
                        </div>
                    </template>
                    <template v-else-if="item.id === 'operation-effect'">
                        <div class="progress-container">
                            <el-progress striped-flow :stroke-width="8" :percentage="78"
                                color="linear-gradient(to left, #2af598 0%, #009efd 100%)" />
                        </div>
                    </template>
                    <CustomChart v-if="!!item.option" :option="item.option" :request-option="requestOption"/>
                </div>
            </div>
            <el-divider />
            <div class="card-footer">
                <div v-if="item.id === 'operation-effect'" class="card-footer-subtitle">
                    <div class="card-body-subtitle-item">
                        <span>周同比 12%</span>
                        <el-icon color="#F5222F">
                            <CaretTop />
                        </el-icon>
                    </div>
                    <div class="card-body-subtitle-item">
                        <span>日同比 11%</span>
                        <el-icon color="#52c41a">
                            <CaretBottom />
                        </el-icon>
                    </div>
                </div>
                <template v-else>
                    <div class="card-footer-title">{{ item.footer }}</div>
                    <div class="card-footer-subtitle">{{ item.footerValue }}</div>
                </template>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { Warning, CaretTop, CaretBottom } from '@element-plus/icons-vue';
import { ref } from 'vue';
import CustomChart from '@/components/chart/CustomChart.vue';
import type { EChartsOption } from 'echarts'

const requestOption = ref({
    url: 'http://123.1.com'
})

const option1 = ref<EChartsOption>({
    color: ['#FFBF00'],
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        show: false,
        boundaryGap: false,
    },
    yAxis: {
        type: 'value',
        show: false
    },
    grid: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    series: [{
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
            width: 0
        },
        showSymbol: false,
        label: {
            show: false,
            position: 'top'
        },
        areaStyle: {
            opacity: 0.7,
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 1,
                        color: 'rgba(250, 112, 154, 0.5)'
                    },
                    {
                        offset: 0,
                        color: 'rgba(254, 225, 64, 0.8)'
                    }
                ]
            }
        },
        emphasis: {
            focus: 'series'
        },
        data: []
    }]
})

const option2 = ref<EChartsOption>({
    color: ['#409EFF'],
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        show: false,
        boundaryGap: true,
    },
    yAxis: {
        type: 'value',
        show: false
    },
    grid: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    series: [{
        type: 'bar',
        stack: 'Total',
        label: {
            show: false,
            position: 'top'
        },
        itemStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: '#66a6ff'
                    },
                    {
                        offset: 1,
                        color: '#89f7fe'
                    }
                ]
            }
        },
        emphasis: {
            focus: 'series'
        },
        data: []
    }]
})
const cardList = [
    {
        title: '总销售额',
        id: 'total-sales',
        value: '¥ 126,560',
        subtitle: '周同比 12%',
        footer: '日销售额',
        footerValue: '¥ 12,460',
        option1: null
    },
    {
        title: '访问量',
        id: 'visits',
        value: '8751',
        subtitle: '8751',
        footer: '日访问量',
        footerValue: '1234',
        option: option1.value
    },
    {
        title: '支付笔数',
        id: 'payment-count',
        value: '6560',
        subtitle: '6560',
        footer: '转化率',
        footerValue: '12%',
        option: option2.value
    },
    {
        title: '运营活动效果',
        id: 'operation-effect',
        value: '78%',
        subtitle: '78',
        footer: '周同比 12%',
        footerValue: '12%',
        footerValue2: '12%',
        option: null
    },
]
</script>

<style scoped lang="scss">
.analytics-container-card-list {
    color: var(--primary-text-color);
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .el-card {
        flex: 1;
    }

    .el-divider--horizontal {
        margin: 12px 0;
    }

    :deep(.el-progress-bar__inner:before) {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        border-radius: 10px;
        animation: progress-flow 4s linear infinite;
    }

    @keyframes progress-flow {
        0% {
            width: 0;
            opacity: 0.5;
        }

        25% {
            width: 65%;
            opacity: 0.3;
        }

        33% {
            width: 100%;
            opacity: 0;
        }

        100% {
            width: 100%;
            opacity: 0;
        }
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .card-header-title {
            font-size: 14px;
            color: var(--regular-text-color);
        }

        .card-header-right {
            display: flex;
            align-items: center;
            cursor: pointer;
            gap: 10px;
        }
    }

    .card-body {
        .card-body-title {
            font-size: 30px;
            letter-spacing: 0.05em;
            line-height: 38px;
            height: 38px;
            margin-top: 4px;
        }

        .card-body-subtitle {
            font-size: 14px;
            color: var(--regular-text-color);
            display: flex;
            align-items: flex-end;
            gap: 16px;
            height: 46px;

            .card-body-subtitle-item {
                display: flex;
                align-items: center;
            }
        }

        @media screen and (max-width: 1260px) and (min-width: 1200px) {
            .card-body-subtitle {
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-end;
                gap: 8px;
            }
        }

        .card-body-subtitle-progress {
            align-items: center;
            flex-direction: row;
        }
    }

    .card-footer {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        color: var(--primary-text-color);

        .card-footer-subtitle {
            display: flex;
            align-items: center;
            gap: 16px;
            overflow: hidden;

            .card-body-subtitle-item {
                display: flex;
                align-items: center;
                min-width: 90px;
            }
        }
    }

    .chart-container {
        width: 100%;
        height: 46px;
    }

    .progress-container {
        width: 100%;
    }
}

@media screen and (max-width: 1200px) {
    .analytics-container-card-list {
        .el-card {
            min-width: calc(50% - 20px);
        }
    }
}

@media screen and (max-width: 580px) {
    .analytics-container-card-list {
        flex-direction: column;
    }
}
</style>