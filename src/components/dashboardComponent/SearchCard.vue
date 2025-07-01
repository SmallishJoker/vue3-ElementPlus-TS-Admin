<template>
    <div class="search-card">
        <el-card>
            <div class="search-card-title">
                <div>线上热门搜索</div>
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
            <div class="search-card-chart-container">
                <div class="search-card-chart-item">
                    <div class="search-card-chart-item-title">
                        <span>搜索用户数</span>
                        <el-tooltip class="box-item" effect="dark" content="指标说明" placement="top">
                            <el-icon class="search-card-chart-item-title-icon">
                                <Warning color="var(--regular-text-color)" />
                            </el-icon>
                        </el-tooltip>
                    </div>
                    <div class="chart-warp">
                        <CustomChart :option="option"/>
                    </div>
                </div>
                <div class="search-card-chart-item">
                    <div class="search-card-chart-item-title">
                        <span>人均搜索次数</span>
                        <el-tooltip class="box-item" effect="dark" content="指标说明" placement="top">
                            <el-icon class="search-card-chart-item-title-icon">
                                <Warning color="var(--regular-text-color)" />
                            </el-icon>
                        </el-tooltip>
                    </div>
                    <div class="chart-warp">
                        <CustomChart :option="option"/>
                    </div>
                </div>
            </div>
            <div class="table-container">
                <CustomTable :columns="tableColumns" :tableData="tableData" :pagination="true" :total="total"
                    :currentPage="currentPage" paginationLayout="prev, pager, next">
                    <template #keyword="{ row }">
                        <span>
                            <el-link type="primary">{{ row.keyword }}</el-link>
                        </span>
                    </template>
                    <template #userCount="{ row }">
                        <span>{{ row.userCount }}</span>
                    </template>
                    <template #percentage="{ row }">
                        <div class="percentage-container">
                            <span>{{ row.percentage }}%</span>
                            <el-icon color="#F5222F" v-if="row.percentage > 30">
                                <CaretTop />
                            </el-icon>
                            <el-icon color="#52c41a" v-else>
                                <CaretBottom />
                            </el-icon>
                        </div>
                    </template>
                </CustomTable>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { MoreFilled, Warning } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import * as echarts from 'echarts';
import CustomTable from '@/components/table/CustomTable.vue';
import type { TableColumnCtx } from 'element-plus'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue';
import CustomChart from '@/components/chart/CustomChart.vue';

const data = ref([[9, 800, 200, 640, 560, 880, 40, 960, 560, 12], [120, 1892, 1500, 453, 700, 1100, 1300, 1200, 700, 150]])

interface Column {
    prop: string;
    label: string;
    sortable?: boolean;
    formatter?: (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => string;
    slotName?: string;
    width?: string | number;
    minWidth?: string | number;
}

// 表格数据
const tableData = ref([
    { rank: 1, keyword: '搜索关键词-1', userCount: 20, percentage: 10 },
    { rank: 2, keyword: '搜索关键词-2', userCount: 25, percentage: 20 },
    { rank: 3, keyword: '搜索关键词-3', userCount: 30, percentage: 30 },
    { rank: 4, keyword: '搜索关键词-4', userCount: 35, percentage: 40 },
    { rank: 5, keyword: '搜索关键词-5', userCount: 40, percentage: 50 },
])

// 表格列配置
const tableColumns = ref<Column[]>([
    { prop: 'rank', label: '排名', width: 60 },
    { prop: 'keyword', label: '搜索关键词', slotName: 'keyword', minWidth: 300 },
    {
        prop: 'userCount', label: '用户数', sortable: true,
        slotName: 'userCount', minWidth: 100
    },
    {
        label: '周涨幅',
        prop: 'percentage',
        sortable: true,
        slotName: 'percentage', minWidth: 100
    }
]);

// 总数据量
const total = ref(100);

// 当前页码
const currentPage = ref(1)

const option = reactive({
    color: ['#00f2fe'],
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        show: false,
        boundaryGap: false
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
    series: [
        {
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(79, 172, 254, 0.8)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 242, 254, 0.2)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: data.value[0]
        }
    ]
})
</script>

<style scoped lang="scss">
.search-card {
    color: var(--primary-text-color);
    width: 50%;

    :deep(.el-card__body) {
        padding-top: 0;
        height: 490px;
    }

    .search-card-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        border-bottom: 1px solid var(--el-border-color);
        margin-bottom: 20px;

        .search-card-title-icon {
            cursor: pointer;
            font-weight: 400;
            outline: none;
        }
    }

    .search-card-chart-container {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 20px;

        .search-card-chart-item {
            flex: 1;

            .search-card-chart-item-title {
                font-size: 14px;
                font-weight: 400;
                color: var(--regular-text-color);
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 16px;

                .search-card-chart-item-title-icon {
                    cursor: pointer;
                }
            }

            .chart-warp {
                height: 46px;
            }
        }

        .chart-container {
            height: 46px;
            width: 100%;
        }
    }

    .user-count-container,
    .percentage-container {
        display: flex;
        align-items: center;
    }
}
</style>