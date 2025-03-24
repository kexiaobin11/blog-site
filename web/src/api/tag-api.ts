import request from '@/utils/request'

/**
 * 获取标签列表
 */
export function page(params: { page: number, size: number }) {
  return request({
    url: '/api/tag/page',
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
    url: `/api/tag/${id}`,
    method: 'GET'
  });
}

export function save(tag: { name: string; description: string }) {
  return request({
    url: '/api/tag',
    method: 'POST',
    json: true,
    data: tag
  });
}

export function update(id: number, tag: {name: string; description: string }) {
  return request({
    url: `/api/tag/${id}`,
    method: 'PUT',
    json: true,
    data: tag
  });
}
