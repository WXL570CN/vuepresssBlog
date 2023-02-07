---
title: Notes---点击按钮返回顶部
date: 2020-09-04 09:29:49
categories:
- Notes
tags:
- JavaScript
---

```js
scrollToTop() {
	const scrollTop =
		window.pageYOffset ||
		document.documentElement.scrollTop ||
		document.body.scrollTop
	if (scrollTop > 0) {
		window.requestAnimationFrame(this.scrollToTop)
		window.scrollTo(0, scrollTop - scrollTop / 5)
	}
}
```