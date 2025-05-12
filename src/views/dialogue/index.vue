<template>
  <div class="dialogue-container">
    <div class="dialogue-header">
      <div class="person-info">
        <span>姓名：{{ personInfo?.name }}</span>
        <span>编号：{{ personInfo?.id }}</span>
      </div>
    </div>
    
    <div class="dialogue-content">
      <DiaList ref="diaListRef" :messages="messages"/>
      <div style="padding-left: 5px;">
        <el-form label-position="top">
          <el-form-item ref="audioRefs" :key="index" :label="audio.label" v-for="(audio, index) in audioList">
            <WaveSurfer :audio-url=audio.url :regions="messages"
            @play="handlePlay(index)"
            @region-in="handleRegionIn"
            :ref="(el) => setWaveSurferRef(el as InstanceType<typeof WaveSurfer>, index)" />
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="dialogue-footer">
      <a-button type="primary" @click="$emit('close')">关闭</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRef, defineProps, defineEmits } from 'vue'
import DiaList from './components/DiaList.vue';
import WaveSurfer from '@/components/WaveSurfer.vue';
import { isNumber } from '@/utils/is';
import{FormItemInstance}from "element-plus";

const props = defineProps({
  personInfo: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);

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

const messages=ref([
  { "start": "00:21.910", "end": "00:27.150", "speaker": "男", "text": "如果你不爱我 就把我的心还我" },
  { "start": "00:27.150", "end": "00:32.329", "speaker": "男", "text": "你用爱换走青春 我还留下了什么" },
  { "start": "00:32.329", "end": "00:37.990", "speaker": "男", "text": "如果你还爱我 就什么话都别说" },
  { "start": "00:37.990", "end": "00:42.719", "speaker": "男", "text": "就跟我一路狂奔 就不要想太多" },
  { "start": "00:42.719", "end": "00:47.829", "speaker": "女", "text": "痴情不是罪过 忘情不是洒脱" },
  { "start": "00:47.829", "end": "00:52.959", "speaker": "男", "text": "为你想得撕心裂肺有什么结果" },
  { "start": "00:52.959", "end": "00:58.139", "speaker": "男", "text": "你说到底为什么 都是我的错" },
  { "start": "00:58.139", "end": "01:03.269", "speaker": "男", "text": "都把爱情想得太美现实太诱惑" },
  { "start": "01:03.269", "end": "01:08.389", "speaker": "女", "text": "到底为什么 让你更难过" },
  { "start": "01:08.389", "end": "01:13.400", "speaker": "男", "text": "这样爱你除了安慰还能怎么做" },

  { "start": "01:24.119", "end": "01:29.059", "speaker": "男", "text": "如果你不爱我 就把我的心还我" },
  { "start": "01:29.059", "end": "01:34.259", "speaker": "男", "text": "你用爱换走青春 我还留下了什么" },
  { "start": "01:34.259", "end": "01:39.990", "speaker": "男", "text": "如果你还爱我 就什么话都别说" },
  { "start": "01:39.990", "end": "01:44.890", "speaker": "男", "text": "就跟我一路狂奔 就不要想太多" },
  { "start": "01:44.890", "end": "01:49.719", "speaker": "女", "text": "痴情不是罪过 忘情不是洒脱" },
  { "start": "01:49.719", "end": "01:54.879", "speaker": "男", "text": "为你想得撕心裂肺有什么结果" },
  { "start": "01:54.879", "end": "02:00.099", "speaker": "男", "text": "你说到底为什么 都是我的错" },
  { "start": "02:00.099", "end": "02:05.209", "speaker": "男", "text": "都把爱情想得太美现实太诱惑" },
  { "start": "02:05.209", "end": "02:10.320", "speaker": "女", "text": "到底为什么 让你更难过" },
  { "start": "02:10.320", "end": "02:15.660", "speaker": "男", "text": "这样爱你除了安慰还能怎么做" },

  { "start": "02:15.660", "end": "02:18.070", "speaker": "女", "text": "寂寞寂寞是谁的错" },
  { "start": "02:18.070", "end": "02:20.730", "speaker": "男", "text": "寂寞让你变得那么脆弱" },
  { "start": "02:20.730", "end": "02:23.250", "speaker": "女", "text": "我们不要继续再这样沉默" },
  { "start": "02:23.250", "end": "02:26.070", "speaker": "男", "text": "这段感情应当要保持联络" },
  { "start": "02:26.070", "end": "02:28.430", "speaker": "女", "text": "我不想不问是什么星座" },
  { "start": "02:28.430", "end": "02:31.270", "speaker": "男", "text": "这个时代为什么那么多的迷惑" },
  { "start": "02:31.270", "end": "02:33.800", "speaker": "女", "text": "寂寞寂寞就变得冷漠" },
  { "start": "02:33.800", "end": "02:36.290", "speaker": "男", "text": "这样下去我们之间还能有什么" },
  { "start": "02:36.290", "end": "02:38.940", "speaker": "女", "text": "没错 是我那么多的冷漠" },
  { "start": "02:38.940", "end": "02:41.600", "speaker": "男", "text": "让你感觉到无比的失落" },
  { "start": "02:41.600", "end": "02:43.870", "speaker": "女", "text": "不过 一个女人的心" },
  { "start": "02:43.870", "end": "02:46.800", "speaker": "男", "text": "不仅仅渴望得到的一个承诺" },
  { "start": "02:46.800", "end": "02:49.080", "speaker": "女", "text": "我害怕欺骗 也害怕寂寞" },
  { "start": "02:49.080", "end": "02:51.870", "speaker": "男", "text": "更害怕我的心会渐渐地凋落" },
  { "start": "02:51.870", "end": "02:54.200", "speaker": "女", "text": "爱情 不是随便许诺" },
  { "start": "02:54.200", "end": "02:56.640", "speaker": "男", "text": "好了 不想再说了" },

  { "start": "02:56.640", "end": "02:59.380", "speaker": "合唱", "text": "有什么样的情有什么样的爱" },
  { "start": "02:59.380", "end": "03:01.960", "speaker": "合唱", "text": "用什么样的爱还什么样的债" },
  { "start": "03:01.960", "end": "03:04.600", "speaker": "女", "text": "我知道你的心里有些想不开" },
  { "start": "03:04.600", "end": "03:07.140", "speaker": "男", "text": "可是我的心里满满的全是爱" },
  { "start": "03:07.140", "end": "03:09.620", "speaker": "女", "text": "你回头看看我 不要再沉默" },
  { "start": "03:09.620", "end": "03:12.290", "speaker": "男", "text": "你说到底你想追求个什么结果" },
  { "start": "03:12.290", "end": "03:14.740", "speaker": "女", "text": "我知道你在躲 你为什么不说" },
  { "start": "03:14.740", "end": "03:17.460", "speaker": "男", "text": "你情愿让这样的思念把我淹没" },
  { "start": "03:17.460", "end": "03:23.400", "speaker": "女", "text": "你说到底为什么 都是我的错" },
  { "start": "03:23.400", "end": "03:27.850", "speaker": "男", "text": "都把爱情想得太美现实太诱惑" },
  { "start": "03:27.850", "end": "03:32.870", "speaker": "女", "text": "到底为什么 让你更难过" },
  { "start": "03:32.870", "end": "03:37.710", "speaker": "男", "text": "这样爱你除了安慰还能怎么做" },
  { "start": "03:37.710", "end": "03:43.280", "speaker": "女", "text": "你说到底为什么 都是我的错" },
  { "start": "03:43.280", "end": "03:48.490", "speaker": "男", "text": "都把爱情想得太美现实太诱惑" },
  { "start": "03:48.490", "end": "03:53.800", "speaker": "女", "text": "到底为什么 让你更难过" },
  { "start": "03:53.800", "end": "03:59.000", "speaker": "男", "text": "这样爱你除了安慰还能怎么做" }
].map(item=>({...item,start:parseTimeToSeconds(item.start),end:parseTimeToSeconds(item.end),isSelf:item.speaker=="男"})));

const audioList=[
  {label:"人声",url:"/videos/全是爱 人声.mp3"},
  {label:"男声",url:"/videos/全是爱 人声.mp3"},
  {label:"女声",url:"/videos/全是爱 人声.mp3"},
]

const waveSurferRefs = ref<(InstanceType<typeof WaveSurfer> | null)[]>([]);
const setWaveSurferRef = (el: InstanceType<typeof WaveSurfer>, index: number) => {
  waveSurferRefs.value[index] = el
}
//排他性暂停播放
const handlePlay=(index)=>{
  // 暂停其他音频
  waveSurferRefs.value.forEach((ws, i) => {
    if (i !== index && ws) {
      ws.pause()
    }
  })
}

const diaListRef=ref<InstanceType<typeof diaListRef>>();

const handleRegionIn=(region:{start:number,end:number})=>{
  diaListRef.value.scrollToMsg(region.start);
  
}

</script>

<style scoped>
.dialogue-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dialogue-header {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.person-info {
  display: flex;
  gap: 24px;
}

.dialogue-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.dialogue-footer {
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  text-align: right;
}
</style>