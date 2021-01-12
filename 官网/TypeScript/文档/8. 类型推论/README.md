## 类型推论

> TypeScript 中，在有些没有明确指出类型的地方，类型推论会帮助提供类型

```ts
// 变量x的类型被推断为数字
let x = 3;
```

#### 1. 最佳通用类型

1. 当需要从几个表达式中推断类型的时候，会使用这些表达式的类型来推断一个最合适的通用类型（计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型）

   ```ts
   let x = [0, 1, null];
   
   // 候选类型为: number/null
   ```

2. 当候选类型不能使用的时候，需要明确指出类型

3. 如果没有找到最佳通用类型，则类型推断的结果为联合数组类型

#### 2. 上下文类型

1. 上下文类型推论会发生在表达式的类型与所处的位置相关时（函数的参数、复制表达式的右边、类型断言、对象成员、数组字面量和返回值语句）

   ```ts
   // TypeScript类型检查器使用Window.onmousedown函数的类型来推断右边函数表达式的类型: 因此推断出 mouseEvent 参数的类型(?)
   window.onmousedown = function(mouseEvent) {
       console.log(mouseEvent.button);  //<- Error
   };
   ```

2. 如果上下文类型表达式包含了明确的类型信息，则上下文的类型被忽略（不会使用到）

   ```ts
   window.onmousedown = function(mouseEvent: any) {
       console.log(mouseEvent.button);  //<- Now, no error is given
   };
   ```

3. 上下文类型也会作为最佳通用类型的候选类型

   ```ts
   function createZoo(): Animal[] {
       return [new Rhino(), new Elephant(), new Snake()];
   }
   
   // 最佳通用类型有4个候选者：Animal，Rhino，Elephant和Snake
   // Animal会被做为最佳通用类型。
   ```

   

