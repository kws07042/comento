const a = 5;
const a = 10;
cnosole.log(a); // SyntaxError: Identifier 'a' has already been declared
//const 에서도 let 과 동일하게 중복 선언을 허용하지 않는다.
//const a = 5;
// console.log(a); // 5
//
// a = 10;
// console.log(a); // TypeError: Assignment to constant variable.
//하지만 const 는 다른 변수들과 다르게 재할당도 불가능하다.
// 이유는 const 는 상수를 선언하는 키워드이기 때문이다.
// 처음 선언과 초기화를 하고 나면 다른 값을 재할당 할 수 없어진다.