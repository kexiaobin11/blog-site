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
