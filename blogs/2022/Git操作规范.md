---
title: 数组相关
date: 2022-06-04 09:18:55
categories:
- [Days]
tags:
- Array
---

### **1、commit规范**

- **feat**添加新特性
- **refactor**代码重构，没有添加新功能或者修复
- **fix**修复bug
- **style**仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
- **test**增加测试用例
- **chore**改变构建流程、或者增加依赖库、工具等
- **revert**回滚到上一个版本
- **docs**仅仅修改了文档

### **2、修改已被push的commit日志**

2\.1、查看日志（找到要修改的提交记录，如第11条）

```
git log --oneline
```

2\.2、选择要修改的提交记录

```
git rebase -i HEAD~112.3
```

2\.3、修改提交记录

- 进入界面后，
- 按i进入编辑模式，
- 将需要修改注释的那一行前面的“pick”改为“edit”，
- 然后摁ESC退出编辑模式，
- 再输入:wq!来保存退出。

2\.4、更正commit注释内容

```
git commit --amend
按i进入编辑模式，
第一行就是要修改的提交记录，修改为正确的注释，
然后摁ESC退出编辑模式，再输入:wq!来保存退出。
```

2\.5、提交修改确认

```
确认
git rebase --continue
提交
git push --force
```



