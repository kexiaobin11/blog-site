import Mock from 'mockjs';

// 持久化数据（全局唯一）
const totalData = Mock.mock({
  'tags|50': [{
    'id|+1': 1,
    'name': '@word(3,8)',
    'description': '@sentence(5,10)'
  }]
}).tags;

// Mock 拦截带参数的 GET 请求
Mock.mock(/\/api\/tag\/page/, 'get', function(options) {
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
