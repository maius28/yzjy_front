<template>
  <div class="detection-page">
    <!-- 上半部分 -->
    <a-row class="top-section">
      <!-- 视频区 -->
      <a-col :span="10">
        <a-card title="视频上传(请先上传视频录像，再点击开始检测)" class="video-card" :bodyStyle="{ padding: '0', minHeight: '220px', position: 'relative' }">
          <template #extra>
            <a-space>
              <a-upload class="upload-btn" :showUploadList="false" :beforeUpload="handleBeforeUpload" accept="video/*">
                <a-button type="primary">
                  <template #icon><upload-outlined /></template>
                  上传视频
                </a-button>
              </a-upload>
              <a-button type="primary" @click="handleStartDetection" :loading="detecting">
                <template #icon><play-circle-outlined /></template>
                开始检测
              </a-button>
            </a-space>
          </template>
          <div class="video-container">
            <video v-if="videoUrl" ref="videoPlayer" class="video-player" :src="videoUrl" controls></video>
            <div v-else class="upload-container">          
            </div>
          </div>
        </a-card>
      </a-col>
      <!-- 右侧信息区 -->
      <a-col :span="14">
        <a-row>
          <a-col :span="12">
            <a-card title="基础信息" :bodyStyle="{ minHeight: '200px' }">
              <a-descriptions title="姓名：张三">
                <a-descriptions-item span="3"><img src="@/assets/keyFrameSample.jpg" class="keyframe-img" /></a-descriptions-item>
                <a-descriptions-item label="性别">男</a-descriptions-item>
                <a-descriptions-item label="年龄">35</a-descriptions-item>
                <a-descriptions-item label="所在监区">第xxx监区xxx房间</a-descriptions-item>
                <a-descriptions-item label="文化程度">小学</a-descriptions-item>
                <a-descriptions-item label="民族">汉</a-descriptions-item>
                <a-descriptions-item label="罪行">入室抢劫</a-descriptions-item>

                <a-descriptions-item label="入监日期">2020-01-01</a-descriptions-item>
                <a-descriptions-item label="人员整体状态">正常</a-descriptions-item>
                <a-descriptions-item label="平均分数">74</a-descriptions-item>
                <a-descriptions-item label="住址" span="2">
                  四川省宜宾市xxxx村xxx组
                </a-descriptions-item>
                <a-descriptions-item label="上次检测时间">
                  2020-01-01
                </a-descriptions-item>
                <a-descriptions-item label="备注" span="3">
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="情绪雷达" :bodyStyle="{ minHeight: '450px' }">
              <p v-if="!detectionResult">暂无检测结果</p>
              <div v-else class="radar-container">
                <!-- 雷达图G2容器 -->
                <Radar />
              </div>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <!-- 下半部分 -->
    <a-row class="bottom-section" style="margin-top:16px; ">
      <!-- 情感分析区 -->
      <a-col :span="16">
        <a-card title="大模型情感识别分析" style="min-height:500px;">
          <template #extra>
            <a-button type="primary" @click="showDialogueDrawer" :disabled="!detectionResult">
              <template #icon><sound-outlined /></template>
              语音分析
            </a-button>
          </template>
          <p v-if="!detectionResult">暂无检测结果</p>
          <div v-else>
              <!-- 折线图G2容器 -->
          <ColorLineChart />
          <div class="keyframes-section">
            <div class="keyframes-title">关键帧</div>
            <div class="keyframes-list">
              <img v-for="i in 3" :key="i" src="@/assets/keyFrameSample.jpg" class="keyframe-img" />
            </div>
          </div>
          </div>
        
        </a-card>
      </a-col>
      <!-- 右侧分析报告和检测记录 -->
      <a-col :span="8">
        <a-card title="分析报告（deepseek）" size="middle" style="margin-bottom:16px;min-height:550px;">
          <template #extra>
            <a-space>
              <a-button type="primary" @click="showRemarkModal" :disabled="!detectionResult">
                <template #icon><edit-outlined /></template>
                备注
              </a-button>
              <a-button type="primary" @click="handleDownloadReport" :disabled="!detectionResult">
                <template #icon><download-outlined /></template>
                下载报告
              </a-button>
            </a-space>
          </template>
          <div class="analysis-report">
            <p v-if="!detectionResult">暂无检测结果</p>
            <div v-else class="report-content">
              <p>检测时间：{{ detectionTime }}</p>
              <p>检测结果：</p>
              <p>{{ detectionResult }}</p>
              <p v-if="remark" class="remark-content">
                <span class="remark-label">备注：</span>
                {{ remark }}
              </p>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- 备注弹窗 -->
    <a-modal
      v-model:visible="remarkModalVisible"
      title="添加备注"
      @ok="handleRemarkSubmit"
      @cancel="handleRemarkCancel"
    >
      <a-textarea
        v-model:value="remarkInput"
        :rows="4"
        placeholder="请输入备注内容"
      />
    </a-modal>

    <!-- 语音对话抽屉 -->
    <a-drawer
      title="语音对话"
      placement="right"
      :width="800"
      :visible="dialogueVisible"
      @close="closeDialogue"
    >
      <dialogue-component
        v-if="dialogueVisible"
        :person-info="currentPerson"
        @close="closeDialogue"
      />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import Radar from '@/components/Radar.vue'
