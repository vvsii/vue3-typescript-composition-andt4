<script lang="ts" setup>
import { computed, h, onMounted, ref } from "vue";
import { HomeOutlined, ReconciliationOutlined, UnorderedListOutlined } from "@ant-design/icons-vue";
import type { ItemType } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);
const items = computed<ItemType[]>(() => [
  {
    key: "home",
    label: t("menu.home"),
    icon: () => h(HomeOutlined),
    onClick: () => {
      router.push({ name: "home" });
    }
  },
  {
    key: "managers",
    label: t("menu.managers.title"),
    icon: () => h(ReconciliationOutlined),
    children: [
      {
        key: "signHistory",
        label: t("menu.managers.signHistory"),
        icon: () => h(UnorderedListOutlined),
        onClick: () => {
          router.push({ name: "signHistory" });
        }
      }
    ]
  }
]);

onMounted(() => {
  const name = router.currentRoute.value.name;
  if (name) {
    selectedKeys.value = [name as string];
    items.value?.forEach((item: any) => {
      if ("children" in item) {
        item.children.forEach((child: ItemType) => {
          if (child?.key === name) {
            openKeys.value = [item.key as string];
          }
        });
      }
    });
  }
});
</script>
<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    :open-keys="openKeys"
    :items="items"
    theme="dark"
    mode="inline"
  >
  </a-menu>
</template>
