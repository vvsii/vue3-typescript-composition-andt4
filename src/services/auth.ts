import type { ServerResponse, LoginForm, TokenResponse, RefreshBody } from "@/types";
import { create } from "./request";

const client = create();

const login = (body: LoginForm): ServerResponse<TokenResponse> =>
  client.post("/v1/auth/login", body);

const refresh = (body: RefreshBody): ServerResponse<TokenResponse> =>
  client.post("/v1/auth/refresh", body);

export { login, refresh };
