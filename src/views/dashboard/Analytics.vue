<template>
    <div class="analytics-container">
        <div class="analytics-container-card-wrapper">
            <CardList />
        </div>
        <div class="analytics-container-card-wrapper">
            <TabCard />
        </div>
        <div class="analytics-container-card-wrapper">
            <div class="flex-box">
                <SearchCard />
                <StatisticsCard />
            </div>
        </div>
        <div class="analytics-container-card-wrapper">
            <MapCard />
        </div>
    </div>
</template>

<script setup lang="ts">
import CardList from '@/components/dashboardComponent/CardList.vue';
import TabCard from '@/components/dashboardComponent/TabCard.vue';
import SearchCard from '@/components/dashboardComponent/SearchCard.vue';
import StatisticsCard from '@/components/dashboardComponent/StatisticsCard.vue';
import MapCard from '@/components/dashboardComponent/MapCard.vue';
</script>

<style scoped lang="scss">
.analytics-container {
    .analytics-container-card-wrapper {
        margin-bottom: 20px;

        .flex-box {
            gap: 20px;
        }
    }

    @media (max-width: 1080px) {
        .search-card {
            width: 100%;
        }

        .statistics-card {
            width: 100%;
        }

        .flex-box,
        .map-card .map-card-content {
            flex-direction: column;
            gap: 16px;
        }
    }
}
</style>
