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
        height: 300,
        // width: 400,
        autoFit: true,
    });

    const data = {
        "value":
            [
                {
                    "emotion": "兴奋",
                    "score": 44,
                    "time": "00:01:00",
                },
                {
                    "emotion": "愤怒",
                    "score": 42,
                    "time": "00:01:00",
                },
                {
                    "emotion": "平静",
                    "score": 56,
                    "time": "00:01:00",
                },
                {
                    "emotion": "恐惧",
                    "score": 53,
                    "time": "00:01:00",
                },
                {
                    "emotion": "厌恶",
                    "score": 11,
                    "time": "00:01:00",
                },
                {
                    "emotion": "悲伤",
                    "score": 46,
                    "time": "00:01:00",
                },
                {
                    "emotion": "快乐",
                    "score": 43,
                    "time": "00:01:00",
                },
                {
                    "emotion": "兴奋",
                    "score": 44,
                    "time": "00:02:00",
                },
                {
                    "emotion": "愤怒",
                    "score": 42,
                    "time": "00:02:00",
                },
                {
                    "emotion": "平静",
                    "score": 56,
                    "time": "00:02:00",
                },
                {
                    "emotion": "恐惧",
                    "score": 53,
                    "time": "00:02:00",
                },
                {
                    "emotion": "厌恶",
                    "score": 11,
                    "time": "00:02:00",
                },
                {
                    "emotion": "悲伤",
                    "score": 46,
                    "time": "00:02:00",
                },
                {
                    "emotion": "快乐",
                    "score": 43,
                    "time": "00:02:00",
                },
                {
                    "emotion": "兴奋",
                    "score": 44,
                    "time": "00:03:00",
                },
                {
                    "emotion": "愤怒",
                    "score": 42,
                    "time": "00:03:00",
                },
                {
                    "emotion": "平静",
                    "score": 54,
                    "time": "00:03:00",
                },
                {
                    "emotion": "恐惧",
                    "score": 53,
                    "time": "00:03:00",
                },
                {
                    "emotion": "厌恶",
                    "score": 11,
                    "time": "00:03:00",
                },
                {
                    "emotion": "悲伤",
                    "score": 46,
                    "time": "00:03:00",
                },
                {
                    "emotion": "快乐",
                    "score": 43,
                    "time": "00:03:00",
                },
                {
                    "emotion": "兴奋",
                    "score": 44,
                    "time": "00:04:00",
                },
                {
                    "emotion": "愤怒",
                    "score": 42,
                    "time": "00:04:00",
                },
                {
                    "emotion": "平静",
                    "score": 66,
                    "time": "00:04:00",
                },
                {
                    "emotion": "恐惧",
                    "score": 53,
                    "time": "00:04:00",
                },
                {
                    "emotion": "厌恶",
                    "score": 11,
                    "time": "00:04:00",
                },
                {
                    "emotion": "悲伤",
                    "score": 46,
                    "time": "00:04:00",
                },
                {
                    "emotion": "快乐",
                    "score": 11,
                    "time": "00:04:00",
                },
                {
                    "emotion": "兴奋",
                    "score": 60,
                    "time": "00:05:00",
                },
                {
                    "emotion": "愤怒",
                    "score": 47,
                    "time": "00:05:00",
                },
                {
                    "emotion": "平静",
                    "score": 22,
                    "time": "00:05:00",
                },
                {
                    "emotion": "恐惧",
                    "score": 33,
                    "time": "00:05:00",
                },
                {
                    "emotion": "厌恶",
                    "score": 44,
                    "time": "00:05:00",
                },
                {
                    "emotion": "悲伤",
                    "score": 46,
                    "time": "00:05:00",
                },
                {
                    "emotion": "快乐",
                    "score": 43,
                    "time": "00:05:00",
                },
                {
                    "emotion": "兴奋",
                    "score": 44,
                    "time": "00:06:00",
                },
                {
                    "emotion": "愤怒",
                    "score": 42,
                    "time": "00:06:00",
                },
                {
                    "emotion": "平静",
                    "score": 21,
                    "time": "00:06:00",
                },
                {
                    "emotion": "恐惧",
                    "score": 53,
                    "time": "00:06:00",
                },
                {
                    "emotion": "厌恶",
                    "score": 11,
                    "time": "00:06:00",
                },
                {
                    "emotion": "悲伤",
                    "score": 70,
                    "time": "00:06:00",
                },
                {
                    "emotion": "快乐",
                    "score": 43,
                    "time": "00:06:00",
                }

            ]
    }

    // chart.title({
    //     title: 'Population by age and state',
    //     subtitle: 'It shows the population of U.S. by age and state.',
    // });

    chart
        .interval()
        .data(data)
        .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
        .transform({ type: 'dodgeX' })
        .encode('x', 'time')
        .encode('y', 'score')
        .encode('color', 'emotion')
        // .scale('y', { nice: true })
        .axis('x', { title: "时间" })
        .axis('y', { title: "概率" })
        ;

    chart
        .interaction('tooltip', { shared: true })
        .interaction('elementHighlightByColor', { background: true });

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