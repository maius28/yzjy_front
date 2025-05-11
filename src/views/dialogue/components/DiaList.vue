<template>
  <div class="dialogue-list-container">
    <div class="search-wrap"><el-input v-model="searchKeyword" placeholder="关键字过滤"/>
      <!-- <el-button icon="Search"/> -->
    </div>
    <el-scrollbar ref="scrollbarRef" wrap-class="chat-scrollbar" :max-height="maxHeight">
    <div class="chat-container">
      <div v-for="(message, index) in filteredMessages"
      :key="index" class="message-wrapper"
      :class="{ 'self-message': message.isSelf }"
      ref="messageRefs"
      >
        <AvatarIcon :username="message.speaker" class="avatar-icon"/>
        <!-- <AvatarIcon :style="{visibility: message.hasTriangle?'initial':'hidden'}" :username="message.speaker" class="avatar-icon"/> -->
        
        <div class="message-bubble" :class="{'triangle':message.hasTriangle}" @click="handleClick(message)">{{ message.text }}</div>
      
      </div>
    </div>
  </el-scrollbar>
  </div>
</template>

<script setup lang="tsx">
import { toLowerCase } from '@/utils/stringUtils';
import{ ScrollbarInstance } from 'element-plus';
import { ref, computed, toRef } from 'vue'
import AvatarIcon from '@/components/AvatarIcon.vue';
import { isNullOrUnDef, isString } from '@/utils/is';

const props=withDefaults(defineProps<{
  messages?: Message[];
  maxHeight?:string|number;
}>(),{
  messages:()=>[],
  maxHeight:'100%'
})

//https://uikit.webclown.net/wavesurfer/v6.6.4/docs/events.html
const emit=defineEmits(['msgClick'])

//消息渲染
interface Message {
  text: string;
  isSelf: boolean; // Indicates if the message is from the user
  //时间戳
  start: number;
  end: number;
}

const messages= toRef(props,'messages');

const hasTriangle=(index:number)=>{
  if(index==0){
    return true
  }else{
    return messages.value[index-1].isSelf!=messages.value[index].isSelf
  }
}

//消息关键字搜索
const searchKeyword = ref('');
// 关键词匹配判断
const isMatched = (index: number): boolean => {
  if (!searchKeyword.value) return true;
  const text = toLowerCase(messages.value[index]?.text) || '';
  return text.includes(searchKeyword.value.toLowerCase())
}

// 过滤后的消息列表（用于高亮）
const filteredMessages = computed(() => {
  return messages.value.filter((msg, index) => (isMatched(index))).map((item,index)=>({...item,hasTriangle:hasTriangle(index)}))
})

//触发点击事件以便于外部获取消息详情
const handleClick = (message:Message) => {
  // console.log(index);
  // console.log(messages[index]);
  emit('msgClick', message);
}

const scrollbarRef=ref<ScrollbarInstance |null>(null);
const messageRefs=ref<HTMLElement[]>([]);
//以start作为key便于快速确定位置
const msgMap=computed(()=>{
  const map=new Map<number,Message&Partial<HTMLElement>>();
  (isString(searchKeyword.value)?filteredMessages:messages).value.forEach((msg,index)=>{
        map.set(msg.start,{...msg,offsetTop:messageRefs.value![index].offsetTop});
      })

  return map;
})
const scrollToMsg=(start:number)=>{
  if(scrollbarRef.value){
    console.log(start);
    console.log(msgMap.value.get(start));
    const offsetTop=msgMap.value.get(start)?.offsetTop
    if(!isNullOrUnDef(offsetTop))scrollbarRef.value.setScrollTop(offsetTop);
  }
}

defineExpose({scrollToMsg})

</script>
<style scoped lang="scss">

.dialogue-list-container{
  display: flex ;
  flex-direction: column;
}

.search-wrap{
  display: flex;
}

.dark .message-wrapper{
  --opposite-color:#fff;
  --opposite-bgc:#2C2C2C;
}

.chat-scrollbar {
  overflow-y: auto;
}

.chat-container {
  padding: 10px;
}
.message-wrapper {
  --opposite-color:#000;
  --opposite-bgc:#f5f5f5;
  --self-bgc:#95EC69;


  margin: 10px 0;
  display: flex;
  align-items: flex-start;

  .avatar-icon {
    margin: 0 10px;
    order: 1;
  }

  .message-bubble {
    position: relative;
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 5px;
    word-wrap: break-word;
    color: var(--opposite-color);
    background-color: var(--opposite-bgc);
    order: 2;

    &.triangle::before {
      content: "";
      display: block;
      position: absolute;
      height: 0;
      width: 0;
      top: 0px;
      left: -10px; // Default to left side
      border: 10px solid transparent;
      border-bottom-width: 0px;
      border-top-color: var(--opposite-bgc);
    }
  }

  &.self-message {
    justify-content: flex-end;
    .avatar-icon {
      order: 2; // 自己的头像排在气泡后面
    }
    .message-bubble {
      background-color: var(--self-bgc);
      color:black;
      order: 1;
      &.triangle::before {
        left: auto !important; // Disable left positioning
        right: -10px !important; // Position triangle on the right side
        border-top-color: var(--self-bgc);
      }
    }
  }

}
</style>