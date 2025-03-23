/**
 * 用户, 单用户不需要多个账户
 * @author kxb
 */
export interface User extends UserDetails {
  id: number;
  name: string;
  username: string;
  password: string;
}
