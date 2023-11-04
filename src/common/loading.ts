import { reactive } from "vue";

const loading = reactive({
  state: false,
  start: () => {
    loading.state = true;
  },
  finish: () => {
    loading.state = false;
  }
});

export default loading;
