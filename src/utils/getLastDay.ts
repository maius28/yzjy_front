/**
 * @description 目标是补充el-date-picker 月份模式(YYYY-MM)的startDate和endDate
 */
export const getLastDay=(elYearMonth:string)=>{//获取某月最后一天
  let date = new Date(elYearMonth);
  let new_year = date.getFullYear(); // 取当前的年份
  let month = date.getMonth();
  let new_month = month + 1; // 取当前的月份
  let mon:string|number = "";
  let day:string|number = 0;
  if (month > 12) {
    new_month -= 12; // 月份减
    new_year++; // 年份增
  }
  let firstDay = new Date(new_year, new_month, 1); // 取当年当月中的第一天
  let lastDay = new Date(firstDay.getTime() - 1000 * 60 * 60 * 24).getDate(); // 获取当月最后一天日期
  if (firstDay.getMonth() < 10) {
    mon = "0" + firstDay.getMonth();
  } else {
    mon = firstDay.getMonth();
  }
  if (lastDay < 10) {
    day = "0" + lastDay;
  } else {
    day = lastDay;
  }
  // //选择月份的第一天
  // firstDay.getFullYear() + "-" + mon + "-" + "0" + firstDay.getDate();
  //选择月份的最后一天
  return firstDay.getFullYear() + "-" + mon + "-" + day;
}
  
//https://blog.csdn.net/weixin_45824909/article/details/130248422