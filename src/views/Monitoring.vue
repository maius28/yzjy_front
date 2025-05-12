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
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'crimes'">
          <span>
            <a-tag v-for="tag in record.crimes" :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 3 ? 'red' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a-button type="link" @click="goToDetection(record.id)">检测</a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="goToRecord(record.id)">长期跟踪</a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="showDialogue(record)">语音解析</a-button>
          </span>
        </template>
      </template>
    </a-table>

    <!-- 语音对话抽屉 -->
    <a-drawer title="语音对话" placement="right" :width="800" :visible="dialogueVisible" @close="closeDialogue">
      <dialogue-component v-if="dialogueVisible" :person-info="currentPerson" @close="closeDialogue" />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import DialogueComponent from '@/views/dialogue/index.vue';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const router = useRouter();
const dialogueVisible = ref(false);
const currentPerson = ref<any>(null);
const loading = ref(false)

const goToDetection = (id: string) => {
  router.push(`/detection/${id}`);
};

const goToRecord = (id: string) => {
  router.push({
    path: '/tracking',
    query: { id }
  });
};

const showDialogue = (record: any) => {
  currentPerson.value = record;
  dialogueVisible.value = true;
};

const closeDialogue = () => {
  dialogueVisible.value = false;
  currentPerson.value = null;
};

// 搜索表单
const searchForm = reactive({
  id: '',
  name: ''
})

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

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '民族',
    dataIndex: 'nation',
    key: 'nation',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '文化程度',
    key: 'edu',
    dataIndex: 'edu',
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
    title: '操作',
    key: 'action',
  },
];

const data = [
  {
    id: '1',
    name: '张三',
    age: 32,
    address: '四川省宜宾市xxxx村xxx组',
    sex: '男',
    nation: '汉',
    edu: '初中',
    prison: '第xxx监区xxx房间',
    enterDate: '2012-01-31',
    crimes: ['故意伤害罪', '抢劫罪'],
  },
  {
    id: '2',
    name: '李四',
    age: 42,
    address: 'London No. 1 Lake Park',
    sex: '男',
    nation: '汉',
    edu: '高中',
    prison: '第xxx监区xxx房间',
    enterDate: '2015-06-15',
    crimes: ['盗窃罪'],
  },
  {
    id: '3',
    name: '王五',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男',
    nation: '汉',
    edu: '大专',
    prison: '第xxx监区xxx房间',
    enterDate: '2018-03-20',
    crimes: ['诈骗罪'],
  },
];
</script>

<style scoped>
.record-page {
  padding: 24px;
  /* background: #f8faff; */
}

.search-area {
  margin-bottom: 24px;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}
</style>
