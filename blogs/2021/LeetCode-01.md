---
title: LeetCode刷题-数组01
date: 2021-06-13 09:18:55
categories:
- [Notes]
tags:
- leetCode
---

# [力扣4.寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

## 暴力解法
```js
function sortNumber(a, b){
    return a - b
}

var findMedianSortedArrays = function(nums1, nums2) {
    const nums = [...nums1, ...nums2]
    const len = nums.length
    const numsR = nums.sort(sortNumber)
    if(len % 2){
        return numsR[(len -1) / 2]
    }
    return (numsR[len / 2 - 1] + numsR[len / 2]) / 2
};
```
> 执行用时：132 ms, 在所有 JavaScript 提交中击败了 88.21% 的用户  
> 内存消耗：43.9 MB, 在所有 JavaScript 提交中击败了30.03% 的用户