import ColorLineChart from '@/components/ColorLineChart.vue'
import DialogueComponent from '@/views/dialogue/index.vue'
import { ref } from 'vue'
import { UploadOutlined, PlayCircleOutlined, EditOutlined, DownloadOutlined, SoundOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import html2pdf from 'html2pdf.js'

const videoUrl = ref<string>('')
const videoPlayer = ref<HTMLVideoElement | null>(null)
const detecting = ref(false)
const detectionResult = ref('')
const detectionTime = ref('')

// 备注相关
const remarkModalVisible = ref(false)
const remarkInput = ref('')
const remark = ref('')

// 语音对话相关
const dialogueVisible = ref(false)
const currentPerson = ref({
  name: '张三',
  id: '001',
  age: 35,
  sex: '男',
  prison: 'A区',
  room: '101'
})

const handleBeforeUpload = (file: File) => {
  const isVideo = file.type.startsWith('video/')
  if (!isVideo) {
    message.error('只能上传视频文件！')
    return false
  }

  const isLt100M = file.size / 1024 / 1024 < 100
  if (!isLt100M) {
    message.error('视频大小不能超过 100MB！')
    return false
  }

  // 创建视频URL
  videoUrl.value = URL.createObjectURL(file)
  return false // 阻止自动上传
}

const handleStartDetection = async () => {
  if (!videoUrl.value) {
    message.warning('请先上传视频文件！')
    return
  }

  detecting.value = true
  try {
    // 模拟检测过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 更新检测结果
    detectionTime.value = new Date().toLocaleString()
    detectionResult.value = `根据视频分析，该人员当前情绪状态较为稳定，未发现明显异常。主要情绪特征如下：
1. 面部表情自然，无明显紧张或焦虑表现
2. 语音语调平稳，语速适中
3. 肢体语言放松，无异常动作
4. 情绪波动在正常范围内

建议：继续保持当前状态，定期进行情绪检测。`
    
    message.success('检测完成')
  } catch (error) {
    message.error('检测失败，请重试')
  } finally {
    detecting.value = false
  }
}

const showRemarkModal = () => {
  remarkInput.value = remark.value
  remarkModalVisible.value = true
}

const handleRemarkSubmit = () => {
  remark.value = remarkInput.value
  remarkModalVisible.value = false
  message.success('备注已保存')
}

const handleRemarkCancel = () => {
  remarkModalVisible.value = false
}

// 下载报告
const handleDownloadReport = async () => {
  if (!detectionResult.value) {
    message.warning('暂无检测结果可下载')
    return
  }

  try {
    const element = document.createElement('div')
    element.innerHTML = `
      <div style="padding: 20px;">
        <h2 style="text-align: center; margin-bottom: 20px;">情绪检测分析报告</h2>
        <p>检测时间：${detectionTime.value}</p>
        <p>检测结果：</p>
        <p>${detectionResult.value}</p>
        ${remark.value ? `<p>备注：${remark.value}</p>` : ''}
      </div>
    `

    const opt = {
      margin: 1,
      filename: `情绪检测报告_${new Date().toLocaleDateString()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }

    await html2pdf().set(opt).from(element).save()
    message.success('报告下载成功')
  } catch (error) {
    message.error('报告下载失败')
  }
}

const showDialogueDrawer = () => {
  dialogueVisible.value = true
}

const closeDialogue = () => {
  dialogueVisible.value = false
}
</script>

<style scoped>
.detection-page {
  background: #f8faff;
}

:deep(.ant-card) {
  margin: 10px 10px 10px 10px;
}

:deep(.ant-card:last-child) {
  margin: 10px 10px 10px 10px;
}

.top-section {
  margin-bottom: 8px;
}

.video-card {
  height: 500px;
  position: relative;
  margin-bottom: 0;
}

.video-container {
  width: 100%;
  height: calc(100% - 57px); /* 减去卡片头部的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  overflow: hidden;
}

.video-player {
  width: 100%;
  height: 450px;
  object-fit: contain;
}

.upload-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
}

.upload-tip {
  color: #666;
  font-size: 16px;
  text-align: center;
}

.info-list>div {
  margin-bottom: 4px 0 10px 0px;
  padding-bottom: 10px;
  font-size: medium;
}

.emotion-ratio {
  margin-top: 8px;
  text-align: center;
  font-size: 16px;
}

.keyframes-section {
  margin-top: 16px;
}

.keyframes-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.keyframes-list {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.keyframe-img {
  width: 200px;
  height: 150px;
  border: 1px solid #1890ff;
  object-fit: cover;
}

.voice-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.voice-chart {
  margin-bottom: 8px;
}

.analysis-report {
  padding: 16px;
}

.report-content {
  white-space: pre-line;
  line-height: 1.6;
}

.report-content p {
  margin-bottom: 12px;
}

.report-content p:first-child {
  color: #666;
  font-size: 14px;
}

.remark-content {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #d9d9d9;
}

.remark-label {
  color: #666;
  font-weight: 500;
}

</style>