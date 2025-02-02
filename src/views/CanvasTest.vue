<template>
   <div class="canvas-wrap">
      <canvas class="canvas" width="1000" height="600" ref="canvasEl"></canvas>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const canvasEl = ref<HTMLCanvasElement | null>(null);

// 이미지처럼 canvas 요소엔 2배로 크기를 잡고, css로 원본 비율을 정의해주면 고해상도로 표현된다.

onMounted(() => {
   const ctx = canvasEl.value?.getContext('2d');
   if (!ctx) {
      return;
   }

   //    ctx.arc(100, 100, 50, 0, Math.PI * 2, false);
   //    ctx.fill();

   //    도형 그리기
   //    ctx.fillStyle = '#ff0000';
   //    ctx.fillRect(10, 10, 100, 100);
   //    ctx.fillStyle = '#000';
   //    ctx.fillRect(60, 60, 100, 100);
   //    ctx.clearRect(80, 80, 50, 50);
   //    ctx.strokeRect(160, 160, 100, 100);

   // 선 그리기
   //    ctx.beginPath();
   //    ctx.moveTo(100, 100);
   //    ctx.lineTo(300, 200);
   //    ctx.stroke();
   //    ctx.closePath();

   // 원 그리기 (360도 호를 그리는 것)
   // 중심점을 잡아줘야 함
   ctx.beginPath();
   ctx.arc(300, 200, 50, 0, 라디안(360), true);
   ctx.stroke();
   //    ctx.closePath();
   ctx.beginPath();
   ctx.arc(500, 100, 20, 0, 라디안(360), true);
   ctx.stroke();

   //    점선 그리기
   ctx.beginPath();
   ctx.setLineDash([5, 5]);
   ctx.moveTo(20, 50);
   ctx.lineTo(280, 50);
   ctx.stroke();
   //    긴 점선
   ctx.beginPath();
   ctx.setLineDash([10, 5]);
   ctx.moveTo(20, 70);
   ctx.lineTo(280, 70);
   ctx.stroke();
   //    점 점선
   ctx.beginPath();
   ctx.setLineDash([2, 10]);
   ctx.moveTo(20, 90);
   ctx.lineTo(280, 90);
   ctx.stroke();
   //    점-점-선 점선
   ctx.beginPath();
   ctx.setLineDash([2, 5, 10, 5]);
   ctx.moveTo(20, 110);
   ctx.lineTo(280, 110);
   ctx.stroke();
   //    긴 선(10px) - 짧은 공백(2px) - 점(2px) - 점(2px) - 긴 공백(10px) 점선
   ctx.beginPath();
   ctx.setLineDash([10, 2, 2, 2, 2, 10]);
   ctx.moveTo(20, 130);
   ctx.lineTo(280, 130);
   ctx.stroke();
   //     * 기호로 점선 만들기
   ctx.font = '20px Arial'; // 글자 크기 및 폰트 설정
   ctx.fillStyle = 'black'; // 글자 색상

   const startX = 20; // 시작 X 좌표
   const endX = 280; // 끝 X 좌표
   const step = 20; // 간격 설정

   for (let x = startX; x < endX; x += step) {
      ctx.fillText('*', x, 170); // * 기호를 특정 간격으로 배치
      ctx.fillText('-', x + 10, 165);
   }
});

const 라디안 = (각도: number) => {
   return (각도 * Math.PI) / 180;
};
</script>

<style scoped>
.canvas {
   width: 500px;
   height: 300px;
   background: #eee;
}
</style>
