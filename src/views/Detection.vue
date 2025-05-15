<template>
  <div class="detection-page">
    <!-- 上半部分 -->
    <a-row class="top-section">
      <!-- 视频区 -->
      <a-col :span="10">
        <a-card title="视频上传(请先上传视频录像，再点击开始检测)" class="video-card"
          :bodyStyle="{ padding: '0', minHeight: '220px', position: 'relative' }">
          <template #extra>
            <a-space>
              <a-upload class="upload-btn" :showUploadList="false" :beforeUpload="handleBeforeUpload" accept="video/*">
                <a-button type="primary" v-show="!detecting">
                  <template #icon><upload-outlined /></template>
                  上传视频
                </a-button>
              </a-upload>
              <a-button type="primary" @click="handleStartDetection" :loading="detecting" v-show="!detecting">
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
                <a-descriptions-item span="2"><img src="@/assets/keyFrameSample.jpg"
                    class="keyframe-img" /></a-descriptions-item>
                <a-descriptions-item span="1"><a-statistic title="情感状态" :value="'异常'" style="margin-right: 50px;"
                    :value-style="{ color: '#cf1322' }" /></a-descriptions-item>
                <a-descriptions-item label="性别">男</a-descriptions-item>
                <a-descriptions-item label="年龄">35</a-descriptions-item>
                <a-descriptions-item label="文化程度">小学</a-descriptions-item>
                <a-descriptions-item label="民族">汉</a-descriptions-item>
                <a-descriptions-item label="籍贯">成都</a-descriptions-item>
                <a-descriptions-item label="罪行">入室抢劫</a-descriptions-item>
                <a-descriptions-item label="所在监区" span="3">第xxx监区xxx房间</a-descriptions-item>
                <a-descriptions-item label="最近检测时间" span="3">
                  2020-01-01 12:32:21
                </a-descriptions-item>
                <a-descriptions-item label="住址">
                  四川省宜宾市xxxx村xxx组</a-descriptions-item>
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
        <a-card title="大模型情感识别分析" style="min-height:600px;">
          <template #extra>
            <a-button type="primary" @click="showDialogueDrawer" :disabled="!detectionResult">
              <template #icon><sound-outlined /></template>
              语音识别
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
        <a-card title="分析报告（deepseek）" size="middle" style="margin-bottom:16px;min-height:600px;">
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
              <!-- <p>检测时间：{{ detectionTime }}</p> -->
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
    <a-modal v-model:visible="remarkModalVisible" title="添加备注" @ok="handleRemarkSubmit" @cancel="handleRemarkCancel">
      <a-textarea v-model:value="remarkInput" :rows="4" placeholder="请输入备注内容" />
    </a-modal>

    <!-- 语音对话抽屉 -->
    <a-drawer title="语音对话" placement="right" :width="1200" :visible="dialogueVisible" @close="closeDialogue">
      <dialogue-component v-if="dialogueVisible" :person-info="currentPerson" @close="closeDialogue" />
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
import { useRoute } from 'vue-router';

const videoUrl = ref<string>('')
const videoPlayer = ref<HTMLVideoElement | null>(null)
const detecting = ref(false)
const detectionResult = ref('')
const detectionTime = ref('')
const route = useRoute();

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

// 报告相关
const reportContent = `检测时间：2025-05-13 11:34 – 11:40
受测人：张三（男性，35岁，入监第5年）
访谈时长：6′12″
采集模态：4K面部视频 + 16kHz近讲麦音频 + Whisper 离线文本转录
模型名称：Video_LLAMA & DeepSeekV3
一、逐句情感检测与异常预警
时间戳 | 原文摘录 | 主导情感E | 强度S(0——100) | 区间判定
00:15 | 最近过得挺好的。 | 平静 | 48 | 正常
00:47 | 晚上有时会睡不着。 | 焦虑 | 62 | 正常(临界)
01:25 | 我没和任何人起冲突。 | 回避 | 58 | 正常
02:03 | 我也不知道自己在想什么。 | 自责 | 71 | **异常消极**
02:58 | 没事，真的没事。 | 压抑 | 66 | **异常消极**
03:35 | （沉默 7 秒） | 抑制 | 74 | **异常消极**
04:10 | 我保证以后表现好。 | 焦虑 | 60 | 正常(临界)
05:20 | 能不能早点放我出去？ | 焦虑 | 68 | **异常消极**
情感强度区间：0——30 异常消极 | 30——70 正常 | 70——100 异常积极
基于全时序计算的情感异常得分 AES = 77 → 判定：异常消极——焦虑
二、对话内容欺骗检测摘要
序号 | 可疑句 | 可信度C(0——1) | 主要线索 | 判定
① | 我没和任何人起冲突。 | 0.43 | 眼神上飘/底噪升高 | 存疑
② | 没事，真的没事。 | 0.38 | 双重否定/AU12不对称 | 可能隐瞒
③ | 我保证以后表现好。 | 0.57 | 呼吸骤增/夸大承诺 | 谨慎观察
三、总体结论与建议
1. AES=77 表明存在中——高强度抑郁与焦虑混合，情绪波动显著。
2. 自我伤害或冲动风险升高，建议 24h 内安排心理干预。
3. 与同囚冲突情况存在信息遮掩，需48h 内二次访谈并调监控核实。
4. 建议夜间加强监控并建立连续情绪日志，EI 连续 >8 即自动预警。`

const handleStartDetection = async () => {
  if (!videoUrl.value) {
    message.warning('请先上传视频文件！')
    return
  }

  detecting.value = true
  message.loading('检测中..当前进度50%', 2, () => {
    try {


      // // 模拟检测过程
      // await new Promise(resolve => setTimeout(resolve, 2000))

      // 更新检测结果
      detectionTime.value = new Date().toLocaleString()
      detectionResult.value = reportContent


      message.success('检测完成')
    } catch (error) {
      message.error('检测失败，请重试')
    } finally {
      detecting.value = false
    }
  });

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

if (route.query.detecting === 'true') {
  detecting.value = true;
  detectionResult.value = reportContent
  videoUrl.value = '@/assets/sample.mp4' // 替换为实际视频URL
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
  height: calc(100% - 57px);
  /* 减去卡片头部的高度 */
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
  padding: 0;
  overflow-y: auto;
  height: 500px;
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