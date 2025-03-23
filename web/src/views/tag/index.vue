<script setup lang="ts">
import {useTagStore} from '@/stores/tag-store.ts';
import {onMounted, ref} from 'vue';
import type {Tag} from "@/entity/tag.ts";
import type {Pagination} from "@/entity/pagination.ts";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const pageData = ref<Pagination<Tag>>({});
const tagStore = useTagStore();

const pageSize = ref(5); // 每页条数
const currentPage = ref(1); // 当前页

const fetchData = async (page = 1, size = 5) => {
  await tagStore.getPage({page, size});
  pageData.value = tagStore.pageData;
};
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchData(page, pageSize.value);
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchData(currentPage.value, size);
};

onMounted(async () => {
  await fetchData(currentPage.value, pageSize.value);
});
</script>

<template>
  <div v-if="pageData">
    <div class="card mr-4 ml-4">
      <div class="card-body">
        <el-form class="d-flex">
          <el-input
            v-model="searchQuery"
            placeholder="请输入标签名称"
            @input="searchTags"
            clearable
            style="width: 200px"
          />
          <el-form-item class="ml-2">
            <el-button type="primary">
              <i class="bi bi-search mr-1"></i>搜索
            </el-button>
          </el-form-item>
        </el-form>
        <div class="row mt-2">
          <div class="col-12 text-right">
            <el-button type="primary" plain class="mt-2 mb-2">
              <i class="bi bi-plus-circle mr-1"></i>添加
            </el-button>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">编号</th>
            <th scope="col">名称</th>
            <th scope="col">描述</th>
            <th scope="col">操作</th> <!-- 增加操作列 -->
          </tr>
          </thead>
          <tbody>
          <tr v-for="tag in pageData.records" :key="tag.id">
            <td>{{ tag.id }}</td>
            <td>{{ tag.name }}</td>
            <td>{{ tag.description }}</td>
            <td>
              <!-- 编辑按钮 -->
              <el-button type="primary" plain class="mr-1">
                <i class="bi bi-pencil-square mr-1"></i> 编辑
              </el-button>
              <!-- 删除按钮 -->
              <el-button type="danger" plain>
                <i class="bi bi-trash mr-1"></i>删除
              </el-button>
            </td>
          </tr>
          </tbody>
        </table>

        <!-- 分页组件 -->
        <el-config-provider :locale="zhCn">
          <el-pagination
            v-if="pageData.total > 0"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="pageData.total"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          />
        </el-config-provider>
      </div>
    </div>
  </div>
</template>

<style scoped>
.d-flex {
  display: flex;
  align-items: center; /* 垂直居中 */
}

.el-form-item {
  margin-bottom: 0; /* 去掉每个表单项的下边距 */
}
</style>
