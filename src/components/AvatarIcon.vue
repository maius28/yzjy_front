<template>
<el-avatar v-once :style="`background:${extractColorByName(username)}`" >{{ username[0] }}</el-avatar>
</template>

<script setup lang="tsx">
const props=defineProps<{
  username: string
}>()

//传入名字,根据名字生成16进制颜色,这样颜色就固定下来了
const extractColorByName = (name: string) => {
  var temp: any = [];
  temp.push("#");
  for (let index = 0; index < name.length; ++index) {
    temp.push(parseInt(`${name[index].charCodeAt(0)}`, 10).toString(16));
  }
  return temp.slice(0, 5).join("").slice(0, 4);
};
// 原文链接：https://blog.csdn.net/ju__ju/article/details/117378541
</script>

<style scoped lang="scss">

</style>