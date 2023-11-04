import { PAGINATION } from "@/types/enum";
import type { PaginationProps } from "ant-design-vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

const pagination = reactive<PaginationProps>({
  current: PAGINATION.DEFAULT_PAGE,
  pageSize: PAGINATION.DEFAULT_LIMIT,
  showSizeChanger: true,
  showTotal: (total) => useI18n().t("labels.total", { total })
});

export default pagination;
