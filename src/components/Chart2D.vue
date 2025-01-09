<template>
    <div>
        <canvas
        ref="canvasRef"
        :width="canvasWidth"
        :height="canvasHeight"
        ></canvas>
    </div>
</template>

<script setup lang='ts'>
    import { ref, onMounted } from 'vue'
    import clusterData from '@/assets/json/clusterData.json'

   const {BodyFormMap} = clusterData.Data;
    console.log(BodyFormMap)
    const imageUrl = BodyFormMap.BodyFormMapIMG_URL

    const image = (new Image());
    image.src = imageUrl;

    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const canvasWidth = ref(800);
    const canvasHeight = ref(600);
    // const CANVAS_PADDING = 10;

    // 확대/축소와 이동 관련 상태
    const scale = ref(1); // 초기 확대/축소 비율
    const offsetX = ref(0); // X축 이동량
    const offsetY = ref(0); // Y축 이동량

    const setCanvasSize = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // 원본 이미지 크기
        const originalWidth = 885;
        const originalHeight = 542;
        const ratio = originalWidth / originalHeight;

        // 1) 우선 가로폭에 맞추어 설정
        let newWidth = screenWidth;
        let newHeight = screenWidth / ratio;

        // 2) 만약 세로가 화면 높이를 넘어간다면, 세로를 기준으로 맞춤
        if (newHeight > screenHeight) {
            newHeight = screenHeight;
            newWidth = screenHeight * ratio;
        }

        // 3) 최종 계산된 값을 캔버스 크기로 설정
        canvasWidth.value = newWidth;
        canvasHeight.value = newHeight;
    }

    // 캔버스에 그래프를 그리는 함수
    const drawGraph = (ctx: CanvasRenderingContext2D, image) => {
        ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value); // 캔버스 초기화

        // 변환 적용
      ctx.save();
      ctx.translate(offsetX.value, offsetY.value);
      ctx.scale(scale.value, scale.value);
        ctx.drawImage(image, 0, 0, canvasWidth.value, canvasHeight.value);
    }

    // 캔버스를 다시 그리는 함수
    const renderCanvas = (image) => {
      const canvas = canvasRef.value;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      drawGraph(ctx, image);
    };

    // 마우스 휠로 확대/축소 처리
    // const onWheel = (event: WheelEvent) => {
    //   event.preventDefault();

    //   const delta = event.deltaY > 0 ? 0.9 : 1.1; // 휠 방향에 따른 확대/축소 비율
    //   const tempScaleVal = scale.value * delta
    //   scale.value *= delta;

    //   console.log(event.deltaY)
    //   console.log(scale.value)

    //   // 마우스 위치를 기준으로 확대/축소 중심을 보정
    //   const canvas = canvasRef.value!;
    //   const rect = canvas.getBoundingClientRect();
    //   const mouseX = (event.clientX - rect.left - offsetX.value) / scale.value;
    //   const mouseY = (event.clientY - rect.top - offsetY.value) / scale.value;

    //   offsetX.value -= mouseX * (delta - 1) * scale.value;
    //   offsetY.value -= mouseY * (delta - 1) * scale.value;

    //   renderCanvas(image);
    // };

    onMounted(() => {
        setCanvasSize()
        image.onload = () => {
            console.log(image)
            renderCanvas(image);
        };
    });
</script>

<style>
</style>
