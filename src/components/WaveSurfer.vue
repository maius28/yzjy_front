<template>
  <!-- 仅用作音频播放控制栏，划分的区间仅作为说话人语句分割 -->
  <div class="wave-surfer-container">
    <div ref="waveformRef" class="waveform"/>
    <el-row>
      <el-col><el-button size="large" link :icon="isPlay?VideoPause:VideoPlay" @click="play" /></el-col>
    </el-row>
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions'
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor'
import { VideoPause, VideoPlay } from '@element-plus/icons-vue';
import { isNumber } from '@/utils/is';

const props = withDefaults(defineProps<{
  audioUrl: string
  regions?: {
    id?: string
    start: number // in seconds
    end: number // in seconds
    color?: string
  }[]
}>(),{
  regions:()=>[]
})

const emit = defineEmits(['play','pause','region-click','region-in']);

const waveformRef = ref<HTMLElement | null>(null)
let waveSurfer: WaveSurfer&RegionsPlugin | null = null

const parseTimeToSeconds=(timeStr: string|number): number=> {
  if(isNumber(timeStr))return timeStr;

  const times= timeStr.split(':');
  const timeUnitLen=times.length
  let seconds=0;
  for(let idx=  timeUnitLen-1; idx>=0; idx--){
    const time=times[idx];
    seconds+=Number(time)*Math.pow(60,timeUnitLen-idx-1);
  }
  
  return seconds;
}

const setupWaveSurfer = () => {
  if (!waveformRef.value) return
  const wavesurferPlugins = [
          RegionsPlugin.create({
                        regionsMinLength: 0.1,
                        // regions: [
                        //   // { start: 5, end: 7, color: 'hsla(200, 50%, 70%, 0.4)' }
                        // ],
                        regions:props.regions.map(region=>({
                          id: region.id || `wavesurfer-${Math.random().toString(36).substr(2, 9)}`,
                          resize:false,
                          drag:false,
                          start: parseTimeToSeconds(region.start),
                          end: parseTimeToSeconds(region.end),
                          color: 'rgba(1, 119, 202, 0.0)'
                          // color: region.color || 'rgba(1, 119, 202, 0.5)'
                        })),
                        dragSelection: false,
                        // contentEditable:!props.isView,
                        color: 'hsla(200, 50%, 70%, 0.0)'
                      }),
          Cursor.create({
                showTime: true,
                opacity: 1,
                customStyle:{'border-color':'white',height:'auto'},
                customShowTimeStyle: { 'background-color': '#000', color: '#fff', padding: '2px', 'font-size': '10px',
                  'box-sizing':'border-box',
                  'border':'1px solid white'
                }
              }),
        ];
  waveSurfer = WaveSurfer.create({
    container: waveformRef.value,
    barWidth: 2,
    backgroundColor: '#0E3058',
    // backend: 'MediaElement',
    displayMilliseconds: true,
    // debug: true,
    waveColor: '#0E5C89',
    progressColor: '#88654B',
    cursorColor: 'red',
    hideScrollbar: true,
    scrollParent: false,
    normalize: true,
    plugins: wavesurferPlugins
  })

  waveSurfer.load(props.audioUrl)

  // 监听 region 点击事件
  waveSurfer.on('region-click', (region) => {
    emit('region-click', {
      id: region.id,
      start: region.start,
      end: region.end
    })
  })
  //播放/暂停
  waveSurfer.on('play',()=>{
    emit('play');
    isPlay.value=true;
  })
  waveSurfer.on('pause',()=>{
    emit('pause');
    isPlay.value=false;
  })
  //到达标注区域
  waveSurfer.on('region-in', (region) => {
    emit('region-in', {
      id: region.id,
      start: region.start,
      end: region.end
    })
  })
}

onMounted(() => {
  setupWaveSurfer()
})

onBeforeUnmount(() => {
  if (waveSurfer) {
    waveSurfer.destroy()
    waveSurfer = null
  }
})

//控制栏
const isPlay = ref(false);
const play = () => {
  waveSurfer?.playPause()
}

const pause = () => {
  waveSurfer?.pause()
}

defineExpose({pause});
</script>

<style scoped lang="scss">
.wave-surfer-container {
  width: 100%;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  line-height: normal;
  .waveform {
    width: 100%;
    // height: 120px;
  }
}
</style>