---
title: Notes---HTML_review
date: 2018-08-20 09:14:50
categories:
- [Html]
- Notes
tags:
- Html
---

## 标签
```
- 水平线标签：<hr />单标签，后面的/可加可不加，不加有可能会出错</P>

- 换行标签：<br />单标签

- 加粗：<b></b>	<strong></strong>

- 斜体：<i></i>	<em></em>

- 删除线：<s></s>	<del></del>

- 下划线：<u></u>	<ins></ins>

- 锚点链接：<a href='#id名'></a>	在目标处的标签加上属性<id="id名">

- base标签：可以设置整体链接的打开状态，在head标签下加入以下内容
		 <base target="_blank" />	启动新窗口打开链接
		 <base target="_self" />	在当前窗口打开链接

- 注释标签：<!--注释内容-->

- 特殊字符：
		空格符：&nbsp;
		括号：当要在浏览器中打印出标签时，要用特殊字符替代防止浏览器解析标签
			 左括号：&lt;
			 右括号：&gt;
```

## 列表
### 无序列表
ul中只能放li标签，默认列表前会有一个点，在样式代码li的属性中添加list-style:none去除
```html
<ul>
	<li></li>
	<li></li>
</ul>
```

### 有序列表
```html
<ol>
	<li></li>
	<li></li>
	<li></li>
</ol>
```
### 自定义列表
```html
<dl>
	<dt>名词1</dt>
	<dd>名词1解释1</dd>
	<dd>名词1解释2</dd>

	<dt>名词2</dt>
	<dd>名词2解释1</dd>
	<dd>名词2解释2</dd>

	<dt>名词3</dt>
	<dd>名词3解释1</dd>
	<dd>名词3解释2</dd>
</dl>
```

## 表格
tr为行，td为列，写入顺序 --》 行：从上往下，列：每行从左到右

### 属性：
- border：边框宽度
- cellspacing：表格与外边框的间距
- cellpadding：表格内容与表格边框的间距
- align：设置表格在网页中的水平对齐方式，值可以为left，center，right

### 表头标签：
将第一行的td标签换成th

### 表格结构
可以用thead和tbody标签将表格划分为表头和内容部分，如下例

### 合并单元格：
跨行合并：rowspan,在需要跨行操作的第一行中添加该属性，被合并的其他单元格删除  
跨列合并：colspan

```html
<table width="200" height="300" cellpadding="10" cellspacing="0" border="1">
	<caption>表格标题</caption>
	<thead>
		<tr>
			<td>姓名</td>
			<td>性别</td>
			<td>体重</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>小屋</td>
			<td>男</td>
			<td>80</td>
		</tr>
		<tr>
			<td>小巫</td>
			<td>男</td>
			<td>55</td>
		</tr>
		<tr>
			<td>小舞</td>
			<td rowspan="2">女</td>
			<td rowspan="2">45</td>
		</tr>
		<tr>
			<td>小污</td>
		</tr>
	</tbody>
</table>
```
## 表单
### input控件
- type   
   - text：单行文本输入  
   - password：密码输入  
   - radio：单选按钮（checked="checked"：默认选择一项）  
   - checkbox：复选框  
   - button：普通按钮  
   - submit：提交按钮  
   - reset：重置按钮  
   - email：输入邮箱格式（格式错误提交汇会报错）  
   - number：输入数字（只能输入数字，不接受数字外的字符） 
   - url：输入url格式的网址  
   - search：搜索框（输入之后，在搜索框后面会出现叉号进行删除）  
   - range：可拖动的滑块（可用来控制音量大小） 
   - time：输入时间（小时：分钟） 
   - data：输入日期（年月日） 
   - month：输入月份  
   - week：输入星期  
   - color：输入颜色  
   - image：图像形式提交按钮  
   - file：文件域(比如添加文件，然后会跳到选择文件的窗口，只能添加一个文件，multiple添加多个文件)  
		
- value：input控件中默认文本值
- name：控件名称
- maxlength：允许输入的最多字符数
- multiple：type为file时，它可以使上传的文件数为多个
- placeholder：类似value，但它是占位符，不用删除，输入内容时自动消失
- autofocus：光标自动停留在输入框（使用方法：autofocus或者autofocus="autofocus"）
- autocomplete：使输入框具有记忆功能（前提是需要有提交按钮和name属性）
- required：输入不能为空
- accesskey：使用alt+设定的键，将光标定位到设定了该属性的输入框
- size:input控件在页面中显示的宽度
```html
<form>
	autofocus：<input type="text" autofocus><br />
	multiple：<input type="file" multiple><br />
	placeholder：<input type="text" placeholder="小巫" accesskey="w"><br />
	aurocomplete：<input type="text" name="jiyi" autofocus="on"><br />
	<input type="submit">
</form>
```
### lable标签
1. 用lable标签包裹点击有效区域，使得用户鼠标不点击输入框也能将光标定位到输入框
2. 当lable标签中有两个input时，使用for id
`<label for="two"><input><input id="two"></label>`

### 文本域
`<textarea></textarea>`

### 下拉菜单
selected:默认选项
```html
<select>
	<option selected ="selected">我</option>
	<option>你</option>
</select>
```

### 表单域
- action:表单提交数据的目标url
- method：表单提交的方式post get
- name:表单名

## html5新增标签
- datalist：定义例如百度搜索框索引列表（使用list链接）
- filedset：将表单内相关元素分组打包（配合legend使用）
```html
小巫搜索：<input type="text" list="star" />
<datalist id="star">
	<option>小舞</option>
	<option>小屋</option>
	<option>小巫</option>
</datalist>

<fieldset>
	<legend>小巫窗口</legend>
	ID  ：<input type="text" value="如：小巫"><br />
	身高：<input type="text" value="如：180"><br />
	体重：<input type="text" value="如：65"><br />
	五官：<input type="text" value="如：貌若潘安"><br />
</fieldset>	
```
## 多媒体标签
- embed：标签定义嵌入的内容
`<embed src="url"></embed>`

- audio：播放音频，默认不自动播放
   - autoplay：自动播放（autoplay="autoplay"）
   - controls：是否显示不默认播放空间
   - loop：循环播放
loop="2":循环播放两次
loop="-1"：无限循环

考虑到浏览器的兼容性，需要做三种格式的声音文件ogg MP3 wav
```html
<audio controls autoplay>
	<source src="bgsound.mp3">
	<source src="bgsound.ogg">
	<source src="bgsound.wav">
</audio>
```
- video：播放视频