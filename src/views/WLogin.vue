<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { LoginForm } from "@/types";
import { useI18n } from "vue-i18n";
import { login } from "@/services/auth";
import { useAuthStore } from "@/stores/auth";
import type { Rule } from "ant-design-vue/es/form/interface";
import { message, type FormInstance } from "ant-design-vue";
import { notRange } from "@/utils/validations";
import loading from "@/common/loading";

const { transfer } = useAuthStore();
const { t } = useI18n();

const formRef = ref<FormInstance>();
const formState = reactive<LoginForm>({
  name: "",
  password: ""
});
const error = ref<string | undefined>(undefined);

const rules = computed<Record<string, Rule[]>>(() => {
  return {
    name: [
      {
        required: true,
        message: t("invalid.required")
      },
      {
        min: 4,
        max: 30,
        message: t("invalid.between", { min: 4, max: 30 })
      }
    ],
    password: [
      {
        required: true,
        message: t("invalid.required")
      },
      {
        min: 4,
        max: 30,
        message: t("invalid.between", { min: 4, max: 30 })
      }
    ]
  };
});

const disabled = computed(() => {
  return notRange(formState.name, 4, 30) || notRange(formState.password, 4, 30);
});

const handleLogin = async () => {
  loading.start();
  try {
    const res = await login(formState);
    if (res.status === 200) {
      if (res.data.code === 0) {
        await transfer(res);
      } else {
        message.error(t(`responseCode.${res.data.code}`));
      }
    }
  } catch (err) {
    console.error(err);
  }
  loading.finish();
};
</script>
<template>
  <a-card class="centered" :title="$t('menu.login')" :style="{ width: '500px' }">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      @submit="handleLogin"
      auto-complete="off"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      class="login-form"
    >
      <a-form-item has-feedback :label="$t('labels.username')" name="name" auto-complete="off">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item has-feedback :label="$t('labels.password')" name="password" auto-complete="off">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item v-if="error" :wrapper-col="{ span: 18, offset: 6 }">
        <span :style="{ color: 'red' }">{{ $t("error.code", { code: error }) }}</span>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="disabled"
          :loading="loading.value"
          class="login-form-button"
          >{{ $t("menu.login") }}</a-button
        >
      </a-form-item>
    </a-form>
  </a-card>
</template>
<style scoped>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
}
.login-form {
  max-width: 500px;
}
.login-form-button {
  width: 100%;
}
</style>
