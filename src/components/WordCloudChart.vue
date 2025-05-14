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
        autoFit: true,
        paddingTop: 40,
        height: 400,
    });


    const data = {
        "value": [
            {
                "value": 12,
                "text": "不想说话",
                "category": "1",
            },
            {
                "value": 1,
                "text": "心理难受",
                "category": "1"
            },
            {
                "value": 20,
                "text": "总担心",
                "category": "1"
            },
            {
                "value": 5,
                "text": "无助",
                "category": "1"
            },
            {
                "value": 12,
                "text": "怕出事",
                "category": "2"
            },
            {
                "value": 5,
                "text": "没胃口",
                "category": "4"
            },
            {
                "value": 10,
                "text": "怕被打",
                "category": "4"
            },
            {
                "value": 12,
                "text": "紧张",
                "category": "2"
            },
            {
                "value": 18,
                "text": "瞎想",
                "category": "2"
            },
            {
                "value": 22,
                "text": "没劲",
                "category": "1"
            },
            {
                "value": 17,
                "text": "想不明白",
                "category": "3"
            },
            {
                "value": 2,
                "text": "没用",
                "category": "3"
            },
            {
                "value": 2,
                "text": "老担心",
                "category": "3"
            },
        ]

    }

    chart
        .wordCloud()
        .data(data)
        .legend(false)
        .layout({
            spiral: 'rectangular',
            fontSize: [20, 100],
            rotate: () => {
                const angles = [0, 90]; // 只使用水平和垂直两种角度
                return angles[Math.floor(Math.random() * angles.length)];
            }
        })
        .encode('color', 'category')

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