---
date: 2022/06/04
---
# 「日常」Git
## 一、commit规范
- **feat**：添加新特性
- **refactor**：代码重构，没有添加新功能或者修复
- **fix**：修复bug
- **style**：仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
- **test**：增加测试用例
- **chore**：改变构建流程、或者增加依赖库、工具等
- **revert**：回滚到上一个版本
- **docs**：仅仅修改了文档

## 二、获取ssh
进入ssh文件夹查看是否有秘钥  
```sh
cd ~/.ssh
ls
```
创建
```sh
ssh-keygen -t rsa -C "570@wxl.com"
```
显示ssh
```sh
cat ~/.ssh/id_rsa.pub
```

## 三、修改已push至远程仓库的日志
### 1、查看日志
```bash
git log --oneline
```

### 2、标记commit为可编辑
- 选择要修改的提交记录
```bash
# 修改第n条的提交记录
git rebase -i HEAD~n
```
- 输入`i`进入编辑模式
- 找到需要修改注释的一行，并将其头部的`pick`修改为`edit`
- ESC退出编辑模式
- 输入`:wq!`保存退出

### 3、修改commit
```bash
git commit --amend
```
- 输入`i`进入编辑模式
- 第一行即要修改的提交记录，将其修改为正确的注释
- ESC退出编辑模式
- 输入`:wq!`保存退出

### 4、提交修改确认
```bash
# 确认
git rebase --continue
# 提交
git push --force
```

> 退出修改：git rebase --abort

## 四、warning: LF will be replaced by CRLF in 
存在符号转义问题  
windows中的换行符为 `CRLF，` 而在linux下的换行符为`LF`，所以在执行`git add`时出现提示，解决办法：
```sh
git config --global core.autocrlf false
```

## 五、撤销合并
### 1、查看日志

```sh
git reflog
```
### 2、回退
复制想要恢复到的状态的Hash  
使用git reset 同时移动 HEAD 和 当前分支的指针  
该操作会使Hash状态后的所有提交丢失
```sh
git reset --hard Hash
```

> 相对安全的方法：`git reset --merge Hash`