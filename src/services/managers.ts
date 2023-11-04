import type { ManagerSignHistory, ManagerSignHistoryParams, ServerResponse } from "@/types";
import client from "./request";

const signHistory = (params: ManagerSignHistoryParams): ServerResponse<ManagerSignHistory[]> =>
  client.get("/v1/managers/signHistory", { params });

export { signHistory };
