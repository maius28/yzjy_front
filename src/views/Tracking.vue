<template>
  <div class="tracking-page">
    <a-row>
      <a-col :span="8">
        <a-card title="基础信息" :bodyStyle="{ minHeight: '200px' }">
          <a-descriptions title="姓名：张三">
            <a-descriptions-item span="2"><img src="@/assets/keyFrameSample.jpg"
                class="keyframe-img" /></a-descriptions-item>
            <a-descriptions-item span="1"><a-statistic title="情感状态/分数" :value="'异常/80'" style="margin-right: 50px;"
                :value-style="{ color: '#cf1322' }" /></a-descriptions-item>
            <a-descriptions-item label="性别">男</a-descriptions-item>
            <a-descriptions-item label="年龄">35</a-descriptions-item>
            <a-descriptions-item label="文化程度">小学</a-descriptions-item>
            <a-descriptions-item label="民族">汉</a-descriptions-item>
            <a-descriptions-item label="籍贯">成都</a-descriptions-item>
            <a-descriptions-item label="罪行">入室抢劫</a-descriptions-item>
            <a-descriptions-item label="所在监区" span="3">第xxx监区xxx房间</a-descriptions-item>
            <a-descriptions-item label="最近检测时间" span="3">
              2020-01-01 12:31:21
            </a-descriptions-item>
            <a-descriptions-item label="住址" span="3">
              四川省宜宾市xxxx村xxx组
            </a-descriptions-item>

          </a-descriptions>
        </a-card>
      </a-col>

      <a-col :span="8">
        <a-card title="统计词云" :bodyStyle="{ minHeight: '450px' }">
          <div class="radar-container">
            <!-- <RelationGraph /> -->
            <WordCloudChart />
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="AI分析建议" :bodyStyle="{ minHeight: '450px' }">
          <img src="@/assets/robot-ai.png" class="robot-icon" />
          <div class="radar-container">
            <!-- <GaugeChart /> -->
            <div class="ai-message">
              <!-- <div class="robot-container">
                <img src="@/assets/robot-ai.png" class="robot-icon" />
                <div class="robot-pulse"></div>
              </div> -->
              <div class="message-content">
                <span class="typing-text">{{ typingText }}</span>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <!-- 上半部分：折线图 -->
      <a-col :span="24">
        <a-card title="历史检测分数跟踪">
          <!-- <ColorLineChart /> -->
           <BarChart />
        </a-card>
      </a-col>
    </a-row>

    <!-- 下半部分：检测记录表格 -->
    <a-row style="margin-top: 16px">
      <a-col :span="24">
        <a-card title="检测记录">
          <a-table :columns="columns" :data-source="data" :pagination="pagination">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-tag :color="record.status === '正常' ? 'green' : 'red'">
                  {{ record.status }}
                </a-tag>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-button type="link" @click="goToDetection(record)">查看详情</a-button>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import BarChart from '@/components/BarChart.vue'
import RelationGraph from '@/components/RelationGraph.vue'
import GaugeChart from '@/components/GaugeChart.vue'
import WordCloudChart from '@/components/WordCloudChart.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const personId = route.query.id

// 表格列定义
const columns = [
  {
    title: '检测时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '检测分数',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '情绪状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '主要情绪',
    dataIndex: 'mainEmotion',
    key: 'mainEmotion',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '操作',
    key: 'action',
  },
]

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 100,
  showSizeChanger: true,
  showQuickJumper: true,
})

// 模拟数据
const data = [
  {
    key: '1',
    time: '2024-01-01 10:00',
    score: 86,
    status: '异常',
    mainEmotion: '愤怒',
    remark: '情绪波动较大',
  },
  {
    key: '2',
    time: '2024-01-02 14:30',
    score: 45,
    status: '正常',
    mainEmotion: '平静',
    remark: '情绪稳定',
  },
  {
    key: '3',
    time: '2024-01-03 09:15',
    score: 92,
    status: '异常',
    mainEmotion: '焦虑',
    remark: '需要关注',
  },
]

// 查看详情
const goToDetection = (id: string) => {
  router.push(`/detection/${id}?detecting=true`);
};

// 打字机效果
const typingText = ref('')
const fullText = '正在分析人员行为数据：经评估，犯人张某近期表现出明显的焦虑与孤独情绪，在与他人交流时频繁出现烦躁不安的状态，参与集体活动积极性降低。分析其原因，可能源于与外界联系减少及对未来不确定性的担忧。对此，建议安排专业心理咨询师定期开展一对一疏导，帮助其调节情绪、缓解压力；同时，适当增加家属探访频次，给予情感支持；鼓励其参与技能培训和文体活动，转移注意力，重建生活信心，逐步引导其以积极心态面对改造生活'
let currentIndex = 0

const typeText = () => {
  console.log("开始了")
  if (currentIndex < fullText.length) {
    console.log("进来了")
    typingText.value += fullText[currentIndex]
    currentIndex++
    setTimeout(typeText, 100)
  }
}

onMounted(() => {
  typeText()
})
</script>

<style scoped>
.tracking-page {
  padding: 24px;
  background: #f8faff;
}

:deep(.ant-card) {
  margin: 0px 10px 10px 0px;
}

.robot-icon {
  height: 50px;
  width: 50ox;
}

.ai-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
}

.robot-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.robot-icon {
  height: 50px;
  width: 50px;
  animation: float 2s ease-in-out infinite;
}

.robot-pulse {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(24, 144, 255, 0.2);
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

.message-content {
  flex: 1;
}

.typing-text {
  font-size: 16px;
  color: #333;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }

  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>