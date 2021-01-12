## 第4章：TypeScript 项目构成

> **为了使用 TypeScript 成功创建一个项目，需要李俊杰 TypeScript 项目组织中的各项功能**

### 4.1 编译上下文

> 1. 编译上下文可以用于给文件分组（告诉 TypeScript 哪些文件是有效的、哪些是无效的）—— 定义这种逻辑分组，一个比较好的方式是使用 tsconfig.json 文件
> 2. 除了有效文件所携带的信息外，编译上下文还包含**正在被使用的编译选项的信息**

#### 1. tsconfig.json

#### 2. 指定文件

### 4.2 声明空间

> 1. 在 TypeScript 中，存在两种声明空间：类型声明空间和变量声明空间

#### 1. 类型声明空间

1. 类型声明空间包含**用来当做类型注解的内容**，例如下面的类型声明：

   ```ts
   class Foo { }
   interface Bar { }
   type Bas = { }
   ```

2. 声明的类型（上述 Foo、Bar、Bas）可以作为类型注解使用：

   ```js
   let foo: Foo;
   let bar: Bar;
   let bas: Bas;
   ```

3. **尽管定义了 `interface Bar`，但并不能够把 `Bar` 作为一个变量来使用，因为它没有定义在<mark>变量声明空间</mark>中**

   ```ts
   interface Bar {};
   var bar = Bar; // ERROR: "cannot find name 'Bar'"
   ```

#### 2. 变量声明空间

1. 变量声明空间包含可**用作变量的内容**
2. 声明的变量只能在变量声明空间中使用，不能用作类型注解

### 4.3 模块

#### 1. 全局模块

#### 2. 文件模块（外部模块）

1. 如果在 TypeScript 文件的根级别位置含有 import 或 export ，则会在该文件中创建一个本地的作用域

2. 在一个文件中使用了 import 时，它不仅允许你使用从其他文件导入的内容，还会将此文件标记为一个模块，在文件内定义的声明不会污染到全局命名空间

3. 从带有外部模块的 TypeScript 文件中，生成什么样的 JavaScript 文件，是由编译选项 module 决定的

4. 可以根据不同的 module 选项来把 TypeScript 编译成不同的 JavaScript 模块类型

   - AMD
   - SystemJS
   - ES 模块
   - CommonJS
   - ...

#### 3. ES 模块语法

1. 导出（foo.ts）：

   ```ts
   // 导出一个变量或类型
   export const someVar = 123;
   export type someType = {
       foo: string;
   };
   
   // 另一种写法
   const someVar = 123;
   type someType = {
       foo: string;
   };
   
   export {
   	someVar,
       someType
   };
   
   // 重命名导出
   const someVar = 123;
   
   export {
   	someVar as aDifferentName,
   };
   ```

2. 导入（bar.ts）：

   ```ts
   // 导入一个变量或一个类型
   import { someVar, someType } from './foo';
   
   // 重命名导入
   import { someVar as aDifferentName } from './foo';
   
   // 整体导入: 星号(*)指定一个对象，所有输出值都加载到这个对象上面
   // 使用: foo.someVar, foo.someType
   import * as foo from './foo'
   
   // 只导入模块
   import 'core-js';	// 一个普通的polyfill库
   
   // 从其他模块导入后整体/部分/重命名导出
   export * from './foo';
   export { someVar } from './foo';
   export { someVar as aDifferentName } from './foo';
   
   
   ```

3. 默认导入/导出

   ```ts
   // 默认导出
   export default (someVar = 123);	// 变量: 不需要使用let/const/var
   export default function someFunction() {}	// 函数
   export default class someClass {} // 类
   
   // 默认导入(someName, someModules根据需要命名)
   import someName from 'someModules'
   ```

#### 4. 模块路径

1. TypeScript 编译选项中， `module: commonjs` 选项自动包含 `moduleResolution: commonjs` 选项

2. 存在两种不同的模块：可根据导入语句时的路径进行区别（本质是系统如何进行模块解析）

   （1）相对模块：通过相对路径进行解析导入

   （2）动态查找模块：模仿 Node 模块解析导入，如 core-js、typestyle、react 或 react/core 

   - ```ts
     import foo from 'foo'
     ```

     ```
     ./node_modules/foo
     ../node_modules/foo
     ../../node_modules/foo
     ...
     一直查询到系统根目录
     ```

   - ```js
     import foo from 'something/foo'
     ```

     ```
     ./node_modules/something/foo
     ../node_modules/something/foo
     ../../node_modules/something/foo
     ...
     一直查询到系统根目录
     ```

3. **place** ——e.g. for a place `foo`:

   （1）存在 foo 文件，则找到 foo.ts

   （2）存在 foo 文件夹，则找到 foo/index.ts

   （3）存在 foo 文件夹，并且在 foo 文件夹下存在 package.json 文件，则找到 package.json 文件中指定 types 的文件

   （4）存在 foo 文件夹，并在在 foo 文件夹下存在 package.json 文件，则找到 package.json 文件中指定main 的文件

