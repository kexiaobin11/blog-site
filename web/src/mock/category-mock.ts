// @ts-ignore
import Mock from 'mockjs';

// 持久化数据（全局唯一）
const totalData = Mock.mock({
  'categories|50': [{
    'id|+1': 1,
    'name': '@word(3,8)',
    'description': '@sentence(5,10)'
  }]
}).categories;

// Mock 拦截带参数的 GET 请求
Mock.mock(/\/api\/category\/page/, 'get', function (options) {
  const params = new URLSearchParams(options.url.split('?')[1]);
  let current = parseInt(params.get('page')) || 1; // 当前页
  let size = parseInt(params.get('size')) || 10; // 每页大小
  console.log('current:', current, 'size:', size)
  // 参数安全处理
  current = Math.max(current, 1);
  size = Math.min(size, 50);

  // 计算分页数据
  const startIndex = (current - 1) * size;
  const endIndex = startIndex + size;
  const records = totalData.slice(startIndex, endIndex);

  return {
    records, // 数据列表
    total: totalData.length, // 总记录数
    size, // 每页显示条数
    current, // 当前页
    orders: [], // 排序字段信息（空）
    optimizeCountSql: true, // 是否优化 count SQL
    optimizeJoinOfCountSql: true, // 是否优化 count SQL 是否把 join 查询部分移除
    searchCount: true, // 是否进行 count 查询
    maxLimit: null, // 单页分页条数限制
    countId: null, // XML 自定义 count 查询的 statementId
  };
});

/**
 * 根据 ID 查询标签
 */
Mock.mock(/\/api\/category\/\d+/, 'get', function (options) {
  const id = parseInt(options.url.match(/\/api\/tag\/(\d+)/)[1]);
  return totalData.find(item => item.id === id);
});

/**
 * 更新标签
 */
Mock.mock(/\/api\/category\/\d+/, 'put', function(options) {
  const id = parseInt(options.url.match(/\/api\/tag\/(\d+)/)[1]); // 从 URL 提取 ID
  const body = JSON.parse(options.body); // 获取更新的数据

  // 查找并更新数据
  const tagIndex = totalData.findIndex(item => item.id === id);

  if (tagIndex !== -1) {
    // 更新数据
    totalData[tagIndex] = { ...totalData[tagIndex], ...body };

    // 直接返回更新后的标签
    return totalData[tagIndex];
  } else {
    // 如果未找到标签，则返回空对象
    return {};
  }
});


/**
 * 创建标签
 */
Mock.mock('/api/category', 'post', function(options) {
  const body = JSON.parse(options.body); // 获取请求的 tag 数据
  const newTag = {
    id: totalData.length + 1, // 自动生成新 ID
    name: body.name,
    description: body.description
  };

  totalData.push(newTag); // 将新标签添加到总数据中

  // 直接返回添加后的新标签
  return newTag;
});
