/**
 * StringUtils 模块，提供一些常用的字符串处理函数。
 */

/**
 * 检查字符串是否为空或空白。
 * @param str 要检查的字符串
 * @returns 如果字符串为空或空白，返回 true；否则返回 false。
 */
export const isBlank = (str: string | null): boolean => {
  if (str === null || str.trim().length === 0) {
    return true;
  }
  return false;
};

/**
 * 检查字符串是否不为空且不空白。
 * @param str 要检查的字符串
 * @returns 如果字符串不为空且不空白，返回 true；否则返回 false。
 */
export const isNotBlank = (str: string | null): boolean => {
  return !isBlank(str);
};

/**
 * 将字符串首字母大写。
 * @param str 要处理的字符串
 * @returns 首字母大写的字符串。
 */
export const capitalize = (str: string): string => {
  if (isBlank(str)) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 将字符串首字母小写。
 * @param str 要处理的字符串
 * @returns 首字母小写的字符串。
 */
export const uncapitalize = (str: string): string => {
  if (isBlank(str)) {
    return str;
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 * 检查字符串是否以指定前缀开头。
 * @param str 要检查的字符串
 * @param prefix 前缀
 * @returns 如果字符串以指定前缀开头，返回 true；否则返回 false。
 */
export const startsWith = (str: string, prefix: string): boolean => {
  if (isBlank(str) || isBlank(prefix)) {
    return false;
  }
  return str.startsWith(prefix);
};

/**
 * 检查字符串是否以指定后缀结尾。
 * @param str 要检查的字符串
 * @param suffix 后缀
 * @returns 如果字符串以指定后缀结尾，返回 true；否则返回 false。
 */
export const endsWith = (str: string, suffix: string): boolean => {
  if (isBlank(str) || isBlank(suffix)) {
    return false;
  }
  return str.endsWith(suffix);
};

/**
 * 将字符串中的某个子字符串替换为另一个子字符串。
 * @param str 要处理的字符串
 * @param searchValue 要替换的子字符串
 * @param replaceValue 替换后的子字符串
 * @returns 替换后的字符串。
 */
export const replace = (str: string, searchValue: string, replaceValue: string): string => {
  if (isBlank(str) || isBlank(searchValue)) {
    return str;
  }
  return str.split(searchValue).join(replaceValue);
};

/**
 * 将字符串中的所有空格去掉。
 * @param str 要处理的字符串
 * @returns 去掉所有空格后的字符串。
 */
export const trimAll = (str: string): string => {
  if (isBlank(str)) {
    return str;
  }
  return str.replace(/\s+/g, "");
};

/**
 * 将字符串中的所有空格替换成指定字符。
 * @param str 要处理的字符串
 * @param replaceChar 替换空格的字符
 * @returns 替换后的字符串。
 */
export const replaceSpaces = (str: string, replaceChar: string): string => {
  if (isBlank(str)) {
    return str;
  }
  return str.replace(/\s+/g, replaceChar);
};

/**
 * 将字符串重复指定次数。
 * @param str 要重复的字符串
 * @param repeatCount 重复次数
 * @returns 重复后的字符串。
 */
export const repeat = (str: string, repeatCount: number): string => {
  if (isBlank(str) || repeatCount <= 0) {
    return "";
  }
  return str.repeat(repeatCount);
};

/**
 * 获取字符串的长度。
 * @param str 要获取长度的字符串
 * @returns 字符串的长度。
 */
export const length = (str: string): number => {
  if (isBlank(str)) {
    return 0;
  }
  return str.length;
};

/**
 * 将字符串转换为小写。
 * @param str 要转换的字符串
 * @returns 小写的字符串。
 */
export const toLowerCase = (str: string): string => {
  if (isBlank(str)) {
    return str;
  }
  return str.toLowerCase();
};

/**
 * 将字符串转换为大写。
 * @param str 要转换的字符串
 * @returns 大写的字符串。
 */
export const toUpperCase = (str: string): string => {
  if (isBlank(str)) {
    return str;
  }
  return str.toUpperCase();
};

/**
 * 将字符串中的每个单词首字母大写。
 * @param str 要处理的字符串
 * @returns 每个单词首字母大写的字符串。
 */
export const capitalizeWords = (str: string): string => {
  if (isBlank(str)) {
    return str;
  }
  return str.replace(/\b\w/g, char => char.toUpperCase());
};
