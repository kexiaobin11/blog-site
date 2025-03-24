import {defineStore} from "pinia";
import {ref} from "vue";
import type {Tag} from "@/entity/tag.ts";
import {page, getById, save, update} from '@/api/tag-api.ts';
import type {Page} from "@/entity/page.ts";

/**
 * tag状态管理
 */
export const useTagStore = defineStore('tag', () => {
  const pageData = ref<Page<Tag>>([])

  /**
   * 保存标签
   * @param tag
   */
  async function saveTag(tag: { name: string, description: string }) {
    await save(tag);
  }

  /**
   * 更新标签
   * @param id
   * @param tag
   */
  async function updateTag(id: number, tag: { name: string, description: string }) {
    await update(id, tag);
  }

  /**
   * 分页查询
   * @param params
   */
  async function getPage(params: { page: number, size: number, }) {
    pageData.value = await page(params);
  }

  /**
   * 根据id查询
   * @param id
   */
  async function getTagById(id: number) {
    return await getById(id);
  }

  return {pageData, getPage, getTagById, saveTag, updateTag};
})
