<template>
   <canvas ref="canvas" width="600" height="400"></canvas>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
   setup() {
      const canvas = ref<HTMLCanvasElement | null>(null);

      const drawAxes = (ctx: CanvasRenderingContext2D) => {
         ctx.beginPath();
         ctx.moveTo(50, 350); // x축 시작점
         ctx.lineTo(550, 350); // x축 끝점
         ctx.moveTo(50, 350); // y축 시작점
         ctx.lineTo(50, 50); // y축 끝점
         ctx.strokeStyle = '#000';
         ctx.stroke();
      };

      const drawAnimatedLine = (
         ctx: CanvasRenderingContext2D,
         points: { x: number; y: number }[],
         duration: number,
      ) => {
         const startTime = performance.now();

         // 선의 총 길이 계산
         let totalLength = 0;
         for (let i = 1; i < points.length; i++) {
            const dx = points[i].x - points[i - 1].x;
            const dy = points[i].y - points[i - 1].y;
            totalLength += Math.sqrt(dx * dx + dy * dy);
         }

         const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // 진행률 (0 ~ 1)
            const currentLength = progress * totalLength; // 현재까지 그려야 할 길이

            // Canvas 초기화 (이전 선만 지우기)
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // 축 다시 그리기 (한 번만 그린 축을 유지)
            drawAxes(ctx);

            // 선 그리기
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            let accumulatedLength = 0;
            for (let i = 1; i < points.length; i++) {
               const dx = points[i].x - points[i - 1].x;
               const dy = points[i].y - points[i - 1].y;
               const segmentLength = Math.sqrt(dx * dx + dy * dy);

               if (accumulatedLength + segmentLength >= currentLength) {
                  // 현재 선분에서 그려야 할 지점 계산
                  const ratio =
                     (currentLength - accumulatedLength) / segmentLength;
                  const x = points[i - 1].x + dx * ratio;
                  const y = points[i - 1].y + dy * ratio;
                  ctx.lineTo(x, y);
                  break;
               } else {
                  ctx.lineTo(points[i].x, points[i].y);
                  accumulatedLength += segmentLength;
               }
            }

            ctx.strokeStyle = '#007BFF';
            ctx.lineWidth = 2;
            ctx.stroke();

            if (progress < 1) {
               requestAnimationFrame(animate);
            }
         };

         requestAnimationFrame(animate);
      };

      onMounted(() => {
         if (canvas.value) {
            const ctx = canvas.value.getContext('2d');
            if (ctx) {
               // 축을 한 번만 그리기
               drawAxes(ctx);

               const points = [
                  { x: 50, y: 350 },
                  { x: 150, y: 250 },
                  { x: 250, y: 300 },
                  { x: 350, y: 200 },
                  { x: 450, y: 150 },
                  { x: 550, y: 250 },
               ];

               drawAnimatedLine(ctx, points, 2000); // 2초 동안 애니메이션
            }
         }
      });

      return {
         canvas,
      };
   },
};
</script>

<style scoped>
canvas {
   border: 1px solid #000;
}
</style>
