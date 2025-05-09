<template>
  <div>
    <el-table :data="tableData" :header-cell-style="{ background: '#f5f7fa' }" :row-key="rowKey" stripe
      @sort-change="handleSortChange">
      <!-- 动态生成表头和列 -->
      <el-table-column v-for="(column, index) in columns" :key="index" :prop="column.prop" :label="column.label"
        :sortable="column.sortable" :formatter="column.formatter" :width="column.width" :min-width="column.minWidth">
        <!-- 自定义操作列 -->
        <template #default="{ row }" v-if="column.slotName">
          <slot :name="column.slotName" :row="row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination v-if="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="pageSize"
        :layout="paginationLayout" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';
import type { TableColumnCtx } from 'element-plus'

interface Column {
  prop: string;
  label: string;
  sortable?: boolean;
  formatter?: (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => string;
  slotName?: string;
  width?: string | number;
  minWidth?: string | number;
}

interface TableProps {
  tableData: any[];
  columns: Column[];
  pagination?: boolean;
  currentPage?: number;
  pageSize?: number;
  total?: number;
  rowKey?: string | ((row: any) => string);
  paginationLayout?: string;
}

// 定义组件的 props
// defineProps<TableProps>();

withDefaults(defineProps<TableProps>(), {
  pagination: true,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  paginationLayout: 'total, sizes, prev, pager, next, jumper'
});

// 定义组件的 emits
const emits = defineEmits<{
  'sort-change': [sort: { prop: string; order: string }];
  'size-change': [size: number];
  'current-change': [page: number];
}>();

// 处理排序变化
const handleSortChange = (sort: { prop: string; order: string }) => {
  emits('sort-change', sort);
};

// 处理每页数量变化
const handleSizeChange = (newSize: number) => {
  emits('size-change', newSize);
};

// 处理当前页码变化
const handleCurrentChange = (newPage: number) => {
  emits('current-change', newPage);
};
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>