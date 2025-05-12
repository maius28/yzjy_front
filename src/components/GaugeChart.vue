<script type="ts" setup>
import { onMounted, ref } from 'vue';
import { Chart } from '@antv/g2';

let chart;
const container = ref(null);

onMounted(() => {
    chart = renderRadarChart(container.value);
});

function onClick() {
    updateBarChart(chart);
}

//渲染关系图
function renderRadarChart(container) {
    const chart = new Chart({
        container,
        height: 400,
        autoFit: true,
    });

    chart
        .gauge()
        .data({
            value: {
                target: 80,
                total: 100,
                name: 'score',
                thresholds: [20, 50, 100],
            },
        })
        .scale('color', {
            range: [ 'green','#FAAD14', '#F4664A'],
        })
        .style(
            'textContent',
            (target, total) => `得分：${target}`,
        )
        .legend(false);

    chart.render();

    return chart
}

// 更新
function updateBarChart(chart) {
}
</script>

<template>
    <div class="graph-container">
        <div ref="container" class="graph-content"></div>
    </div>
</template>

<style scoped>
.graph-container {
    width: 100%;
    height: 100%;
}

.graph-content {
    width: 100%;
    height: 400px;
}
</style>