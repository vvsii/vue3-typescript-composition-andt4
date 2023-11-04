# web-template

เทมเพลตนี้จะช่วยให้คุณเริ่มต้นพัฒนาด้วย Vue 3 ใน Vite ได้

## การตั้งค่า IDE ที่แนะนำ

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (และปิดการใช้งาน Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## ประเภทไฟล์การสนับสนุนสำหรับการนำเข้า `.vue` ใน TS

TypeScript ไม่สามารถจัดการข้อมูลประเภทสำหรับการนำเข้า `.vue` ตามค่าเริ่มต้น ดังนั้นเราจึงแทนที่ `tsc` CLI ด้วย `vue-tsc` สำหรับการตรวจสอบประเภท ในตัวแก้ไข เราต้องการ [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) เพื่อทำให้บริการภาษา TypeScript ทราบ `.vue` ประเภท

หากปลั๊กอิน TypeScript แบบสแตนด์อโลนไม่เร็วพอสำหรับคุณ Volar ได้ใช้ [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) ที่มีประสิทธิภาพมากกว่า คุณสามารถเปิดใช้งานได้โดยทำตามขั้นตอนต่อไปนี้:

1. ปิดการใช้งานส่วนขยาย TypeScript ในตัว
     1) เรียกใช้ `Extensions: Show Built-in Extensions` จากชุดคำสั่งของ VSCode
     2) ค้นหา `คุณสมบัติภาษา TypeScript และ JavaScript` คลิกขวาและเลือก `ปิดการใช้งาน (พื้นที่ทำงาน)`
2. โหลดหน้าต่าง VSCode ใหม่โดยเรียกใช้ `Developer: Reload Window` จากชุดคำสั่ง

## ปรับแต่งการตั้งค่า

ดูได้ที่ [Vite Configuration Reference](https://vitejs.dev/config/).

## เริ่มต้นโปรเจค

```sh
npm install
```

### รันโปรเจค

```sh
npm run dev
```

### build โปรเจค

```sh
npm run build
```
### ตรวจสอบประเภทข้อมูล และ build โปรเจคสำหรับเทส
```sh
npm run build:test
```

### ตรวจสอบประเภทข้อมูล และ build โปรเจคสำหรับโปรดักชั่น
```sh
npm run build:prod
```

### build อย่างเดียว
```sh
npm run build-only
```

### ตรวจสอบประเภทข้อมูล
```sh
npm run type-check
```

### Lint ด้วย [ESLint](https://eslint.org/)

```sh
npm run lint
```

### จัดฟอร์แมตโค้ด
```sh
npm run format
```

### Lint, ตรวจสอบประเภทข้อมูล และจัดฟอร์แมตโค้ด
```sh
npm run before-vcs
```