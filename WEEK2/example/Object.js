const person = {
    name: '짱구',
    age: 5,
    like: '예쁜누나',
    greet: function() {
        console.log(`안녕하세요 제 이름은 ${this.name}에요 나이는 ${this.age}살이고 좋아하는건 ${this.like}에요~~~`);
    }
};


console.log(person.name);
console.log(person.age);

person.greet();