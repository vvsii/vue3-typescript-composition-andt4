import { reactive } from "vue";

const loading = reactive({
  value: false,
  start: () => {
    loading.value = true;
  },
  finish: () => {
    loading.value = false;
  }
});

export default loading;
