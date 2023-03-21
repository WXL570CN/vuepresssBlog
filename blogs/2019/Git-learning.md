---
title: Notes---Git_learning
date: 2018-03-21 09:14:50
categories:
- [Notes]
tags:
- Git
---

## 1、初始化

```
git init
```

## 2、配置用户信息

```
声明用户名
git config --global user.name "用户名"

声明用户邮箱
git config --global user.email "邮箱"
```

## 3、存储代码

```
添加文件（放入暂存区）
git add 文件路径（./文件名）

提交文件
git commit -m "代码相关说明（如做了什么事情）"
```

## 4、查看状态

```
git status
```

## 5、添加多个文件

```
git add 文件所在的文件夹路径（./）（该文件夹的所有文件都将被添加）
```

## 6、略去添加问价操作，直接提交修改过的文件

```
git commit --all -m "代码说明"
```

## 7、查看提交记录

```
git log

git log --oneline（简洁版的日志）
```

## 8、回退版本

```
git reset --hard Head~回退次数
回退次数为0,1,2,3,4,5

根据版本号回退版本
git reset --hard 版本号
```
  
## 9、查看每次切换版本的记录（该操作也能显示每个版本的版本号）

```
git reflog
```

## 10、创建分支

```sh
查看分支
git branch 分支名

切换到分支
git checkout 分支名
     
删除分支（需要切换到待删除分支外的其他分支）
git branch -d 待删除的分支名
```

  

## 11、合并分支到主分支master（徐切换到主分支）

```
git merge 分支名
```

	如果在合并前，又对主分支进行了修改，则将导致合并失败，需要人为进行修改合并，并提交到Git仓库

## 12、将本地Git仓库内容传到GitHub中

```
git push github地址 master
```

  

## 13、从GitHub中下载文件到本地Git仓库

```
git pull github地址 master（会对本地数据进行合并处理）

或git clone github地址（会完完全全的下载到本地，多次下载会覆盖）

优先使用pull命令
```


## 14、ssh方式上传代码

```
ssh-keygen -t rsa -C "邮箱地址"
```
  

## 15、简写GitHub地址

```
git remote add 简写的地址名 GitHub地址
```

  

## 16、略写GitHub地址、主分支名

```
在首次push时

git push GitHub地址 -u master

在下一次push或pull时只需执行git push/pull命令就行
```


## 17、子仓库

> submodule

### 17.1、添加子仓库

```js
git submodule add ssh://git@gitlab...
```

### 17.2、操作

clone一个含有子仓库的项目或切换到一个有子仓库的分支

```js
git clone ...

git checkout ...

// 切换分支时如果当前分支含有子仓库则不需要执行该命令
git submodule init

git submodule update
```

## 18、回退版本

```js
git reset --hard HEAD^         // 回退到上个版本

git reset --hard HEAD~3        // 回退到前3次提交之前，以此类推，回退到n次提交之前

git reset --hard commit_id     // 退到/进到 指定commit的sha码

// 强推到远程：
git push origin HEAD --force
```

## 19、push
```
本项目强制push
git push origin HEAD --force

将项目强制push到某个仓库
git push -f 仓库地址 分支
```