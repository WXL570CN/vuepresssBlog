# 进入 public
cd public

git init
git add -A
git commit --no-verify -m "$1：$2"
git branch -M main

# 发布到 WXL570CN.github.io
git push -f git@github.com:WXL570CN/WXL570CN.github.io.git main