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

//渲染条形图
function renderRadarChart(container) {
    const chart = new Chart({
        container,
        height: 400,
        width:400,
        autoFit: false,
    });

    // 准备数据
    const data = [
        { item: '兴奋', type: '出现频次', score: 3 },
        { item: '愤怒', type: '出现频次', score: 6 },
        { item: '平静', type: '出现频次', score: 5 },
        { item: '恐惧', type: '出现频次', score: 4 },
        { item: '厌恶', type: '出现频次', score: 6 },
        { item: '悲伤', type: '出现频次', score: 7 },
        { item: '快乐', type: '出现频次', score: 8 },
    ];

    // 声明可视化
    chart.coordinate({ type: 'polar' });

    chart
        .data(data)
        .scale('x', { padding: 0.5, align: 0 })
        .scale('y', { tickCount: 5, domainMax: 10 })
        .axis('x', {
            grid: true,
            gridLineWidth: 1,
            tick: false,
            gridLineDash: [0, 0],
        })
        .axis('y', {
            zIndex: 1,
            title: false,
            gridConnect: 'line',
            gridLineWidth: 1,
            gridLineDash: [0, 0],
        });

    chart
        .area()
        .encode('x', 'item')
        .encode('y', 'score')
        .encode('color', 'type')
        .style('fillOpacity', 0.5);

    chart
        .line()
        .encode('x', 'item')
        .encode('y', 'score')
        .encode('color', 'type')
        .style('lineWidth', 2);

    chart
        .point()
        .encode('x', 'item')
        .encode('y', 'score')
        .encode('color', 'type')
        .encode('shape', 'point')
        .encode('size', 3)
        .tooltip(null);

    chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });

    chart.render();

    return chart;
}

// 更新条形图的数据
function updateBarChart(chart) {
}
</script>

<template>
    <div>
        <div ref="container"></div>
    </div>
</template>