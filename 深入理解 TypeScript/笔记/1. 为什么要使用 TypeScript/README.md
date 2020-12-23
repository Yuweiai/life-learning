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
