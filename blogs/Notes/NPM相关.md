---
title: NPM相关
date: 2022/06/04 
tags:
- Npm
---

## 插件
### rimraf：快速删除文件，比如用来删除node_modules
```sh
# 安装
npm i rimraf -g
# 使用
rimraf node_modules
```

### 安装nodejs所需环境
```sh
npm i --g --production windows-build-tools
```

## Npm包调试
```sh
# 包项目下
npm link
# 查看下面目录下是否生成包的软链接
AppData/Local/Yarn/Data/link/
# 使用
npm link 包名
# 包修改后，编译即可
npm run build
```