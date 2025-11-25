/** @type {import("prettier").Config} */
const config = {
  semi: true, // dấu chấm phẩy cuối statement
  singleQuote: false, // ⚡ dùng dấu nháy kép "
  trailingComma: "all", // dấu phẩy cuối object/array/function
  printWidth: 100, // độ dài tối đa mỗi dòng
  tabWidth: 2, // tab = 2 space
  endOfLine: "lf", // ⚡ dùng LF the same linux
};

export default config;
