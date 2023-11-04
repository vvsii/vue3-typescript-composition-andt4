import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { ApiResponse, TokenResponse, TokenPayload } from "@/types";
import type { AxiosResponse } from "axios";
import router from "@/router";
import { refresh } from "@/services/auth";
import client from "@/services/request";

const store = {
  get: () => localStorage.getItem("token"),
  set: (value: TokenResponse) => localStorage.setItem("token", JSON.stringify(value)),
  remove: () => localStorage.removeItem("token")
};

export const useAuthStore = defineStore("AuthStore", () => {
  const token = ref<TokenResponse | null>(null);
  const payload = ref<TokenPayload | null>(null);
  const isAuthenticated = computed(() => token.value !== null && payload.value !== null);

  /**
   * โอนโทเค็นจากการตอบกลับ api login ไปเก็บที่พื้นที่จัดเก็บข้อมูลในระบบ และตั้งค่าการหมดเวลาเพื่อรีเฟรชโทเค็นก่อนที่จะหมดอายุ
   * @param response การตอบกลับจาก Axios ที่มีข้อมูลโทเค็น (token response)
   */
  const transfer = async (response: AxiosResponse<ApiResponse<TokenResponse>>) => {
    if (response.status === 200 && response.data.code === 0 && response.data.result) {
      token.value = response.data.result;
      if (token.value) {
        store.set(token.value);

        // ตั้งค่าการหมดเวลาเพื่อรีเฟรชโทเค็นก่อนที่จะหมดอายุ
        const timeout = (token.value.expire - Math.floor(Date.now() / 1000) - 60) * 1000;
        const refreshText = token.value.refresh;
        setTimeout(async () => {
          await refreshToken(refreshText);
        }, timeout);

        router.push({ name: "layout" });
      }
    }
  };

  /**
   * โหลดโทเค็นการยืนยันตัวตนจากพื้นที่จัดเก็บข้อมูลในระบบ และตั้งค่าค่าของโทเค็นและข้อมูลเพิ่มเติมตามที่เหมาะสม
   * หากโทเค็นหมดอายุแล้ว จะรีเฟรชโทเค็น หากโทเค็นไม่มีอยู่ จะนำทางไปยังหน้าเข้าสู่ระบบ
   */
  const loadAuth = async () => {
    token.value = store.get() ? (JSON.parse(store.get() as string) as TokenResponse) : null;
    if (token.value) {
      // ถอดรหัสโทเค็นเพื่อใช้งาน
      payload.value = JSON.parse(atob(token.value.token.split(".")[1]));

      // หากโทเค็นหมดอายุแล้ว จะรีเฟรชโทเค็น
      if (token.value.expire - Math.floor(Date.now() / 1000) < 60) {
        await refreshToken(token.value.refresh);
      }

      // หากโทเค็นหมดอายุแล้ว และไม่สามารถรีเฟรชโทเค็นได้ จะลงชื่อออก
      if (token.value.expire - Math.floor(Date.now() / 1000) < 0) {
        logout();
      }

      client.interceptors.request.use(
        (config) => {
          if (token.value) {
            config.headers.Authorization = `Bearer ${token.value.token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    } else {
      logout();
    }
  };

  /**
   * รีเฟรช (Refresh) โทเค็นการยืนยันตัวตนโดยใช้โทเค็นที่ระบุ
   * @param token โทเค็นการยืนยันตัวตนที่จะรีเฟรช
   */
  const refreshToken = async (token: string) => {
    try {
      await transfer(await refresh({ token }));
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * ทำการลงชื่อออก (Log out) ผู้ใช้โดยล้างค่าโทเค็นและข้อมูลเพิ่มเติม ลบข้อมูลในพื้นที่จัดเก็บ และนำทางไปยังหน้าเข้าสู่ระบบ
   */
  const logout = () => {
    token.value = null;
    payload.value = null;
    store.remove();
    router.push({ name: "login" });
  };

  return { token, payload, isAuthenticated, transfer, loadAuth, logout };
});
