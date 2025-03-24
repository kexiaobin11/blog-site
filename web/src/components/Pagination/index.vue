<template>
  <el-config-provider :locale="zhCn">
    <el-pagination
      v-if="total > 0"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      :page-sizes="[5,10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />
  </el-config-provider>
</template>

<script setup>
/**
 * 通用分页组件
 */
import {ref, defineProps, defineEmits} from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const props = defineProps({
  total: {type: Number, required: true},
  currentPage: {type: Number, default: 1},
  pageSize: {type: Number, default: 10},
});

const emit = defineEmits(["update:currentPage", "update:pageSize"]);

const handlePageChange = (page) => {
  emit("update:currentPage", page);
};

const handleSizeChange = (size) => {
  emit("update:pageSize", size);
};
</script>
