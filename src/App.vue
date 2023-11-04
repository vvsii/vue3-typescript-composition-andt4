<script setup lang="ts">
import { RouterView } from "vue-router";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { computed } from "vue";
import i18n from "./i18n";

const language = computed(() => i18n.global.locale.value.split("-")[0]);
const locale = computed(() => (language.value === "en" ? enUS : zhCN));
dayjs.locale(language.value);

locale.effect.onTrigger = () => {
  dayjs.locale(language.value);
};
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
