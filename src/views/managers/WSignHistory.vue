<script setup lang="ts">
import { message, type PaginationProps, type TableColumnsType } from "ant-design-vue";
import { computed, onMounted, reactive, ref } from "vue";
import { signHistory } from "@/services/managers";
import { useI18n } from "vue-i18n";
import type { ManagerSignHistory, ManagerSignHistoryParams } from "@/types";
import { useRouter, onBeforeRouteUpdate, type LocationQuery } from "vue-router";
import { PAGINATION } from "@/types/enum";
import { formatDateTimeSec } from "@/utils/date";
import loading from "@/common/loading";
import pagination from "@/common/pagination";

// i18n หรือการแปลงภาษา
const { t } = useI18n();
// router หรือการเปลี่ยนหน้า
const router = useRouter();
// ข้อมูลตาราง
const values = ref<ManagerSignHistory[]>([]);
// คอลัมน์ของตาราง
const columns = computed<TableColumnsType>(() => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: t("labels.uid"),
      dataIndex: "uid",
      key: "uid"
    },
    {
      title: t("labels.time"),
      dataIndex: "inTime",
      key: "time",
      customRender: ({ text }) => {
        return formatDateTimeSec(text);
      }
    },
    {
      title: "IP",
      dataIndex: "ipv4",
      key: "ip"
    },
    {
      title: t("labels.userAgent"),
      dataIndex: "ua",
      key: "ua"
    }
  ];
});
// ฟอร์มค้นหา
const form = reactive<ManagerSignHistoryParams>({
  uid: undefined
});

// โหลดข้อมูล
const loadData = async () => {
  loading.start();
  try {
    const res = await signHistory({
      uid: form.uid,
      page: pagination.current,
      limit: pagination.pageSize
    });

    if (res.status === 200) {
      if (res.data.code === 0) {
        values.value = res.data.result;
        pagination.total = res.data.records;
      } else {
        message.error(t("error.code", { code: res.data.code }));
      }
    }
  } catch (err) {
    console.error(err);
  }
  loading.finish();
};

// ค้นหาหรือเปลี่ยนหน้าของตาราง
const handleChange = async (page: PaginationProps) => {
  pagination.current = page.current || PAGINATION.DEFAULT_PAGE;
  pagination.pageSize = page.pageSize || PAGINATION.DEFAULT_LIMIT;

  router.push({
    query: {
      uid: form.uid,
      page: pagination.current,
      limit: pagination.pageSize
    }
  });
};

// โหลดฟอร์มจาก url และโหลดข้อมูล
const loadForm = async (query: LocationQuery) => {
  form.uid = Number(query.uid) || undefined;
  pagination.current = Number(query.page) || PAGINATION.DEFAULT_PAGE;
  pagination.pageSize = Number(query.limit) || PAGINATION.DEFAULT_LIMIT;
  await loadData();
};

// เมื่อโหลดครั้งแรก
onMounted(async () => {
  await loadForm(router.currentRoute.value.query);
});

// เมื่อ url มีการเปลี่ยนแปลง
onBeforeRouteUpdate(async (to) => {
  await loadForm(to.query);
});
</script>

<template>
  <a-form :form="form" layout="inline">
    <a-form-item :label="$t('labels.uid')" name="uid">
      <a-input-number v-model:value="form.uid" :min="259140" :style="{ width: '150px' }" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleChange" :loading="loading.state">
        {{ t("actions.search") }}
      </a-button>
    </a-form-item>
  </a-form>
  <a-divider></a-divider>
  <a-table
    :dataSource="values"
    :columns="columns"
    :pagination="pagination"
    :loading="loading.state"
    @change="handleChange"
  />
</template>
