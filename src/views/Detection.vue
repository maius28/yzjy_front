<template>
  <div class="detection-page">
    <!-- 上半部分 -->
    <a-row class="top-section">
      <!-- 视频区 -->
      <a-col :span="10">
        <a-card class="video-card" :bodyStyle="{ padding: '0', minHeight: '220px', position: 'relative' }">
          <div class="video-container">
            <video
              v-if="videoUrl"
              ref="videoPlayer"
              class="video-player"
              :src="videoUrl"
              controls
            ></video>
            <div v-else class="upload-container">
              <a-upload
                class="upload-btn"
                :showUploadList="false"
                :beforeUpload="handleBeforeUpload"
                accept="video/*"
              >
                <a-button type="primary" shape="round" size="large">
                  <template #icon><upload-outlined /></template>
                  上传视频
                </a-button>
              </a-upload>
            </div>
          </div>
        </a-card>
      </a-col>
      <!-- 右侧信息区 -->
      <a-col :span="14">
        <a-row>
          <a-col :span="12">
            <a-card title="基础信息" size="small" :bodyStyle="{ minHeight: '180px' }">
              <div class="info-list">
                <div>姓名：张三</div>
                <div>性别：男</div>
                <div>年龄：33</div>
                <div>籍贯：四川省阿坝州xxxx</div>
                <div>文化程度：小学</div>
                <div>婚姻状况：已婚</div>
                <div>检测状态：<a-tag color="green">已完成</a-tag></div>
                <div>检测时间：2024-01-01 16:00</div>
                <div>已检测次数: 31</div>
                <div>分数区间:[0-23]正常[23-100]异常</div>
                <div>检测分数:86</div>
              </div>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="人员总体情绪/画像" size="small" :bodyStyle="{ minHeight: '180px' }">
              <!-- 雷达图G2容器 -->
              <Radar />
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <!-- 下半部分 -->
    <a-row class="bottom-section" style="margin-top:16px;">
      <!-- 情感分析区 -->
      <a-col :span="16">
        <a-card title="大模型情感识别分析" size="small">
          <!-- 折线图G2容器 -->
          <ColorLineChart />
          <div class="keyframes-section">
            <div class="keyframes-title">关键帧</div>
            <div class="keyframes-list">
              <img v-for="i in 3" :key="i"
                src="@/assets/keyFrameSample.jpg"
                class="keyframe-img" />
            </div>
            <!-- <div class="voice-title">声纹</div> -->
            <!-- <div class="voice-chart" style="width:100%;height:40px;background:#f5f5f5;"></div> -->
          </div>
        </a-card>
      </a-col>
      <!-- 右侧分析报告和检测记录 -->
      <a-col :span="8">
        <a-card title="分析报告（deepseek）" size="small" style="margin-bottom:16px;min-height:180px;">
          <!-- 分析报告内容占位 -->
        </a-card>
        <a-card title="检测记录" size="small">
          <a-table :columns="recordColumns" :data-source="recordData" size="small" :pagination="{ pageSize: 5 }">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <a>查看详情</a>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import Radar from '@/components/Radar.vue'
import ColorLineChart from '@/components/ColorLineChart.vue'


import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const videoUrl = ref<string>('')
const videoPlayer = ref<HTMLVideoElement | null>(null)

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

const recordColumns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '资料文件', dataIndex: 'file', key: 'file' },
  { title: '检测时间', dataIndex: 'time', key: 'time' },
  { title: '操作', key: 'action' }
]
const recordData = [
  { index: 1, file: 'xxx.mp4', time: '2024-05-01 13:01' },
  { index: 2, file: 'xxx.mp4', time: '2024-05-01 13:01' },
  { index: 3, file: 'xxx.mp4', time: '2024-05-01 13:01' },
  { index: 4, file: 'xxx.mp4', time: '2024-05-01 13:01' },
  { index: 5, file: 'xxx.mp4', time: '2024-05-01 13:01' }
]
</script>

<style scoped>
.detection-page {
  padding: 12px;
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
  height: 220px;
  overflow: hidden;
  position: relative;
  margin-bottom: 0;
}

.video-bg {
  width: 100%;
  height: 220px;
  object-fit: cover;
  filter: brightness(0.7);
}

.upload-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.play-btn {
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 2;
  font-size: 32px;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  border: none;
}

.info-list>div {
  margin-bottom: 4px;
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
</style>