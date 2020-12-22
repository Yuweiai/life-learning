## 前言

1. TypeScript 是一种由微软开发的、开源的编程语言，2012 年 10 月发布首个公开版本
2. TypeScript 发展至今，已经成为很多大型项目的标配，其提供的**静态类型系统**，大大增强了代码的可读性及可维护性；同时，它提供**最新的和不断发展的 JavaScript 特性**，能让我们构建更健壮的组件
3. 与官方文档相比，本书主要特点：
   - 知识点全面：不仅涵盖官方文档的大部分知识点，而且对于官方文档中没有却遇到的知识点，也做了细致的讲解
   - 示例丰富，简单易懂：书中的例子大都来自作者对日常工作的总结，读者甚至可以直接将它们用于自己的开发工作
   - 深入编译原理：对如何把 TypeScript 编译为 JavaScript 做了详尽的解析

## 第1章：为什么要使用TypeScript

### 1.1 开始使用 TypeScript

1. TypeScript 代码会被编译成 JavaScript 代码，JavaScript 代码才是实际被执行的代码

2. 可以让 VS Code 通过创建 `.vscode/settings.json` 来使用特定版本：

   ```json
   {
    	"typescript.tsdk": "./node_modules/typescript/lib"
   }
   ```

### 1.2 选择 TypeScript 的理由

> 微软推出 TypeScript 主要是为了实现两个目标：
>
> ​	（1）为 JavaScript 提供可选的类型系统
>
> ​	（2）兼容当前及未来的 JavaScript 的特性

#### 1. TypeScript 的类型系统

1. 类型能够提高代码的质量和可维护性

   （1）类型有利于代码的重构，让编译器在编译时而不是运行时捕获错误

   （2）类型是出色的文档形式之一，**函数签名是一个定理，而函数体是具体的实现**（*The function signature is a theorem and the function body is the proof*.）

2. TypeScript 对于一些有不必要的复杂的存在方式的类型尽可能地降低了其入门门槛，通过以下方式做到：

   - JavaScript 即 TypeScript

     	1. TypeScript 为 JavaScript 代码提供了编译时的类型安全，并且这些类型完全可选
      	2. 写在 .js 文件里的 JavaScript 代码，可以被重新命名为 .ts 文件，TypeScript 仍然会返回与原始 JavaScript 文件相同的 .js 文件（TypeScript 是 JavaScript 的 “超集”）

   - **类型可以是隐式的**

     1. TypeScript 将尽可能多地去推断类型信息，以便在代码开发过程中以极小的成本提供类型安全（虽然定义时没有指定其类型，但是赋值时仍然会去进行 “推断”）

        ```ts
        var foo = 123;
        foo = '456';	// error TS2322: Type 'string' is not assignable to type 'number'.
        ```

   - 类型可以是显式的

     1. TypeScript 会尽可能安全地推断类型，但是，可以使用**类型注解**（后文详述）来做下面的事情：
        - 帮助编译器，更重要的是为下一个必须阅读代码的开发人员记录内容
        - 强制编译器编译你认为它应该去编译的内容

   - 类型是结构化的（接口）

     1. TypeScript 的核心原则之一是对值所具有的**结构**进行类型检查，它有时被称作“鸭式辩型法”或“结果性子类型化”

   - **类型错误不会阻止 JavaScript 的正常运行**

     1. 为了方便把 JavaScript 代码迁移到 TypeScript，即使存在编译错误，在<u>默认情况下</u>，TypeScript 代码也会尽可能地被编译为 JavaScript 代码——这与其他语言编译器的工作方式有很大不同

   - 类型可以由环境来定义

     1. TypeScript 通过**声明**实现在 TypeScript 中安全、轻松地使用现有的 JavaScript 库
     2. 大多数流行的 JavaScript 库的声明定义已经由 DefinitedTyped 社区编写过了，因为，在大多数情况下，声明文件已经存在；或者，至少已经拥有了大量经过深思熟虑的可用的 TypeScript 声明模板

#### 2. 支持未来的 JavaScript 所具有的功能



## 第2章：JavaScript常见语法

> JavaScript 和 TypeScript 的关系：
>
> ​	（1）JavaScript 即 TypeScript：现在的 JavaScript ∈ 未来的JavaScript ∈ TypeScript —— TypeScript 是 JavaScript 的“超集”，是带有文档的 JavaScript
>
> ​	（2）TypeScript 让 JavaScript 更美好
>
> ​	（3）学习 JavaScript 仍然是必要的

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

   