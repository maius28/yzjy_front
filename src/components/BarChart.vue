<script type="ts" setup>
import { onMounted, ref } from 'vue';
import { Chart } from '@antv/g2';

let chart;
const container = ref(null);

onMounted(() => {
    chart = renderChart(container.value);
});

function onClick() {
    updateBarChart(chart);
}

//渲染关系图
function renderChart(container) {

    const data = [
        { name: '2024-01-01', score: 50, color:'green' },
        { name: '2024-01-05', score: 60, color:'green' },
        { name: '2024-01-09', score: 55, color:'green' },
        { name: '2024-01-14', score: 58, color:'green' },
        { name: '2024-01-16', score: 46, color:'green' },
        { name: '2024-01-19', score: 80, color: '#cf1322' },
        { name: '2024-01-22', score: 90, color:'#cf1322' },
        { name: '2024-01-26', score: 55, color:'green' },
        { name: '2024-01-31', score: 60, color:'green' },
    ];

    const chart = new Chart({
        container,
        autoFit: true,
        height: 400,
    });


    // chart
    //     .interval()
    //     .data([
    //         { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    //     ])
    //     .encode('x', 'name')
    //     .encode('y', '月份')
    //     .encode('color', 'name')
    //     .style('minHeight', 50);

    chart
        .interval()
        .data(data)
        .encode('x', 'name')
        .encode('y', 'score')
        .encode('size', '30')
        .encode('color', 'color')
        .scale('color', { type: 'identity' })
        .axis('x', {title:'检测日期'})
        .axis('y', {title:'检测分数'});

    chart.render();

    return chart
}

// 更新
function updateBarChart(chart) {
}
</script>

<template>
    <div ref="container"></div>
</template>

<style scoped></style>