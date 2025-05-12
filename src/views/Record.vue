<template>
  <div class="record-page">
      <!-- 搜索区域 -->
      <div class="search-area">
        <a-form layout="inline">
          <a-form-item label="编号">
            <a-input v-model:value="searchForm.id" placeholder="请输入编号" allowClear />
          </a-form-item>
          <a-form-item label="姓名">
            <a-input v-model:value="searchForm.name" placeholder="请输入姓名" allowClear />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSearch">
              <template #icon><search-outlined /></template>
              搜索
            </a-button>
            <a-button style="margin-left: 8px" @click="resetSearch">
              <template #icon><reload-outlined /></template>
              重置
            </a-button>
          </a-form-item>
        </a-form>
      </div>

      <!-- 表格区域 -->
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
      
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === '异常' ? 'red' : 'green'">
              {{ record.status }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'crimes'">
          <span>
            <a-tag v-for="tag in record.crimes" :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 3 ? 'red' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
          <template v-if="column.key === 'action'">
            <a @click="goToDetection(record)">查看详情</a>
          </template>
        </template>
      </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const router = useRouter()
const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  id: '',
  name: ''
})

// 表格列定义
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '所属监区',
    key: 'prison',
    dataIndex: 'prison',
  },
  {
    title: '入监日期',
    key: 'enterDate',
    dataIndex: 'enterDate',
  },
  {
    title: '罪行',
    key: 'crimes',
    dataIndex: 'crimes',
  },
  {
    title: '检测时间',
    dataIndex: 'detectionTime',
    key: 'detectionTime',
    width: 180,
  },
  {
    title: '情感状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
  {
    title: '检测分数',
    dataIndex: 'score',
    key: 'score',
    width: 100,
  },
  {
    title: 'AI指导',
    dataIndex: 'needHelp',
    key: 'needHelp',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 100,
  },
]

// 模拟数据
const tableData = ref([
  {
    id: '001',
    name: '张三',
    gender: '男',
    age: 33,
    detectionTime: '2024-01-01 16:00',
    status: '正常',
    score: 86,
    needHelp: "人员状态稳定",
    prison: '第xxx监区xxx房间',
    enterDate: '2012-01-31',
    crimes: ['故意伤害罪', '抢劫罪'],
  },
  {
    id: '002',
    name: '李四',
    gender: '女',
    age: 28,
    detectionTime: '2024-01-02 14:30',
    status: '异常',
    score: 45,
    needHelp: "情绪异常，请尽快进行人工介入处理",
    prison: '第xxx监区xxx房间',
    enterDate: '2012-01-31',
    crimes: ['故意伤害罪'],
  },
  // 更多数据...
])

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 100,
  showSizeChanger: true,
  showQuickJumper: true,
})

// 搜索处理
const handleSearch = () => {
  loading.value = true
  // 这里添加实际的搜索逻辑
  setTimeout(() => {
    loading.value = false
    message.success('搜索完成')
  }, 500)
}

// 重置搜索
const resetSearch = () => {
  searchForm.id = ''
  searchForm.name = ''
  handleSearch()
}

// 表格变化处理
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  handleSearch()
}

// 查看详情
const goToDetection = (id: string) => {
  router.push(`/detection/${id}`);
};
</script>

<style scoped>
.record-page {
  padding: 24px;
  /* background: #f8faff; */
}

.search-area {
  margin-bottom: 24px;
}

</style> 