import type {Tag} from "@/entity/tag.ts";
import type {Category} from "@/entity/category.ts";
import type {User} from "@/entity/user.ts";

/**
 * 文章实体
 */
export class Post {
  id: number;
  title: string; // 文章标题
  description: string; // 文章描述
  content: string; // 文章内容
  tags: Tag[]; // 标签
  category: Category; // 分类
  authorUser: User; // 作者
  createTime: number; // 创建时间
}
