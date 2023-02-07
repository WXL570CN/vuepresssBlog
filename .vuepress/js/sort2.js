// 归并排序
function mergeArr(arr1, arr2) {
  let newArr = [];
  let len1 = arr1.length;
  let len2 = arr2.length;
  let index1 = 0
  let index2 = 0
  while (index1 < len1 && index2 < len2) {
    if (arr1[index1] <= arr2[index2]) {
      newArr.push(arr1[index1]);
      index1++
    } else {
      newArr.push(arr2[index2]);
      index2++
    }
  }
  newArr.push(...arr2.slice(index2))
  newArr.push(...arr1.slice(index1))
  return newArr
}

function halfArr(arr) {
  let len = arr.length;
  if (len <= 1) {
    return arr;
  }
  let middleIndex = Math.ceil(len / 2);
  let leftArr = halfArr(arr.slice(0, middleIndex));
  let rightArr = halfArr(arr.slice(middleIndex));
  return mergeArr(leftArr, rightArr);
}


let a = [3, 10, 1, 22, 7, 5, 5, 9, 4, 5, 3]
console.log(halfArr(a))
