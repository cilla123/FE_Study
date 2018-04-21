const Folder = require('./Component')
const File = require('./File')

// 构建树形结构
let folder = new Folder('学习资料');  // 顶层组合对象
let folder1 = new Folder('JavaScript');   // 子组合对象1
let folder2 = new Folder('jQuery');
let file1 = new File('JavaScript 设计模式与开发实践');   // 叶对象1
let file2 = new File('精通 jQuery');
let file3 = new File('重构与模式')
folder1.add(file1);   // 把叶对象1添加到子组合对象1
folder2.add(file2);
folder.add(folder1);  // 把子组合对象1添加到顶层组合对象中
folder.add(folder2);
folder.add(file3);
folder1.remove(file1);

// 统一扫描
folder.scan();