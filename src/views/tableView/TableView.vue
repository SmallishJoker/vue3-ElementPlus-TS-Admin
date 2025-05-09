<template>
    <div>
        <CustomTable :tableData="dataList" :columns="tableColumns" :pagination="true" :total="total"
            @sort-change="handleSortChange" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :currentPage="currentPage">
            <!-- 自定义操作列 -->
            <template #action="{ row }">
                <el-button size="small" @click="handleEdit(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
            </template>
        </CustomTable>
    </div>
</template>

<script setup lang="ts">
import CustomTable from '@/components/table/CustomTable.vue';
import { reactive, ref, defineEmits } from 'vue';
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

const emits = defineEmits<{
    (e: 'sort-change', sort: any): void;
    (e: 'size-change', size: number): void;
    (e: 'current-change', page: number): void;
}>();

// 模拟表格数据
const dataList = reactive([
    { id: 1, name: '张三', age: 20 },
    { id: 2, name: '李四', age: 25 },
    { id: 3, name: '王五', age: 30 },
    { id: 4, name: '赵六', age: 35 },
    { id: 5, name: '孙七', age: 40 },
    { id: 6, name: '周八', age: 45 },
    { id: 7, name: '吴九', age: 50 },
    { id: 8, name: '郑十', age: 55 },
    { id: 9, name: '周八', age: 45 },
]);

// 表格列配置
const tableColumns = ref<Column[]>([
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '姓名' },
    { prop: 'age', label: '年龄', sortable: true },
    {
        slotName: 'action', label: '操作',
        prop: ''
    }
]);

// 总数据量
const total = ref(100);

// 当前页码
const currentPage = ref(1)

// 处理排序变化
const handleSortChange = (sort: any) => {
    emits('sort-change', sort);
};

// 处理每页数量变化
const handleSizeChange = (newSize: number) => {
    emits('size-change', newSize);
};

// 处理当前页码变化
const handleCurrentChange = (newPage: number) => {
    emits('current-change', newPage);
    dataList.push({ id: 3, name: '王五', age: 25 })
    currentPage.value = newPage
};

// 编辑操作
const handleEdit = (row: Column) => {
    console.log('编辑:', row);
};

// 删除操作
const handleDelete = (row: Column) => {
    console.log('删除:', row);
};

</script>