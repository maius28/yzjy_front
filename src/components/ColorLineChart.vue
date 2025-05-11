<script type="ts" setup>
import { onMounted, ref } from 'vue';
import { Chart } from '@antv/g2';

let chart;
const container = ref(null);

onMounted(() => {
    if (container.value) {
        chart = renderLineChart(container.value);
    }
});

function onClick() {
    updateLineChart(chart);
}

//渲染折线图
function renderLineChart(container) {
    const chart = new Chart({
        container,
        autoFit: true,
        height: 300,
    });

    // 模拟数据
    const data = [
        { time: '12:00:00', value: 30 },
        { time: '12:01:00', value: 35 },
        { time: '12:02:00', value: 28 },
        { time: '12:03:00', value: 40 },
        { time: '12:04:00', value: 32 },
        { time: '12:05:00', value: 38 },
        { time: '12:06:00', value: 15 },
    ];

    chart
        .line()
        .data(data)
        .scale('x', { 
            tickCount: 5
        })
        .scale('y', { nice: true })
        .scale('color', { palette: 'turbo' })
        .encode('x', 'time')
        .encode('y', 'value')
        .encode('shape', 'smooth')
        .encode('color', 'value')
        .encode('series', () => undefined)
        .style('gradient', 'y')
        .style('lineWidth', 2)
        .style('lineJoin', 'round')
        .axis('x', { 
            title: '时间',
            label: {
                formatter: (val) => val
            }
        })
        .axis('y', { title: '检测分数' });

    chart.render();
    return chart;
}

// 更新折线图的数据
function updateLineChart(chart) {
    if (!chart) return;

    // 这里可以添加更新数据的逻辑
    const newData = [
        { date: '2024-01-01', value: 35 },
        { date: '2024-01-02', value: 40 },
        { date: '2024-01-03', value: 33 },
        { date: '2024-01-04', value: 45 },
        { date: '2024-01-05', value: 37 },
        { date: '2024-01-06', value: 43 },
        { date: '2024-01-07', value: 50 },
    ];

    chart.changeData(newData);
}
</script>

<template>
    <div class="chart-container">
        <div ref="container" style="width: 100%; height: 300px;"></div>
    </div>
</template>

<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
</style>