4. 全局模块声明

   ```ts
   // global.d.ts
   declare module 'foo' {
     // Some variable declarations
     export var bar: number; /*sample*/
   }
   
   // anyOtherTsFileInYourProject.ts
   import * as foo from 'foo';
   // TypeScript assumes (without doing any lookup) that
   // foo is {bar:number}
   ```

#### 5. import/export 只导入类型

1. 语法: `import foo = require('foo')`

      实质：（1）导入 foo 模块的**所有类型信息**；（2）确定 foo 模块**运行时的依赖关系**

   > 可以选择只加载类型信息，而没有运行时的依赖关系

2. 如果没有把导入的名称作为变量声明空间来使用，则在编译成 JavaScript 时，导入的模块将会被完全移除

   ```ts
   import foo = require('foo');
   // 被编译成一个不含任何代码的 JavaScript 文件
   
   import foo = require('foo');
   var bar: foo;
   // 被编译成: var bar;
   
   import foo = require('foo');
   const bar = foo;
   // 被编译成: var foo = require('foo'); var bar = foo;
   ```

3. 懒加载（Lazy loading）：类型推断（Type inference）需要提前完成

   （1）如果想在 bar 文件里使用从其他文件 foo 导出的类型，则必须如下写法：

   ```ts
   import foo = require('foo');
   let bar: foo.someType;
   ```

   （2）如果想在运行时加载文件 foo，则应该在类型注解中使用导入的模块名称，而不是把 foo 当作变量使用——在代码被编译成 JavaScript 时，这些将会被移除，不影响我们手动导入所需要的的模块：

   ```ts
   // CommonJS
   import foo = require('foo');
   
   export function loadFoo() {
       // 这是懒加载, 原始的加载只被用作类型注解
       const _foo: typeof foo = require('foo');
       // 现在, 可以使用 _foo 代替 foo 来作为一个变量使用了
   }
   ```

   ```ts
   // RequireJS
   import foo = require('foo');
   
   export function loadFoo() {
       require(['foo'], (_foo: typeof foo) => {
           // 现在, 可以使用 _foo 代替 foo 来作为一个变量使用了
       })
   }
   ```

4. 循环依赖（Circular dependencies）：Similar to the lazy loading use case certain module loaders (commonjs/node and amd/requirejs) don't work well with circular dependencies. In such cases:

   （1）have lazy loading code in one direction（懒加载）

   （2）loading the modules upfront in the other direction（预先加载）

5. 确保导入

   （1）有时加载一个模块，只是想引入其附加的作用，而并不需要把导入的名称作为变量声明空间来使用。这种情况下，经过 TypeScript 编译后，转换后的 JavaScript 将不包含对模块的依赖关系，模块加载器（如 webpack）也会完全忽视它们。

   （2）如果要确保编译后的 JavaScript 代码依赖于某个模块，可以使用一个自定义的 ensureImport 变量：

   ```ts
   import foo = require('foo');
   import bar = require('bar');
   import bas = require('bas');
   
   const ensureImport: any = foo || bar || bas;
   ```

#### 6. global.d.ts（待续）

1. global.d.ts 文件可以用来将一些接口或类放入全局命名空间，从而在所有 TypeScript 代码中使用
2. 对于任何需要编译成 JavaScript 的代码，强烈建议把它们放入文件模块

### 4.4 命名空间（Namespaces）

```ts
(function(something) {

    something.foo = 123;

})(something || (something = {}))

console.log(something); // {foo:123}

(function(something) {

    something.bar = 456;

})(something || (something = {}))

console.log(something); // {foo:123, bar:456}
```
1. something || (something = {}) 允许匿名函数 function(something) {} 向现有对象添加内容，或者创建一个新对象，然后向该对象添加内容

2. 在确保创建的变量不会泄露至全局命名空间时，这种方式在 JavaScript 中很常见。当基于文件模块使用时，无须担心这一点，但是该模式仍然适用于一组函数的逻辑分组。因此，TypeScript 提供了 namespace 关键字来描述这种分组：

   ```ts
   namespace Utility {
       export function log(msg) {
           console.log(msg);
       }
       export function error(msg) {
           console.error(msg);
       }
   }
   
   // usage
   Utility.log('Call me');
   Utility.error('maybe!');
   ```

   ```js
   // namespace 关键字编译后的 JavaScript 代码
   var Utility;
   (function (Utility) {
       function log(msg) {
           console.log(msg);
       }
       Utility.log = log;
       function error(msg) {
           console.error(msg);
       }
       Utility.error = error;
   })(Utility || (Utility = {}));
   // usage
   Utility.log('Call me');
   Utility.error('maybe!');
   
   ```

### 4.5 动态导入表达式

