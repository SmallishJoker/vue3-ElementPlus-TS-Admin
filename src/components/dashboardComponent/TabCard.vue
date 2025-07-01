<template>
    <div class="tab-card">
        <el-card>
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="销售额" name="first" lazy>
                    <div class="tab-card-content">
                        <div class="chat-wrap">
                            <CustomChart :option="option" />
                        </div>
                        <div class="rank-list">
                            <div class="rank-list-title">
                                <span>门店销售额排名</span>
                            </div>
                            <div class="rank-list-item" v-for="item in 7" :key="item">
                                <div :class="{ 'rank-list-item-range': true, 'top-3': item <= 3 }">
                                    <span>{{ item }}</span>
                                </div>
                                <div class="rank-list-item-name">
                                    <span>花园石桥路{{ item }}号店</span>
                                </div>
                                <div class="rank-list-item-value">
                                    <span>312,345</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="访问量" name="second" lazy>
                    <div class="tab-card-content">
                        <div class="chat-wrap">
                            <CustomChart :option="option" />
                        </div>
                        <div class="rank-list">
                            <div class="rank-list-title">
                                <span>门店访问量排名</span>
                            </div>
                            <div class="rank-list-item" v-for="item in 7" :key="item">
                                <div :class="{ 'rank-list-item-range': true, 'top-3': item <= 3 }">
                                    <span>{{ item }}</span>
                                </div>
                                <div class="rank-list-item-name">
                                    <span>花园石桥路{{ item }}号店</span>
                                </div>
                                <div class="rank-list-item-value">
                                    <span>312,345</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <div class="time-range">
            <div class="time-range-links">
                <el-link :underline="false">今日</el-link>
                <el-link :underline="false">本周</el-link>
                <el-link :underline="false">本月</el-link>
                <el-link :underline="false">本年</el-link>
            </div>
            <el-date-picker v-model="timeRange" type="daterange" range-separator="-" start-placeholder="Start date"
                end-placeholder="End date">
                <template #range-separator>
                    <el-icon class="custom-icon">
                        <SortUp />
                    </el-icon>
                </template>
            </el-date-picker>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { SortUp } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import CustomChart from '@/components/chart/CustomChart.vue';

const activeName = ref('first')
const timeRange = ref([])

const option = reactive({
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
            ]),
            data: [
                1876, 824, 1145, 159, 1637,
                1972, 1406, 421, 1794, 316,
                1022, 1830
            ]
        }
    ]
})

</script>

<style scoped lang="scss">
.tab-card {
    position: relative;

    .tab-card-content {
        display: flex;
        gap: 20px;

        .rank-list {
            flex: 1;
            padding: 12px;

            .rank-list-title {
                font-size: 14px;
                font-weight: 500;
                color: var(--primary-text-color);
                margin-bottom: 16px;
            }

            .rank-list-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 0;

                .rank-list-item-range {
                    width: 20px;
                    height: 20px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: var(--range-text-color);
                    background: var(--range-bg-color);
                }

                .top-3 {
                    color: var(--white-text-color);
                    background: var(--primary-text-color);
                }

                .rank-list-item-name {
                    flex: 1;
                    margin: 0 12px 0 20px;
                    font-size: 14px;
                    letter-spacing: 1px;
                    min-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .rank-list-item-value {
                    font-size: 14px;
                }
            }
        }

        .chat-wrap {
            width: 100%;
            height: 360px;
        }
    }

    .time-range {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        align-items: center;

        .el-link {
            margin-right: 20px;
            font-weight: 400;
        }

        :deep(.el-range-editor.el-input__wrapper) {
            width: 280px;
        }
    }


    :deep(.el-tabs__item) {
        font-weight: 400;
        transform: translateY(-4px);
    }

    .custom-icon {
        color: var(--secondary-text-color);
        transform: rotateX(180deg) rotate(90deg);
    }

    @media screen and (min-width: 1200px) {
        .charts {
            width: 70%;
        }
    }

    @media screen and (max-width: 780px) {
        .time-range-links {
            display: none;
        }
    }

    @media screen and (max-width: 580px) {
        .tab-card-content {
            flex-direction: column;
        }

        .chart-container {
            width: 100%;
        }

        .time-range {
            display: none;
        }
    }
}
</style>
