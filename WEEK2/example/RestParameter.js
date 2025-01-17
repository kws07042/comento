function sum(...numbers) {
    let total = 0;
    numbers.forEach(function(num) {
        total = total + num;
    });
    return total;
}

console.log(sum(1, 2, 3, 4)); //함수 sum에 전달된 인자 출력: 10
console.log(sum(5, 10));      //함수 sum에 전달된 인자 출력: 15
