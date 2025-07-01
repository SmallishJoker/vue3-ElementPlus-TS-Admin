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
                        <span>销售额</span>
                    </div>
                    <div class="chart-wrap">
                        <CustomChart :option="option"/>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue';
import { ref } from 'vue';
import CustomChart from '../chart/CustomChart.vue';

const radio = ref('all')

const option = ref({
    tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: (params: any) => {
            return `${params.data.name}&nbsp;&nbsp;&nbsp;&nbsp;${params.data.value}`
        }
    },
    series: [
        {
            name: 'sales-volume',
            type: 'pie',
            radius: ['35%', '60%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                formatter: '{b}：{c}',
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
})
</script>

<style scoped lang="scss">
.statistics-card {
    color: var(--primary-text-color);
    width: 50%;

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

        .chart-wrap {
            height: 380px;
            width: 100%;
        }
    }
}
</style>