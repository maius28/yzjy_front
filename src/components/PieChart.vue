<script type="ts" setup>
import { onMounted, ref } from 'vue';
import { Chart } from '@antv/g2';

let chart;
const container = ref(null);

onMounted(() => {
    chart = renderChart(container.value);
});

function onClick() {
    updateChart(chart);
}

//渲染条形图
function renderChart(container) {
    const chart = new Chart({
        container,
        height: 400,
        width: 400,
        autoFit: false,
    });

    const data = [
        { item: '事例一', count: 40, percent: 0.4 },
        { item: '事例二', count: 21, percent: 0.21 },
        { item: '事例三', count: 17, percent: 0.17 },
        { item: '事例四', count: 13, percent: 0.13 },
        { item: '事例五', count: 9, percent: 0.09 },
    ];

    chart.coordinate({ type: 'theta', outerRadius: 0.8 });

    chart
        .interval()
        .data(data)
        .transform({ type: 'stackY' })
        .encode('y', 'percent')
        .encode('color', 'item')
        .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
        .label({
            position: 'outside',
            text: (data) => `${data.item}: ${data.percent * 100}%`,
        })
        .tooltip((data) => ({
            name: data.item,
            value: `${data.percent * 100}%`,
        }));

    chart.render();
    return chart;
}

// 更新条形图的数据
function updateChart(chart) {
}
</script>

<template>
    <div>
        <div ref="container"></div>
    </div>
</template>