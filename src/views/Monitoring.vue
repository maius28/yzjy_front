<template>
    
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'crimes'">
        <span>
          <a-tag
            v-for="tag in record.crimes"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 3 ? 'red' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-button type="link" @click="goToDetection(record.id)">检测</a-button>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDetection = (id: string) => {
  router.push(`/monitoring/detection/${id}`);
};

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

