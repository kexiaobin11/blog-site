import type {Tag} from "@/entity/tag.ts";
import type {Category} from "@/entity/category.ts";

/**
 * 文章实体
 */
export class Post {
  id: name;
  title: string;
  description: string;
  content: string;
  tags: Tag[];
  category: Category;
}
