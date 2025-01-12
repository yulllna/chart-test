<template>
   <div>
      <canvas ref="canvasRef" width="400px" height="300px"></canvas>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LineChart } from '../utils/graph/changeGraph';

const canvasRef = ref<HTMLCanvasElement | null>(null);
// const canvasWidth = ref(800);
// const canvasHeight = ref(600);

onMounted(() => {
   // setCanvasSize();
   renderCanvas();
});

// const setCanvasSize = () => {
//    const screenWidth = window.innerWidth;
//    const screenHeight = window.innerHeight;

//    // 원본 이미지 크기
//    const originalWidth = 7;
//    const originalHeight = 3;
//    const ratio = originalWidth / originalHeight;

//    // 1) 우선 가로폭에 맞추어 설정
//    let newWidth = screenWidth;
//    let newHeight = screenWidth / ratio;

//    // 2) 만약 세로가 화면 높이를 넘어간다면, 세로를 기준으로 맞춤
//    if (newHeight > screenHeight) {
//       newHeight = screenHeight;
//       newWidth = screenHeight * ratio;
//    }

//    // 3) 최종 계산된 값을 캔버스 크기로 설정
//    canvasWidth.value = newWidth;
//    canvasHeight.value = newHeight;
// };

const renderCanvas = () => {
   const canvas = canvasRef.value;
   if (!canvas) return;

   const ctx = canvas.getContext('2d');
   if (!ctx) return;

   const chart = new LineChart(canvas, ctx);
   setInterval(() => {
      chart.updateDate([Date.now(), Math.random() * 100]);
   }, 1000);
};
</script>

<style scoped></style>
