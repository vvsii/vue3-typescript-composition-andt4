import dayjs from "dayjs";

/**
 * จัดรูปแบบค่าเวลาที่กำหนดให้เป็นสตริงในรูปแบบ 'YYYY-MM-DD'
 * @param time ค่าเวลาที่จะจัดรูปแบบ อาจเป็นตัวเลข (มิลลิวินาทีตั้งแต่ยุค Unix) หรือสตริง (สตริงวันที่ที่สามารถแปลงด้วย dayjs)
 * @returns สตริงในรูปแบบ 'YYYY-MM-DD HH:mm'
 */
const formatDate = (time: number | string) => {
  return dayjs(time).format("YYYY-MM-DD");
};

/**
 * จัดรูปแบบค่าเวลาที่กำหนดให้เป็นสตริงในรูปแบบ 'YYYY-MM-DD HH:mm'
 * @param time ค่าเวลาที่จะจัดรูปแบบ อาจเป็นตัวเลข (มิลลิวินาทีตั้งแต่ยุค Unix) หรือสตริง (สตริงวันที่ที่สามารถแปลงด้วย dayjs)
 * @returns สตริงในรูปแบบ 'YYYY-MM-DD HH:mm'
 */
const formatDateTime = (time: number | string) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm");
};

/**
 * จัดรูปแบบค่าเวลาที่กำหนดให้เป็นสตริงในรูปแบบ 'YYYY-MM-DD HH:mm:ss'
 * @param time ค่าเวลาที่จะจัดรูปแบบ อาจเป็นตัวเลข (มิลลิวินาทีตั้งแต่ยุค Unix) หรือสตริง (สตริงวันที่ที่สามารถแปลงด้วย dayjs)
 * @returns สตริงในรูปแบบ 'YYYY-MM-DD HH:mm'
 */
const formatDateTimeSec = (time: number | string) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

export { formatDate, formatDateTime, formatDateTimeSec };
