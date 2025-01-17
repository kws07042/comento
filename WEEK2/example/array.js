var nameArr = ['park', 'ko', 'yang', 'kim'];
var numArr = [2, 3, 5, 6, 7];

//Array.find
//조건을 만족하는 단 하나의 요소만 반환
var findedName = nameArr.find(function(item) {
    return item === 'ko';
});
console.log(findedName); // ko

//Array.filter
//조건을 만족하는 요소만 담은 배열 반환
var filteredArr = numArr.filter(function(item) {
    return item % 2 === 0;
});
console.log(filteredArr); // [2,6]

//Array.forEach
//배열 전체 순회하며 배열 값 접근하여 변경 가능
numArr.forEach(function(item,idx) {
    numArr[idx] = item + 1;
});
console.log(numArr);

//Array.every
//모든 요소가 조건을 만족하는 경우, true 반환
var isNumLowerThan10 = numArr.every(function(item, idx) {
    return item < 10;
});
console.log(isNumLowerThan10); // true