// 菜单配置
import type {Menu} from "@/entity/menu.ts";

export const menus = [
  {
    name: '首页',
    url: '/',
    icon: 'bi bi-house-door',
  },
  {
    name: '文章管理',
    url: '/post',// 这里使用post，不使用article，post 偏向博客类型、注重时间，而article偏向内容，比较正式
    icon: 'bi bi-file-text',
  },
  {
    name: '分类管理',
    url: '/category',
    icon: 'bi bi-collection',
  },
  {
    name: '标签管理',
    url: '/tag',
    icon: 'bi bi-tags',
  },
  {
    name: '个人中心',
    url: '/person-center',
    icon: 'bi bi-person',
  }
] as Array<Menu>;
