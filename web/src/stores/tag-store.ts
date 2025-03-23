import {defineStore} from "pinia";
import {ref} from "vue";
import type {Tag} from "@/entity/tag.ts";
import {getTagList} from '@/api/tag-api.ts';


export const useTagStore = defineStore('tag', () => {
  const tagList = ref<Tag[]>([])

  async function getList() {
    const res = await getTagList();
    tagList.value = res.tags;
  }

  return {tagList, getList};
})
