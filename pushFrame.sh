#!/bin/bash

# 接收messageA
messageA=$1

# git push函数
function git_push_retry() {
    attempts=0

    while true; do
        if [[ $attempts -gt 2 ]]; then
            echo "Push failed after $attempts attempts. Aborting."
            exit 1
        fi

        git push

        if [[ $? -eq 0 ]]; then
            echo "Push succeeded."
            break
        else
            echo "Push failed. Retrying..."
            attempts=$((attempts+1))
        fi
    done
}


# 提交博客项目代码至Github
echo "提交博客项目代码..."
git add .
git commit -m "$messageA"
git_push_retry


# 构建
echo "构建..."
npm run build

# 将my-blog拷贝至WXL570CN.github.io项目
echo "将my-blog拷贝至WXL570CN.github.io项目..."
if [ -d "../WXL570CN.github.io/my-blog" ]; then
    rm -rf ../WXL570CN.github.io/my-blog
fi
cp -R my-blog/ ../WXL570CN.github.io/my-blog/

# 提交WXL570CN.github.io项目代码至Github
echo "提交WXL570CN.github.io项目代码..."
cd ../WXL570CN.github.io
git pull
git add .
git commit -m "更新博客"
git_push_retry