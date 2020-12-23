## 第2章：JavaScript常见语法

> JavaScript 和 TypeScript 的关系：
>
> 	（1）JavaScript 即 TypeScript：现在的 JavaScript ∈ 未来的JavaScript ∈ TypeScript —— TypeScript 是 JavaScript 的“超集”，是带有文档的 JavaScript
> 	
> 	（2）TypeScript 让 JavaScript 更美好
> 	
> 	（3）学习 JavaScript 仍然是必要的

### 2.1 相等

1. 在 JavaScript 中，使用 == 比较两个变量时，会发生隐式类型转换。为了避免隐式类型转换带来的问题，可以使用 === 进行比较
2. 在 TypeScript 中，甚至使用 == 比较两个变量时，都不会发生隐式类型转换
3. 如果需要比较两个对象是否相等，仅仅使用 == 或 === 是不够的（**深度检查**）

### 2.2 引用

1. 除字面量外，JavaScript 中的任何对象（包括函数、数组、正则表达式等）都是一个引用——这意味着这些对象一旦发生变化，这种变化将会贯穿整个引用；并且在将它们赋值给一个新变量后，它们的引用也是相等的

### 2.3 null 和 undefined

> **在 JavaScript 以及它的扩展 TypeScript 中，null 和 undefined 都表示不同的意思**：
>
> - 变量没有初始化：undefined
> - 变量不可用：null

#### 1. 检查是否相等

#### 2. 检查跟级别上的 undefined

#### 3. 限制显式地使用 undefined

#### 4. Node 风格的回调函数

#### 5. 不要把 undefined 作为有效的表示方式

#### 6. JSON和序列化

1. JSON 标准支持编码 null，但是不支持 undefined —— 当 JSON 编码具有 null 属性的对象时，这个属性将会包含 null 值；当一个属性为 undefined 时，JSON 编码后该属性会被删除
2. 将属性值设置为 null，可以表达清除属性的意图；将属性值设置为 undefined，可以节省存储和传输成本——清除值和缺失值的语义将会复杂化

### 2.4 this

1. 在函数内对 this 关键字的访问实际上都是由函数的实际调用方式控制的，它通常被称为调用上下文
2. 如果要将类中的 this 与调用上下文断开连接，可以使用箭头函数

### 2.5 闭包

1. 在 JavaScript 中，闭包是指一个函数有权访问定义在它外部作用域的任何变量
2. 在较高的层次，闭包也是使像 Node.js 这样的运行环境成为可能的一个因素

### 2.6 数字

> **无论何时，使用任何编程语言处理数字时，都需要了解该语言处理数字的一些特性**

#### 1. 核心类型

1. 在 JavaScript 中，只有一个数字类型：双精度的 64 位的 number

#### 2. 十进制

1. 二进制浮点数可能不能正确映射到十进制数：

   ```js
   console.log(0.1 + 0.2) 	// 0.3 000 000 000 000 000 4
   ```

#### 3. 整数

1. 由内置数字类型表示的整数限制是 `Number.MAX_SAFE_INTEGER` 和 `Number.MIN_SAFE_INTEGER` —— 安全性指的是不能是存在摄入误差的结果
2. 任何加法或减法都会导致结果的舍入，从而远离安全的值
3. 为了检查是否安全，可以使用 ES 6 的 `Number.isSafeInteger`
4. JavaScript 将会获得 BigInt 的支持 —— 到现在为止，如果想要使用任意精度的整数，可以使用 `big.js`

#### 4. big.js

1. `big.js` 专为下面两个目的设计：

   （1）完美的十进制运算

   （2）超出整数值的安全计算

2. 不要将 `big.js` 用于 UI 或以性能为目的的运算，如图表、cavas 画图等

#### 5. NaN

1. 当一个被计算出来的数字不能表示为一个有效数字时，JavaScript 会返回一个特殊的 NaN 值，一个典型的例子就是虚数：

   ```js
   console.log(Math.sqrt(-1)); 	// NaN
   ```

2. 相等的检查不适用于 NaN 值，需要使用 `Number.isNaN` 来代替

#### 6. 无穷

1. 数字的边界值可以用静态的 `Number.MAX_Value` 和 `-Number.MAX_VALUE` 的值来表示

2. 超出边界但是**精度没有改变**的值都被限制在此范围内：

   ```js
   console.log(Number.MAX_VALUE + 1 == Number.MAX_VALUE);   // true!
   console.log(-Number.MAX_VALUE - 1 == -Number.MAX_VALUE); // true!
   ```

3. 超出边界且精度已经改变的值，用 `Infinity` 或 `-Infinity` 表示：

   ```js
   console.log(Number.MAX_VALUE + 10**1000);  // Infinity
   console.log(-Number.MAX_VALUE - 10**1000); // -Infinity
   ```

   `Infinity` 和 `-Infinity` 也会出现在一些运算中：

   ```js
   console.log( 1 / 0); // Infinity
   console.log(-1 / 0); // -Infinity
   ```

   `Infinity` 和 `-Infinity` 同样可以用 Number 类的静态成员表示：

   ```js
   console.log(Number.POSITIVE_INFINITY === Infinity);  // true
   console.log(Number.NEGATIVE_INFINITY === -Infinity); // true
   ```

   比较运算符 < 和 > 在 `Infinity` 值上工作正常：

   ```js
   console.log( Infinity >  1); // true
   console.log(-Infinity < -1); // true
   ```

#### 7. 最小值

1. 在 number 中可表示的最小非零值可以用 Number 类的静态成员 `Number.MIN_VALUE` 来表示

2. 就像 `Number.MAX_VALUE` 的值会被限制为 `Infinity` 一样，小于 `Number.MIN_VALUE` 的值会被限制为 0：

   ```js
   console.log(Number.MIN_VALUE / 10);		// 0
   ```

#### 8. truthy（真值）

1. JavaScript 有一个 truthy 的概念，用来定义在某些位置上被评估为 true 的代码

2. 如果代码不是 truthy 的，则会被认为是 falsy：

   truthy：true、除空字符串的任何其它字符串、除 0 、NaN 的任何其它数字、任何其它对象

   