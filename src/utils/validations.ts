import type { FormInstance } from "ant-design-vue";
import type { Ref } from "vue";

/**
 * ตรวจสอบว่าสตริงอยู่ในช่วงความยาวที่กำหนด
 * @param str - สตริงที่จะตรวจสอบ
 * @param min - ความยาวขั้นต่ำของสตริง
 * @param max - ความยาวสูงสุดของสตริง
 * @returns True ถ้าสตริงอยู่ในช่วงความยาวที่กำหนด
 */
const inRange = (str: string | undefined, min: number, max: number) => {
  if (!str) return false;
  return str.length >= min && str.length <= max;
};

/**
 * ตรวจสอบว่าสตริงไม่อยู่ในช่วงความยาวที่กำหนด
 * @param str - สตริงที่จะตรวจสอบ
 * @param min - ความยาวขั้นต่ำของสตริง
 * @param max - ความยาวสูงสุดของสตริง
 * @returns True ถ้าสตริงไม่อยู่ในช่วงความยาวที่กำหนด
 */
const notRange = (str: string | undefined, min: number, max: number) => {
  return !inRange(str, min, max);
};

const invalidForm = async (formRef: Ref<FormInstance | undefined>) => {
  try {
    await formRef.value?.validate();
    return false;
  } catch (error) {
    return true;
  }
};

export { inRange, notRange, invalidForm };
