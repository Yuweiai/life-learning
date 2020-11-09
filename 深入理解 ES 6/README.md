《Understanding ECMAScript 6》：https://github.com/nzakas/understandinges6

——Nicholas C. Zakas

## 内容简介

> 1. ES 6 是 ECMAScript 标准十余年来变动最大的一个版本，其中添加了许多新的语法特性
> 2. 在可预见的未来，ES 6 中引入的语言特性会成为 JavaScript 应用程序的主流特性
>
> **希望你通过阅读本书可以了解 ES 6 的新特性，并在需要时能够随时使用**

## 译者序——张振涛

> 1. 阿特伍德（Atwood）定律：Any application that can be written in JavaScript, will eventually be written in JavaScript
>
> 2. 《Understanding ECMAScript 6》一书是作者 Nicholas C. Zakas 在 
>
>    [GitHub]: https://github.com/nzakas/understandinges6
>
>    撰写而成

## 序——Dan Abramov

> 1. JavaScript 不是一门玩具语言——我同意撇开成见试一试，于是打开 **MDN** 和 **StackOverflow** 首次深入学习 JavaScript
> 2. 工具：
>    （1）代码整理工具（linter）
>    （2）代码合并工具（bundler）
>    （3）代码压缩工具（minifier）
> 3. 转移器：
>    （1）Traceur：Google，大多功能非常有限，或难以插入现有的 **JavaScript 构建管道**
>    （2）6to5：即 **Babel**，易于安装，可以很好地集成在现有的工具中

## 前言

> 1. JavaScript 核心的语言特性是在标准 ECMA-262中被定义的
> 2. ECMA-262 标准定义的语言被称作 ECMAScript，它是 JavaScript 的子集
> 3. （虽然）在浏览器与 Node.js 环境中通过附加的对象和方法可福建更多新功能（BOM、DOM 等），而（但） JavaScript 的核心依然保持 ECMASCript 的定义

#### ECMAScript 6 之路

1. JavaScript 与 ECMAScript
   （1）2007 年，JavaScript 走向了发展中的转折点：逐渐兴起的 Ajax 开创了**动态 Web 应用**的新时代
   （2）自 1999 年第三版 ECMAScript-262 发布以来，JavaScript 没有丝毫改变
2. 对于 ECMAScript 的第四版标准，负责推动 ECMAScript 语言发展的 TC-39 委员会部分成员认为，不应该一次性在其中加入过多的新功能
3. 来自雅虎、谷歌和微软的技术负责人共同商讨并提交了一份 “ECMAScript 3.1” 草案作为下一代 ECMAScript 的可选方案（PS：3.1 意在表明只是对现有标准进行小幅的增量修改）
4. 委员会曾经尝试融合 ECMAScript 3.1 与 ECMAScript 4，但**由于对峙双方对语言未来的发展方向分歧过大**，最后以失败告终
5. 到了 2008 年，JavaScript 创始人 Brendan Eich 宣布 TC-39 委员会将合力推进 ECMAScript 3.1 的标准化工作……经过标准化的 ECMAScript 3.1 最终作为 ECMAScript-262 第五版正式（ECMAScript 5）发布——委员会表示他们永不发布第四版，以避免与从未面世的 “ECMAScript 4” 产生命名冲突
6. ECMAScript 3.1 标准化工作完成之后，TC-39 委员会全体成员努力融合 ECMAScript 3.1 和 4 中的精华，这一版本取昵称为——ECMAScript Harmony
7. ECMAScript 6 基于 ECMAScript Harmony，于 2015 年全部完成，并被正式命名为 “ECMAScript 2015”，成为继 ECMAScript 5 之后发布的首个新标准：**ECMAScript 6 中点滴的变化全都致力于解决开发者实际工作中遇到的问题**





## 第 1 章：块级作用域绑定

#### 1.1 var 声明及变量提升机制

1. 变量（声明）提升（hosting）机制：在 **函数作用域** 或 **全局作用域 ** 通过关键字 `var` 声明的变量，无论实际上是在哪里声明的，都会在预编译阶段，被 JavaScript 引擎当成在当前作用域顶部声明的变量

2. 刚接触 JavaScript 的开发者通常会发一些时间来习惯变量提升，有时还会因误解而导致程序中出现 bug：为此，ECMAScript 6 引入块级作用域来**强化对变量生命周期的控制**

#### 1.2 块级声明

1. 块级声明用于声明**在指定块的作用域之外无法访问**的变量
2. 块级作用域（亦被称为词法作用域）存在于：
   （1）函数内部
   （2）块中——大括号（{}）之间

##### 1.2.1 let 声明

1. let 声明的用法与 var 相同：用 let 代替 var 来声明变量，就可以把变量的作用域限制在当前代码块中

2. 同一作用域中不能用 let 重复定义已经存在的标识符，但是如果当前作用域内嵌另一个作用域，便可在内嵌的作用域中用 let 声明同名变量——内部块中的 count 会遮蔽全局作用域中的 count**（局部优先）**

   ```js
   var count = 30;
   
   if(condition) {
       // 不会抛出错误
       let count = 40;
       
       // 更多代码
   }
   ```

##### 1.2.2 const 声明

1. const 用于声明常量

2. 因为常量值一旦被设定后不可更改，因此，每个通过 const 声明的常量必须进行初始化

3. const 与 let 声明的都是块级标识符

4. 同一作用域中不能用 const 重复定义已经存在的标识符

5. 与其他语言中的常量不同的是，**JavaScript 中的常量如果是对象，则对象中的值可以修改**：const 声明不允许修改绑定，但允许修改值——这意味着，用 const 声明对象后，可以修改该对象的属性值

   ```js
   // person绑定了一个对象
   const person = {
       name: "Nicolas"
   };
   
   // 可以修改对象的属性值
   person.name = "Greg";
   
   // 不能直接给person赋值，即更改person的绑定
   // 报错
   person = {
       name: 'Greg'
   };
   ```

##### 1.2.3 暂时死区（Temporal Dead Zone，TDZ）

1. JavaScript 引擎在**扫描代码**发现变量声明时，
   （1）要么将它们提升至作用域顶部（遇到 var 声明）
   （2）要么将声明放到 TDZ 中（遇到 let 和 const 声明）
2. 访问 TDZ 中的变量会触发**运行时错误**（即使是相对不易出错的 typeof 操作符也无法阻挡引擎抛出错误）
3. 只有**执行**过变量声明语句后，变量才会从 TDZ 中移出，然后方可正常访问

#### 1.3 循环中的块作用域绑定