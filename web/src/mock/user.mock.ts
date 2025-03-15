import Mock from 'mockjs';

// 模拟 GET 请求：/api/user
Mock.mock('/api/user', 'get', {
  'users|1-10': [{  // 随机生成 1 到 10 个用户数据
    'id|+1': 1,     // id 自增
    'name': '@name', // 随机生成名字
    'email': '@email', // 随机生成邮箱
    'role': '@word(5, 10)', // 随机生成角色名
  }]
});
