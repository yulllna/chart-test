<template>
  <div>
    <canvas
      ref="canvasRef"
      :width="canvasWidth"
      :height="canvasHeight"
      @wheel="onWheel"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "GraphCanvas",
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const canvasWidth = 800;
    const canvasHeight = 600;

    // 확대/축소와 이동 관련 상태
    const scale = ref(1); // 초기 확대/축소 비율
    const offsetX = ref(0); // X축 이동량
    const offsetY = ref(0); // Y축 이동량

    // 기본 그래프 그리기 함수
    const drawGraph = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스 초기화

      // 변환 적용
      ctx.save();
      ctx.translate(offsetX.value, offsetY.value);
      ctx.scale(scale.value, scale.value);

      // 예제 그래프 (그리드 + 원)
      ctx.beginPath();
      ctx.strokeStyle = "#ddd";
      for (let i = 0; i < canvasWidth; i += 50) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasHeight);
      }
      for (let i = 0; i < canvasHeight; i += 50) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvasWidth, i);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.arc(200, 200, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // 마우스 휠로 확대/축소 처리
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? 0.9 : 1.1; // 휠 방향에 따른 확대/축소 비율
      scale.value *= delta;

      // 마우스 위치를 기준으로 확대/축소 중심을 보정
      const canvas = canvasRef.value!;
      const rect = canvas.getBoundingClientRect();
      const mouseX = (event.clientX - rect.left - offsetX.value) / scale.value;
      const mouseY = (event.clientY - rect.top - offsetY.value) / scale.value;

      offsetX.value -= mouseX * (delta - 1) * scale.value;
      offsetY.value -= mouseY * (delta - 1) * scale.value;

      renderCanvas();
    };

    // 캔버스를 다시 그리는 함수
    const renderCanvas = () => {
      const canvas = canvasRef.value;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      drawGraph(ctx);
    };

    onMounted(() => {
      renderCanvas();
    });

    return {
      canvasRef,
      canvasWidth,
      canvasHeight,
      onWheel,
    };
  },
});
</script>

<style>
canvas {
  border: 1px solid #ccc;
  cursor: grab;
}
</style>
