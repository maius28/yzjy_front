<script type="ts" setup>
import { onMounted, ref } from 'vue';
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

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
        width: 600,
        autoFit: true,
    });

    // 本地数据，节点和边混合在一个数组
    const data = {
        value: {
            nodes: [
                { id: '张三', group: "本人" },
                { id: '李四', group: "第一监区001" },
                { id: '王五', group: "第一监区001" },
                { id: '小明', group: "第一监区002" },
                { id: '小红', group: "第一监区002" },
                { id: '小五', group: "第一监区002" },
            ],
            links: [
                { source: '张三', target: '李四', value: 1 },
                { source: '张三', target: '王五', value: 8 },
                { source: '张三', target: '小明', value: 8 },
                { source: '张三', target: '小红', value: 8 },
                { source: '张三', target: '小五', value: 8 },
            ]
        }

    };

    chart
        .forceGraph()
        .data(data)
        // .data({
        //     type: 'fetch',
        //     value: 'https://assets.antv.antgroup.com/g2/miserable.json',
        // })
        .scale('color', { range: ['red','blue','green'] })

    chart.render();

    return chart;
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