## ES6: 지원되는 브라우저가 많지 않지만 babel로 es5 문법으로 transcompile하여 사용하면 됨
## let: 블록 스코프에서만 유효한 값
## closure: 외부함수(포함하고 있는)의 변수에 접근할 수 있는 내부 함수
## const
  - 불변값 (java의 final, 스칼라의 val)
  - 배열과 오브젝트의 값 변경 가능 (재할당은 불가능)
## string methods
  - startsWith
  - endsWith
  - includes
## for-of
  ```js
  var data = [1, 2, undefined, NaN];
  for (lt value of data) console.log(value);
  ```
## spread operator (펼침 연산자)
```js
let arr1 = ["a", "b"];
let arr2 = [1, 2, ...arr1, 3, 4];
console.log(arr2); // [1, 2, "a", "b", 3, 4]
```

## from method
  - 배열이 아닌 것(가짜 배열)을 배열로 바꿔줌
  - `let newArray = Array.from(arguments)`

## 쉬운 Object 생성 
```js
const data = {
    name,
    getName() {
        return name;
    }
}
```

## Destructuring 
### Array
```js
let arr = [1, 2, 3, 4, 5];
let [nara,,,,hwang] = arr;
console.log(nara + ", " + hwang); // 1, 5
```
### Object
```js
let obj = {
    name : "country",
    address : "Korea",
    age : 29
}
let {name:myName, age:myAge} = obj;
console.log(myName + ", " + myAge); // country, 29
```
### JSON
```js
var news = [
    {
        "title": "sbs",
        "imageUrl": "aaa.png"
    },
    {
        "title": "kbs",
        "imageUrl": "bbb.png"
    }
];
let [,{imageUrl}] = news;
console.log(imageUrl); // bbb.png
```

## Set
```js
let mySet = new Set();
mySet.add("country");
mySet.add("hwang");
mySet.add("country");
console.log(mySet.size); // 2

mySet.delete("hwang");
console.log(mySet.has("hwang")); // false
console.log(mySet.size); // 1
```

## WeakSet
- 참조를 가지고 있는 객체만 저장이 가능
- 배열이나 함수 등을 저장 가능 (숫자, 문자열 등은 불가능)
- 객체 형태를 중복 없이 저장할 때 유용
```js
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let obj = {arr1, arr2};
let ws = new WeakSet();

ws.add(arr1);
ws.add(arr2);
ws.add(obj);

arr1 = null;
console.log(ws.has(arr1) + ", " + ws.has(arr2)); // false, true
```
## Map & WeakMap
```js
let wm = new WeakMap();
let myfun = function(){};

wm.set(myfun, 5);
console.log(wm.get(myfun)); // 5

myfun = null;
console.log(wm.get(myfun)); // undefined
```

## 실습) 로또 번호 만들기 
```js
const SETTING = {
  count : 6,
  maxNumber : 45
}

function getRandomNumber({count, maxNumber}) {
  const result = new Set();
  while(result.size < 6) {
    const number = Math.floor(Math.random() * maxNumber) + 1;
    result.add(number);
    
  }
  return Array.from(result).join(', ')
}

console.log(getRandomNumber(SETTING));
```

## template 처리
- 데이터의 값을 추출하여 템플릿에 활용 가능
```js
const data = [{ name : 'country'}];
const template = `welcome ${data[0].name}!`;
console.log(template); // welcome country!
```

## Tagged Template literals
- template을 함수로 처리하여 사용 가능
```js
var person = 'Mike';
var age = 28;

function myTag(strings, personExp, ageExp) {
  var str0 = strings[0]; // "that "
  var str1 = strings[1]; // " is a "
  var ageStr = ageExp > 99 ? 'centenarian' : 'youngster';
  return str0 + personExp + str1 + ageStr;
}

var output = myTag`that ${ person } is a ${ age }`;
console.log(output);
// that Mike is a youngster
```


## Function
### Arrow Function
```js
let twiceArr = [1,2,3,4,5].map(v => v * 2);
console.log(twiceArr); // [2,4,6,8,10]
```

### function default parameters
- 함수에 기본으로 값을 줄 수 있음
```js
function sum(val1, val2=3) {
  return val1 * val2;
}

console.log(sum(3)); // 9
console.log(sum(3, 5)); // 15
```

### rest parameters
- 함수에 가변 아규먼트를 받을 수 있음
```js
function sum(...args) {
  return args.reduce((a, b) => a + b);
}

console.log(sum(1)); // 1
console.log(sum(2, 3)); // 5
console.log(sum(5, 15, 25)); // 45
```

## 객체
### class
- class 키워드가 생김
- 하지만 내부적으로는 prototype을 사용하는 function
```js
class Health {
  constructor(name) {
    this.name = name;
  }
  showHealth() {
    console.log("안녕하세요 " + this.name);
  }
}

const myHealth = new Health("country");
console.log(myHealth.showHealth()); // 안녕하세요 country
```
### Object assign 메서드
```js
const healthObj = {
  showHealth : function() {
    console.log("오늘 운동시간 : " + this.lastTime);
  }
}

const myHealth = Object.assign(Object.create(healthObj), {
  name : "country",
  lastTime : "08:23"
});

myHealth.showHealth(); // 오늘 운동시간 : 08:23
```

### Immutable 객체 만들기
```js
const previous = {
  name : "country",
};
const current = Object.assign({}, previous, {
  "name" : "nara",
  "age" : 29
});

console.log(previous.name); // country 
console.log(current.name + ", " + current.age); // nara, 29
```

### setPrototypeOf
- object에 prototype을 추가
```js
const healthObj = {
  showHealth : function() {
    console.log("오늘 운동 시간 : " + this.healthTime);
  }
}

const newObj = Object.setPrototypeOf({
  name : "country",
  healthTime : "08:24"
}, healthObj);

console.log(newObj.showHealth()); // 오늘 운동 시간 : 08:24
```
### prototype chain
- setPrototypeOf를 사용하여 다른 객체의 prototype을 추가
- 함수를 찾다가 없으면 prototype을 타고 올라가기 때문에 상속 관계처럼 사용 가능

## module(export & import)
- 모듈을 export하고 그것을 import하여 사용
```js
// myLogger.js
export default function log(data) {
  console.log(data);
}
```
```js
// app.js
import log from './myLogger.js';
log('my first test data);
```