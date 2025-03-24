<script setup lang="ts">
import {useTagStore} from '@/stores/tag-store.ts';
import {onMounted, ref, watch, reactive, toRefs} from 'vue';
import type {Tag} from "@/entity/tag.ts";
import type {Page} from "@/entity/page.ts";
import Pagination from "@/components/Pagination/index.vue";

/**
 * 查询参数
 */
const data = reactive({
  params: {
    page: 1,
    size: 5
  }
});
const pageData = ref<Page<Tag>>({});
const tagStore = useTagStore();
const { params } = toRefs(data);

watch([() => params.value.page, () => params.value.size], ([newPage, newSize]) => {
  fetchData(newPage, newSize);
});

/**
 * 获取分页数据
 * @param page 当前页码
 * @param size 当前每页显示条数
 */
const fetchData = async (page = 1, size = 5) => {
  await tagStore.getPage({page, size});
  pageData.value = tagStore.pageData;
};

onMounted(async () => {
  await fetchData(params.value.page, params.value.size);
});
</script>

<template>
  <div v-if="pageData">
    <div class="card mr-4 ml-4">
      <div class="card-body">
        <el-form class="d-flex">
          <el-input v-model="searchQuery" placeholder="请输入标签名称" @input="searchTags" clearable
                    style="width: 200px"/>
          <el-form-item class="ml-2">
            <el-button type="primary"><i class="bi bi-search mr-1"></i>搜索</el-button>
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
        <Pagination
          :total="pageData.total"
          :current-page="params.page"
          :page-size="params.size"
          @update:currentPage="params.page = $event"
          @update:pageSize="params.size = $event"
        />
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
