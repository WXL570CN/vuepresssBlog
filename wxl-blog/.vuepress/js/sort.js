// 冒泡排序
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return arr;
}

// 快速排序
function quickSort(arr, l_index, r_index) {
  let l = l_index;
  let r = r_index;
  let min = arr[l];
  if (l >= r) {
    return;
  }
  while (l < r) {
    while (l < r && arr[r] >= min) {
      r--;
    }
    [arr[l], arr[r]] = [arr[r], arr[l]];
    while (l < r && arr[l] <= min) {
      l++;
    }
    [arr[r], arr[l]] = [arr[l], arr[r]];
  }
  quickSort(arr, l_index, l - 1);
  quickSort(arr, r + 1, r_index);
}

// 插入排序
function insertSorting(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [a[j], a[j - 1]] = [a[j - 1], a[j]];
      }
    }
  }
  return arr;
}

let a = [0, 3, 10, 1, 22, 7, 5, 5, 9, 4, 5, 3];
// console.log(bubbleSort(a));
// console.log(insertSorting(a));
quickSort(a, 0, a.length - 1);
console.log(a);
