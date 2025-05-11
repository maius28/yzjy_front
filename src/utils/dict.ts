// ? 系统全局字典

/**
 * @description：用户性别
 */
export const genderType = [
  { label: "男", value: 1 },
  { label: "女", value: 2 }
];

/**
 * @description：用户状态
 */
export const userStatus = [
  { label: "启用", value: true, tagType: "success" },
  { label: "禁用", value: false, tagType: "danger" }
];

/**
 * @description：权限级别
 */
export const roleAuthority = [
  { authorityName: "用户", roleAuthority: "P3" },
  { authorityName: "管理员", roleAuthority: "P2" },
  { authorityName: "开发维护", roleAuthority: "P1" }
];

export const userRole=[
  { label: "普通用户", value: 'annotator' },
  { label: "管理员", value: 'admin' },
  { label: "审核员", value: 'reviewer' },
]

export const taskStatus=[
  { label: "未分配", value: 'pending'},     //未分配
  { label: "已分配", value: 'assigned'},    //未开始
  { label: "进行中", value: 'in_progress'},  //点击标注按钮后但未提交时的状态
  { label: "已完成", value: 'completed' },  //提交后但未审核的状态
  { label: "审核中", value: 'review'},      //点击审核按钮后但未提交时的状态
  { label: "已通过", value: 'approved'},    //审核通过
  { label: "已驳回", value: 'rejected'},    //驳回后但未开始标注的状态
]

//审核人能更改的任务状态
export const taskStatus4Review={
  "未分配":false,
  "已分配":false,
  "进行中":false,
  "审核中":false,
  "已通过":true,
  "已完成":false,
  "已取消":false,
  "已驳回":true,
}