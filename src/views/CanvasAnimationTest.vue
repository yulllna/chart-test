<template>
   <div class="canvas-wrap">
      <h1>requestAnimationFrame</h1>
      <canvas class="canvas" width="1000" height="600" ref="canvasEl"></canvas>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const canvasEl = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

// 이미지처럼 canvas 요소엔 2배로 크기를 잡고, css로 원본 비율을 정의해주면 고해상도로 표현된다.

onMounted(() => {
   if (!canvasEl.value) {
      return;
   }

   canvasEl.value.addEventListener('click', () => {
      cancelAnimationFrame(timerId.value);
   });

   ctx.value = canvasEl.value?.getContext('2d');
   draw();
});

// const 라디안 = (각도: number) => {
//    return (각도 * Math.PI) / 180;
// };

const xPos = ref<number>(10);
const count = ref<number>(0);
const timerId = ref<any>(null);

const draw = () => {
   if (!canvasEl.value) {
      return;
   }

   // if (count.value % 30 === 0) {
   ctx.value?.clearRect(0, 0, canvasEl.value?.width, canvasEl.value?.height);
   ctx.value?.beginPath();
   ctx.value?.arc(xPos.value, 150, 10, 0, Math.PI * 2, false);
   ctx.value?.fill();

   xPos.value += 5;
   // }

   // ctx.value?.clearRect(0, 0, canvasEl.value?.width, canvasEl.value?.height);
   // ctx.value?.beginPath();
   // ctx.value?.arc(xPos.value, 150, 10, 0, Math.PI * 2, false);
   // ctx.value?.fill();

   // xPos.value += 1;

   count.value++;
   timerId.value = requestAnimationFrame(draw);
   console.log(timerId);

   // if (xPos.value >= canvasEl.value.width - 10) {
   //    cancelAnimationFrame(timerId.value);
   //    // return
   // }
};
</script>

<style scoped>
.canvas {
   width: 500px;
   height: 300px;
   background: #eee;
}
</style>
