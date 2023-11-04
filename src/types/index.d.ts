export interface ApiResponse<T> {
  code: number;
  description: string;
  result?: T;
  records: number;
}

export type ServerResponse<T> = Promise<AxiosResponse<ApiResponse<T>>>;

export interface Pagination {
  page?: number;
  limit?: number;
  sorts?: string;
}

export interface LoginForm {
  name: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  refresh: string;
  expire: number;
  refreshExpire: number;
}

export interface TokenPayload {
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  sub: string;
  name: string;
  jti: string;
  attrs: any;
}

export interface RefreshBody {
  token: string;
}

export interface ManagerSignHistoryParams extends Pagination {
  uid?: number;
}

export interface ManagerSignHistory {
  id: number;
  uid: number;
  inTime: number;
  ipv4: string;
  ua: string;
}
