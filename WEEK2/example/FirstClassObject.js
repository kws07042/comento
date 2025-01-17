const dog = function() {
    console.log("멍멍!그르르르르");
};

dog();
//객체 obj정의
const obj = {
    dog: function () {
        console.log('멍멍!그르르르ㅡㄹ');
    }
};
//obj.dog()는 obj 객체 내에 정의된 dog 메서드를 호출합니다.
obj.dog();


function greeting(name,callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

function sayGoodbye() {
    console.log('Goodbye!');
}

greeting('K', sayGoodbye);

//greeting('K', sayGoodbye)가 호출
// greeting 함수 안에서 "Hello, K!"가 출력
// greeting 함수의 callback()이 실행되어 sayGoodbye 함수가 호출
// sayGoodbye 함수 내에서 "Goodbye!"가 출력

function greeting1(name) {
    return function() {
        console.log(`Hello, ${name}!`);
    }
}
const sayHello1 = greeting1('K');
sayHello1();
//greeting('K')가 호출되어 내부 함수가 반환됩니다. 이 함수는 name 값으로 "K"를 기억하고 있다
// 반환된 내부 함수가 sayHello 변수에 할당
// sayHello()가 호출되면서 "Hello, K!"가 출력