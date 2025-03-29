import request from '@/utils/request'

/**
 * 获取标签列表
 */
export function page(params: { page: number, size: number }) {
  return request({
    url: '/api/category/page',
    method: 'GET',
    params: {
      page: params.page,
      size: params.size
    }
  });
}

/**
 * 根据id获取标签
 * @param id
 */
export function getById(id: number) {
  return request({
    url: `/api/category/${id}`,
    method: 'GET'
  });
}

export function save(category: { name: string; description: string }) {
  return request({
    url: '/api/category',
    method: 'POST',
    json: true,
    data: category
  });
}

export function update(id: number, category: {name: string; description: string }) {
  return request({
    url: `/api/category/${id}`,
    method: 'PUT',
    json: true,
    data: category
  });
}
