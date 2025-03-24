/**
 * 基于mybatis-plus 分页查询结果
 */
export interface Page<T> {
  records: T[];                        // 查询数据列表
  total: number;                        // 查询列表总记录数
  size: number;                         // 每页显示条数，默认 10
  current: number;                      // 当前页
  optimizeCountSql: boolean;            // 是否自动优化 COUNT SQL
  optimizeJoinOfCountSql: boolean;      // 是否优化 COUNT SQL 时移除 join 查询
  searchCount: boolean;                 // 是否进行 count 查询
  maxLimit?: number;                    // 单页分页条数限制
  countId?: string;                      // XML 自定义 count 查询的 statementId
}
