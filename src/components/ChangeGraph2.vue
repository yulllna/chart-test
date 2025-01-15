<template>
   <div>
      <canvas ref="canvas"></canvas>
   </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChangeGraphTest from '@/assets/json/ChangeGraphTest.json';

const { Data } = ChangeGraphTest;
const canvas = ref<HTMLCanvasElement | null>(null);

// Canvas 크기
const padding = 32; // 좌우 여백
const canvasWidth = ref<number>(0); // 캔버스 너비
const canvasHeight = ref<number>(0); // 고정 높이

const rect = ref<null | DOMRect>(null);

onMounted(() => {
   //    setData();
   setSize();
   drawGraph();
});

const selectTimeTicks = (data: string[], numTicks: number): string[] => {
   console.log(data, numTicks);
   const interval = Math.floor(data.length / numTicks);
   return data.filter((_, index) => index % interval === 0).slice(0, numTicks);
};

const numXTicks = 5; // X축 틱 개수
const WTData = {
   minWt: Math.max(...Data.map(item => item.WT)),
   maxWt: Math.min(...Data.map(item => item.WT)),
   WtDataList: Data.map(item => item.WT),
   dateTimes: Data.map(item => item.DATETIMES),
   selectedDates: selectTimeTicks(
      Data.map(item => item.DATETIMES),
      numXTicks,
   ), // 날짜 제대로 안나옴
};

console.log(WTData);

// 날짜 포맷 변환
const formatDate = (timestamp: string): string => {
   const date = new Date(timestamp);
   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
   )}-${String(date.getDate()).padStart(2, '0')}`;
};

// X축 좌표 계산
const getX = (index: number, numTicks: number): number => {
   const graphWidth = canvasWidth.value - padding * 2;
   const tickSpacing = graphWidth / (numTicks - 1);
   return padding + tickSpacing * index;
};

// Y축 좌표 계산
const getY = (weight: number, minWeight: number, maxWeight: number): number => {
   const graphHeight = canvasHeight.value - padding * 2;
   return (
      padding +
      graphHeight -
      ((weight - minWeight) / (maxWeight - minWeight)) * graphHeight
   );
};

const setSize = () => {
   if (canvas.value) {
      const dpr = window.devicePixelRatio || 1; // DPR 처리
      rect.value = canvas.value.getBoundingClientRect();
      canvasWidth.value = rect.value.width;
      canvasHeight.value = rect.value.height;

      canvas.value.width = rect.value.width * dpr; // 물리적 크기
      canvas.value.height = rect.value.height * dpr;

      const ctx = canvas.value.getContext('2d');
      if (ctx) {
         ctx.scale(dpr, dpr); // DPR 보정
      }
   }
};

// 그래프 그리기
const drawGraph = () => {
   if (!canvas.value) {
      return;
   }

   const ctx = canvas.value?.getContext('2d');
   if (!ctx) return;

   // DPR 정보 가져오기
   const dpr = window.devicePixelRatio;
   // 캔버스 요소의 크기 가져오기
   const rect = canvas.value.getBoundingClientRect();

   canvas.value.width = rect.width * dpr;
   canvas.value.height = rect.height * dpr;

   // 캔버스 유닛 크기 보정
   ctx.scale(dpr, dpr);

   // 배경 초기화
   ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

   // X축 그리기

   console.log(rect.width);
   console.log(dpr);
   console.log(canvas.value.width);

   ctx.beginPath();
   ctx.strokeStyle = 'red';
   ctx.moveTo(padding, canvasHeight.value - padding); // x, y
   ctx.lineTo(canvasWidth.value - padding, canvasHeight.value - padding); // x, y
   ctx.stroke();

   // X축 틱 및 텍스트
   WTData.selectedDates.forEach((date, index) => {
      const x = getX(index, numXTicks);
      ctx.beginPath();
      ctx.moveTo(x, canvasHeight.value - padding);
      ctx.lineTo(x, canvasHeight.value - padding + 5);
      ctx.stroke();

      // 텍스트
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(formatDate(date), x, canvasHeight.value - padding + 10);
   });

   // Y축 그리기
   ctx.beginPath();
   ctx.moveTo(padding, padding);
   ctx.lineTo(padding, canvasHeight.value - padding);
   ctx.stroke();

   // Y축 틱 및 텍스트
   const weightInterval = 1; // Y축 틱 간격
   const numYTicks = Math.abs(
      Math.ceil((WTData.maxWt - WTData.minWt) / weightInterval),
   );
   console.log(WTData.WtDataList);
   console.log(numYTicks);

   for (let i = 0; i <= numYTicks; i++) {
      const weight = WTData.minWt + i * weightInterval;
      const y = getY(weight, WTData.minWt, WTData.maxWt);

      ctx.beginPath();
      ctx.moveTo(padding - 5, y);
      ctx.lineTo(padding, y);
      ctx.stroke();

      // 텍스트
      ctx.textAlign = 'right'; // 오른쪽 정렬
      ctx.textBaseline = 'middle'; // 텍스트 중앙 기준
      ctx.fillText(weight.toFixed(1), padding - 10, y); // 소수점 고정
   }

   // 데이터 그래프 그리기
   ctx.beginPath();
   WTData.WtDataList.forEach((weight, index) => {
      const x = getX(index, WTData.WtDataList.length);
      const y = getY(weight, WTData.minWt, WTData.maxWt);

      if (index === 0) {
         ctx.moveTo(x, y);
      } else {
         ctx.lineTo(x, y);
      }
   });
   ctx.strokeStyle = 'blue';
   ctx.stroke();
};
</script>

<style scoped>
canvas {
   width: 100%;
   display: block;
   border: 1px solid #000;
}
</style>
