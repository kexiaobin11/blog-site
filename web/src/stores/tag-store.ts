import {defineStore} from "pinia";
import {ref} from "vue";
import type {Tag} from "@/entity/tag.ts";
import {page} from '@/api/tag-api.ts';
import type {Pagination} from "@/entity/pagination.ts";

export const useTagStore = defineStore('tag', () => {
  const pageData = ref<Pagination<Tag>>([])

  async function getPage(params: { page: number, size: number, }) {
    pageData.value = await page(params);
  }

  return {pageData, getPage};
})
