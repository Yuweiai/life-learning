## 函数

1. 函数是 JavaScript 应用程序的基础，可以帮助实现抽象层、模拟类、信息隐藏和模块
2. 在 TypeScript 中，虽然已经支持类、命名空间和模块，但函数仍然是主要的定义行为的地方

#### 1. 函数类型

1. 函数类型包含两部分：参数类型和返回值类型

   （1）参数类型以参数列表的形式写出，只要参数类型是匹配的，那么就认为是**有效的函数类型**，而不在乎参数名是否正确

   （2）对于返回值，在函数和返回值类型之前使用（`=>`）符号。返回值类型是函数类型的必要部分，如果函数没有返回任何值，也必须指定返回值类型为 `void` 而不能留空

2. 函数的类型只是由参数类型和返回值组成的。函数中使用的捕获变量不会体现在类型里。实际上，捕获变量是函数的隐藏状态，并不是组成 API 的一部分（在 JavaScript 里，函数可以使用函数体外部的变量。当函数这么做时，我们说它 "捕获" 了这些变量

3. 如果在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript 编译器会自动识别出类型——这叫做 "按上下文归类"，是类型推论的一种，可以帮助我们更好地为程序指定类型

```ts
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y }

// 完整函数类型
let myAdd: (x: number, y: number) => number = function(x: number, y: number): number {
    return x + y;
}

// 类型推断
let myAdd: (x: number, y: number) => number = function(x, y) {
    return x + y;
}
```

#### 2. 可选参数和默认参数

1. TypeScript 中传递给一个函数的参数个数必须与函数期望的参数个数一致

2. JavaScript 中传递给一个函数的每个参数都是可选的，可传可不传。没传参的时候，它的值就是 `undefined`

3. 在 TypeScript 中，可以在参数名旁边使用 `?` 实现可选参数的功能（**可选参数必须跟在必须参数后面**）

4. 在 TypeScript 中，可以为参数提供一个默认值当没有传递这个参数或传递的值是 `undefined` 时

   （1）与普通的可选参数不同，带默认值的参数不需要放在参数的后面

   （2）如果带默认值的参数出现在必须参数前面，用户必须明确地传入 `undefined` 来获得默认值

   ```ts
   function buildName(firstName: string, lastName?: string) {
       if(lastName) {
           return firstName + " " + lastName;
       } else {
           return firstName;
       }
   }
   ```

####   3. 剩余参数

1. 剩余参数会被当做个数不限的可选参数：可以一个都没有，同样也可以有任意个
2. 编译器将省略号（`...`）后面的名字作为数组名创建一个参数数组，可以在函数体内使用这个数组

#### 4. this

1. JavaScript 中 `this` 的值在函数被调用的时候才会指定
2. 箭头函数能保存函数创建时的 `this` 值，而不是调用时的值
3. 如果给编译器设置了 `--noImplicitThis` 标记，TypeScript 会警告发生的错误
4. **this参数**
5. **this类型**

#### 5. 重载

1. JavaScript 本身是个动态语言：JavaScript 中函数根据传入不同的参数而返回不同类型的数据是很常见的——在类型系统中，我们可以**为同一个函数提供多个函数类型定义来进行函数重载**
2. 为了让编译器能够选择正确的检查类型，TypeScript 会查找重载列表并尝试使用第一个重载定义——如果匹配的话就使用这个——因此，在定义重载时，一定要把最精确地定义放在最前面

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

// 第一个重载: 接收对象返回数字——注意分号
function pickCard(x: {suit: string; card: number;}[]): number;
// 第二个重载: 接收数字返回对象
function pickCard(x: number): {suit: string; card: number;};
// 以下并非重载
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

