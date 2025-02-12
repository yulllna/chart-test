<template>
   <canvas ref="canvas" width="600" height="400"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { GraphRenderer } from '../utils/graph/graphRenderer';

const canvas = ref<HTMLCanvasElement | null>(null);
const graphRenderer = ref<GraphRenderer | null>(null);

onMounted(() => {
    if (!canvas.value) {
        return;
    }

    // 기존 그래프 렌더러 정리
    if (graphRenderer.value) {
            graphRenderer.value = null;
        }

    graphRenderer.value = new GraphRenderer(canvas.value);
    graphRenderer.value.setSize();
    graphRenderer.value.setEvent();
    graphRenderer.value.drawGraph();

});
</script>