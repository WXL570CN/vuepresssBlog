---
title: Notes---Git_learning
date: 2018-03-21 09:14:50
categories:
- Git
tags:
- Git
- submodule
---

## 子仓库
> submodule 
### 添加子仓库
```js
git submodule add ssh://git@gitlab...
```
### 操作
clone一个含有子仓库的项目或切换到一个有子仓库的分支
```js
git clone ...
git checkout ...

// 切换分支时如果当前分支含有子仓库则不需要执行该命令
git submodule init 

git submodule update
```


## 回退版本
```js
git reset --hard HEAD^         // 回退到上个版本
git reset --hard HEAD~3        // 回退到前3次提交之前，以此类推，回退到n次提交之前
git reset --hard commit_id     // 退到/进到 指定commit的sha码


// 强推到远程：
git push origin HEAD --force
```