---
title: Style---全局样式
date: 2021-06-02 09:18:55
categories:
- [Css]
tags:
- Style
---

> 项目初始化时的一些全局样式，方便写页面时使用
```css
html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  font-family: "arial","verdana","helvetica","PingFang SC","HanHei SC","STHeitiSC-Light","Microsoft Yahei",sans-serif;
  font-size: 14px;
  color: #333;
  margin: 0;
  padding: 0;
  background: #fff;
  word-spacing: 1px;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/* 重置表单元素 */
button, input, select, textarea {
  outline: none; }

input {
  font-family: inherit; }

/* 清除内外边距 */
h1, h2, h3, h4, h5, h6, hr, p, blockquote,
dl, dt, dd, ul, ol, li,
pre,
fieldset, button, input, textarea,
th, td {
  /* table elements 表格元素 */
  margin: 0;
  padding: 0; }

/* 重置列表元素 */
ul, ol {
  list-style: none; }

/* 重置表格元素 */
table {
  border-collapse: collapse;
  border-spacing: 0; }

/*重置a标签样式*/
a {
  color: #333;
  text-decoration: none; }

a:visited{
  text-decoration: none;
}

a:hover {
  color: #4389FF;
  text-decoration: none; }

a:active{
  text-decoration: none;
}

/*重置图片样式*/
img {
  vertical-align: middle;
  border-style: none; }

/*清除浮动*/
.clear:after {
  content: "";
  display: block;
  clear: both; }

input{
  outline: none;
}

/*表单元素placeholder 样式*/
input::-webkit-input-placeholder {
  color: #999; }

input:-moz-placeholder {
  color: #999; }

input::-moz-placeholder {
  color: #999; }

input:-ms-input-placeholder {
  color: #999; }

/* 面包屑 */
.bread {
  height: 44px;
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  display: flex;
  align-items: center;
}

i{
  display: inline-block;
}

/* 字体 */
.fz12{font-size: 12px;}
.fz14{font-size: 14px;}
.fz16{font-size: 16px;}
.fz18{font-size: 18px;}
.fz20{font-size: 20px;}
.fz24{font-size: 24px;}

/* 清除浮动 */
.clearfix:after{
  content:"\20";
  clear:both;
  height:0;
  display:block;
  overflow:hidden;
}
.clearfix{*zoom:1;}

/* 行内块元素 */
.inline-block{display: inline-block;}

.flex-start{
  display: flex;
  justify-content: flex-start;
}
.flex-between{
  display: flex;
  justify-content: space-between;
}
.flex-center{
  display: flex;
  justify-content: center;
}
.flex-start-center{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex-between-center{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-center-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-end-center{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.flex-wrap-start{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.flex-wrap-center-end{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}
.flex-wrap-center-start{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.flex-column-center-center{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 单行隐藏 */
.line-hidden{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 遮罩 */
.alert-box{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
.alert-main{
  background-color: #fff;
  z-index: 3;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.alert-close{
  position: absolute;
  z-index: 3;
  top: 50%;
  right: 50%;
}

.phone-box {
  width: 10rem;
  min-height: 100vh;
  margin: 0 auto;
  background: #f3f5f8;
}
```