<template>
    <div class="map-card">
        <el-card>
            <div class="map-card-header">
                <div class="map-card-header-title">
                    <span>门店区域分布</span>
                </div>
                <el-select v-model="currentArea" placeholder="Select" style="width: 240px"
                    @change="handleCurrentAreaChange">
                    <el-option v-for="item in chinaData" :key="item.value" :label="item.name" :value="item"
                        :disabled="item.name === '南海诸岛' || item.name === '十段线'">
                        <span style="float: left;">{{ item.name }}</span>
                        <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">
                            {{ item.value }}
                        </span>
                    </el-option>
                </el-select>
            </div>
            <div class="map-card-content">
                <div class="map-card-content-map">
                    <div class="map-card-content-map-title">
                        <span>全国分布情况</span>
                    </div>
                    <div class="chart-container" ref="chartContainerCountry"></div>
                </div>
                <div class="map-card-content-map">
                    <div class="map-card-content-map-title">
                        <span>{{ currentArea?.fullname }}分布情况</span>
                    </div>
                    <div class="chart-container" ref="chartContainerArea"></div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import { useLayoutStore } from '@/stores/useLayoutStore';

const chartContainerCountry = ref<HTMLDivElement>();
const chartContainerArea = ref<HTMLDivElement>();
const instance = getCurrentInstance()
const layoutStore = useLayoutStore()

let charts: echarts.ECharts | undefined;
let chartsArea: echarts.ECharts | undefined;

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
    chartsArea?.resize({
        animation: {
            duration: 200,
            easing: 'linear'
        }
    })
}, 200);

interface Area {
    name: string
    value: number
    code: string
    pinyin: string
    fullname: string
}

const chinaData = ref<Area[]>([])

const currentArea = ref<Area>()

const initChartArea = async (area: Area) => {
    const url = `https://geojson.cn/api/china/${area.code}.json`
    currentArea.value = area
    chartsArea?.showLoading()
    const data = await fetch(url)
    const json = await data.json()
    const dataArea: Area[] = []
    json.features.forEach((item: any) => {
        dataArea.push({
            name: item.properties.name,
            value: generateRandomInRange(1, 500),
            code: item.properties.code,
            pinyin: item.properties.pinyin,
            fullname: item.properties.fullname
        })
    })
    chartsArea?.hideLoading()
    echarts.registerMap(area.pinyin, json)
    const option = {
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params: any) {
                return `${area.name} <br/>${params.data.fullname || params.name}：${params.data.value || 0}`
            }
        },
        visualMap: {
            left: 'left',
            min: 1,
            max: 500,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            },
            text: ['High', 'Low'],
            calculable: true
        },
        series: [
            {
                name: area.name,
                type: 'map',
                roam: false,
                map: area.pinyin,
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: dataArea
            }
        ]
    }
    chartsArea?.setOption(option)
}

const generateRandomInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handleCurrentAreaChange = (area: Area) => {
    if (area.name === '南海诸岛' || area.name === '十段线') {
        return
    }
    initChartArea(area)
}

onMounted(async () => {
    charts = echarts.init(chartContainerCountry.value as HTMLElement)
    chartsArea = echarts.init(chartContainerArea.value as HTMLElement)
    const random = generateRandomInRange(1, 500)
    initChartArea({ name: '北京市', code: '110000', pinyin: 'beijing', value: random, fullname: '北京市' })
    charts.showLoading()
    const data = await fetch('https://geojson.cn/api/china/100000.json')
    const json = await data.json()
    json.features.forEach((item: any) => {
        let area = {
            name: item.properties.name,
            value: item.properties.code === '110000' ? random : generateRandomInRange(1, 500),
            code: item.properties.code,
            pinyin: item.properties.pinyin,
            fullname: item.properties.fullname
        }
        if (item.properties.name === '南海诸岛' || item.properties.name === '十段线') {
            area.value = 0
        }
        chinaData.value.push(area)
    })
    charts.hideLoading()
    echarts.registerMap('china', json)
    const option = {
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params: any) {
                return `China <br/>${params.data.fullname || params.name}：${params.data.value || 0}`
            }
        },
        visualMap: {
            left: 'left',
            min: 1,
            max: 500,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            },
            text: ['High', 'Low'],
            calculable: true
        },
        series: [
            {
                name: 'China',
                type: 'map',
                roam: false,
                map: 'china',
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: chinaData.value
            }
        ]
    };
    charts?.setOption(option)

    charts?.on('click', function (params) {
        if (params.name === '南海诸岛' || params.name === '十段线') {
            return
        }
        initChartArea(params.data as Area)
    });
})
</script>

<style lang="scss" scoped>
.map-card {
    :deep(.el-card__body) {
        padding-top: 0;
    }

    .map-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        border-bottom: 1px solid var(--el-border-color);
        margin-bottom: 20px;
    }

    .map-card-content {
        display: flex;
        gap: 20px;

        .map-card-content-map {
            flex: 1;

            .map-card-content-map-title {
                font-size: 14px;
                font-weight: 400;
                color: var(--regular-text-color);
                text-align: center;
                margin-bottom: 16px;
            }

            .chart-container {
                height: 400px;
                width: 100%;
            }
        }
    }

    @media (max-width: 1080px) {
        .map-card-content {
            flex-direction: column;
        }
    }
}
</style>