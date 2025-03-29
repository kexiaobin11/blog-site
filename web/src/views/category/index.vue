<script setup lang="ts" name="Category">
import {useCategoryStore} from '@/stores/category-store.ts';
import {onMounted, ref, watch, reactive, toRefs} from 'vue';
import type {Category} from "@/entity/category";
import type {Page} from "@/entity/page.ts";
import Pagination from "@/components/Pagination/index.vue";
import {ElMessage} from "element-plus";

/**
 * 查询参数
 */
const data = reactive({
  params: {
    page: 1,
    size: 5
  }
});
const pageData = ref<Page<Category>>({}); // 分页数据
const dialogVisible = ref(false);   // 对话框是否可见
const formRef = ref(null);          //表单

// 表单数据
const form = reactive({
  name: '',
  description: '',
  categoryId: undefined,
});

// 表单验证规则
const rules = {
  name: [{required: true, message: '请输入标签名称', trigger: 'blur'}],
  description: [{required: false, message: '请输入描述', trigger: 'blur'}]
}

const categoryStore = useCategoryStore();  // 标签状态管理
const {params} = toRefs(data);   // 转换为响应式对象

/**
 * 监听分页参数的变化
 */
watch([() => params.value.page, () => params.value.size], ([newPage, newSize]) => {
  fetchData(newPage, newSize);
});

/**
 * 获取分页数据
 * @param page 当前页码
 * @param size 当前每页显示条数
 */
async function fetchData(page = 1, size = 5) {
  await categoryStore.getCategoryByPage({page, size});
  pageData.value = categoryStore.pageData;
}

/**
 * 清空表单
 */
function reset() {
  form.name = '';            // 重置名称
  form.description = '';    // 重置描述
  form.categoryId = undefined;  // 重置categoryId
  formRef.value?.resetFields(); //  清空表单状态
}

/**
 * 提交表单
 */
function submitForm() {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      const categoryData = {name: form.name, description: form.description};
      if (form.categoryId === undefined) {
        await categoryStore.saveCategory(categoryData);
        ElMessage.success('添加成功');
      } else {
        await categoryStore.updateCategory(form.categoryId, categoryData);
        ElMessage.success('修改成功');
      }

      reset();
      dialogVisible.value = false;
      await fetchData(params.value.page, params.value.size);
    } catch (error) {
      console.error('操作失败:', error);
      ElMessage.error('操作失败，请稍后重试');
    }
  });
}

/**
 * 打开添加标签的对话框
 */
function handleAdd() {
  reset();
  dialogVisible.value = true;
}

function handleEdit(id: number) {
  reset();
  categoryStore.getCategoryById(id).then((category) => {
    form.name = category.name;
    form.description = category.description;
    form.categoryId = id;
  });
  dialogVisible.value = true;
}

onMounted(async () => {
  await fetchData(params.value.page, params.value.size);
});
</script>

<template>
  <div v-if="pageData">
    <div class="card mr-4 ml-4">
      <div class="card-body">
        <el-form class="d-flex">
          <el-input v-model="searchQuery" placeholder="请输入分类名称" @input="searchCategories" clearable
                    style="width: 200px"/>
          <el-form-item class="ml-2">
            <el-button type="primary"><i class="bi bi-search mr-1"></i>搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="row mt-2">
          <div class="col-12 text-right">
            <el-button type="primary" plain class="mt-2 mb-2" @click="handleAdd">
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
          <tr v-for="category in pageData.records" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>{{ category.description }}</td>
            <td>
              <!-- 编辑按钮 -->
              <el-button class="mr-1" plain type="primary" @click="handleEdit(category.id)">
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

  <!-- 添加和编辑的对话框 -->
  <el-dialog v-model="dialogVisible" title="标签" width="500px">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="名称" prop="name" class="mt-2">
        <el-input class="mb-1" v-model="form.name" placeholder="请输入标签名称"/>
      </el-form-item>
      <el-form-item label="描述" prop="description" class="mt-4">
        <el-input class="mb-1" v-model="form.description" type="textarea" placeholder="请输入描述"/>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </template>
  </el-dialog>
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
