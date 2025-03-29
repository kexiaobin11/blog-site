import {defineStore} from "pinia";
import {ref} from "vue";
import type {Category} from "@/entity/category";
import {page, getById, save, update} from '@/api/category-api';
import type {Page} from "@/entity/page.ts";

/**
 * tag状态管理
 */
export const useCategoryStore = defineStore('category', () => {
  const pageData = ref<Page<Category>>();

  /**
   * 保存标签
   * @param tag
   */
  async function saveCategory(category: { name: string, description: string }) {
    await save(category);
  }

  /**
   * 更新标签
   * @param id
   * @param tag
   */
  async function updateCategory(id: number, category: { name: string, description: string }) {
    await update(id, category);
  }

  /**
   * 分页查询
   * @param params
   */
  async function getCategoryByPage(params: { page: number, size: number, }) {
     pageData.value = await page(params);
  }

  /**
   * 根据id查询
   * @param id
   */
  async function getCategoryById(id: number) {
    return await getById(id);
  }

  return {pageData, getCategoryByPage, getCategoryById, saveCategory, updateCategory};
})
