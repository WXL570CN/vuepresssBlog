---
date: 2018/03/21
tags:
- Git
---

# Git learning

## 1、教程
- [阮一峰的Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
- [通过关卡学习Git](https://learngitbranching.js.org/?locale=zh_CN)

## 2、配置用户信息
```sh
# 声明用户名
git config --global user.name "用户名"

# 声明用户邮箱
git config --global user.email "邮箱"
```

## 3、查看提交日志

```sh
git log
# 简洁版的日志
git log --oneline
```
  
## 4、查看切换版本的记录
> 该操作也能显示每个版本的版本号
```sh
git reflog
```

## 5、创建分支
```sh
# 查看分支
git branch 分支名
# 切换到分支
git checkout 分支名
# 删除分支（需要切换到待删除分支外的其他分支）
git branch -d 待删除的分支名
```

## 6、子仓库
> submodule
### 6.1、添加子仓库
```sh
git submodule add ssh://git@gitlab...
```

### 6.2、操作
clone一个含有子仓库的项目或切换到一个有子仓库的分支
```sh
git clone ...
git checkout ...
# 切换分支时如果当前分支含有子仓库则不需要执行该命令
git submodule init
git submodule update
```

## 7、push
```sh
# 本项目强制push
git push origin HEAD --force

# 将项目强制push到某个仓库
git push -f 仓库地址 分支
```

## 8、回退版本
```sh
# 回退到上个版本
git reset --hard HEAD^
# 回退到前3次提交之前，以此类推，回退到n次提交之前
git reset --hard HEAD~3
# 退到/进到 指定commit的sha码
git reset --hard commit_id

# 强推到远程：
git push origin HEAD --force
```

