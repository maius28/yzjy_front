<template>
  <div id="container"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Graph } from '@antv/g6';

onMounted(() => {

  fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          ports: [],
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      layout: {
        type: 'force',
        linkDistance: 50,
        clustering: true,
        nodeClusterBy: 'cluster',
        clusterNodeStrength: 70,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });


  // const graph = new Graph({
  //   container: document.getElementById('container'),
  //   width: 500,
  //   height: 500,
  //   data: {
  //     nodes: [
  //       {
  //         id: 'node-1',
  //         style: { x: 50, y: 100 },
  //       },
  //       {
  //         id: 'node-2',
  //         style: { x: 150, y: 100 },
  //       },
  //     ],
  //     edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
  //   },
  // });

  // graph.render();
});
</script>

<style scoped>
.container {
  height: calc(100vh-200px);
}
</style>
