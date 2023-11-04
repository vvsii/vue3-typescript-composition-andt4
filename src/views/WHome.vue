<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";

const { payload } = useAuthStore();
const i18n = useI18n();
</script>
<template>
  <h1>{{ $t("menu.home") }}</h1>
  <a-divider></a-divider>
  <h2>Auth Payload</h2>
  <pre>{{ payload }}</pre>
  <h2>Locale</h2>
  <pre>{{ i18n.locale }}</pre>
</template>
