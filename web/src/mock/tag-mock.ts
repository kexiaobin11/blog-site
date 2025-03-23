import Mock from 'mockjs';

// 模拟 GET 请求：/api/tag
Mock.mock('/api/tag', 'get', {
  'tags|1-10': [{  // 随机生成 1 到 10 个标签
    'id|+1': 1,     // id 自增
    'name': '@word(3, 8)', // 随机生成 3 到 8 个字符的标签名称
    'description': '@sentence(5, 10)', // 随机生成 5 到 10 个单词的描述
  }]
});
