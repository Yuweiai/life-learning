## 枚举

1. 使用枚举可以定义一些**带名字的常量**：可以清晰地表达意图或创建一组有区别的用例
2. TypeScript 支持数字和基于字符串的枚举

#### 1. 数字枚举

##### 1.1 定义枚举

```ts
// 不使用初始化器
// Up === 0
enum Direction {
    Up,
    Down,
    Left,
    Right
}

Direction = {
    0: "Up", 
    1: "Down", 
    2: "Left", 
    3: "Right", 
    Up: 0, 
    Down: 1, 
    Left: 2, 
    Right: 3
}

// 使用初始化器
// Up === 1
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

Direction = {
    1: "Up", 
    2: "Down", 
    3: "Left", 
    4: "Right", 
    Up: 1, 
    Down: 2, 
    Left: 3, 
    Right: 4
}
```

##### 1.2 使用枚举

1. 通过枚举的属性访问枚举成员
2. 通过枚举的名字类访问枚举类型

```ts
enum Response {
    No = 0,
    Yes = 1,
}

// 通过枚举的名字类访问枚举类型
function respond(recipient: string, message: Response): void {
    // ...
}

// 通过枚举的属性访问枚举成员
respond("Princess Caroline", Response.Yes)
```

3. 不带初始化器的枚举或者被放在第一的位置，或者被放在使用了数字常量或其他常量初始化了的枚举后面

#### 2. 字符串枚举

1. 在一个字符串枚举里，每个成员都必须用**字符串字面量**，或**另外一个字符串枚举成员**进行初始化
2. 字符串枚举没有自增长行为（可以很好地序列化）
3. 字符串枚举允许提供一个运行时有意义的并且可读的值，独立于枚举成员的名字

```ts
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

#### 3. 异构枚举（Heterogeneous enums）

4. 从技术的角度来说，枚举可以混合字符串和数字成员——除非需要利用 JavaScript 运行时的行为（不能确定运行时的数据类型），否则不建议这样做

```ts
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

#### 4. 常量成员和计算的成员

> 每个枚举成员都带有一个值，它可以是**常量**或**计算出来的**

（1）当满足如下条件时，枚举成员被当作是常量：

```ts
// 1. 是枚举的第一个成员，且没有初始化器: 被赋值为常量0
enum E { X }

// 2. 不带有初始化器，且之前的枚举成员是一个数字常量: 当前枚举成员的值是上一个枚举成员的值加1
enum E1 { X, Y, Z }
enum E2 { A = 1, B, C }

// 3. 枚举成员使用常量枚举表达式初始化
```

> **常量枚举表达式**是 TypeScript 表达式的子集，可以在编译阶段求值。当一个表达式满足下面条件之一时，该表达式是一个常量枚举表达式：
>
> - 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
> - 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
> - 带括号的常量枚举表达式
> - 一元运算符 +，-，~ 其中之一应用在了常量枚举表达式
> - 常量枚举表达式作为二元运算符 +，-，*，/，%，<<，>>，>>>，&，|，^ 的操作对象
>
> **PS：如果常量枚举表达式求值后为 `NaN` 或 `Infinity`，则会在编译阶段报错**

（2）所有其他情况的枚举成员被当作是需要计算得出的值

```ts
enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    
    // computed member
    G = "123".length
}
```

#### 5. 联合枚举

1. **字面量枚举成员**是一种特殊的非计算的常量枚举成员，它是指：

   （1）不带有初始值的常量枚举成员

   （2）或者值被初始化为

   - 
   	- 任何字符串字面量
   	- 任何数字字面量
   	- 应用了一元 `-`符号的数字字面量（例如：-1，-100）

2. 当所有枚举成员都拥有字面量枚举值时：
   
   （1）枚举成员成为了类型
   
   （2）枚举类型本身成为了**每个枚举成员的联合**

#### 6. 运行时的枚举

1. 枚举是在运行时真正存在的对象

   ```ts
   enum E {
       X, Y, Z
   }
   
   // can actually be passed around to functions
   
   function f(obj: { X: number }) {
       return obj.X;
   }
   
   // Works, since 'E' has a property named 'X' which is a number.
   f(E);
   ```

   

#### 7. 反向映射

> 数字枚举成员具有反向映射（从枚举值到枚举名）

```ts
   enum Direction {
       Up,
       Down,
       Left,
       Rigth
   }
   
   var Direction;
   (function (Direction) {
       Direction[Direction["Up"] = 0] = "Up";
       Direction[Direction["Down"] = 1] = "Down";
       Direction[Direction["Left"] = 2] = "Left";
       Direction[Direction["Rigth"] = 3] = "Rigth";
   })(Direction || (Direction = {}));
   
   // Direction["Up"] = 0	——	正向映射(name -> value)
   // Direction[0] = "up"	——	反向映射(value -> name)
```

```ts
enum stringEnum {
    Red = 'red',
    Green = 'green',
    Blue = 'blue'
}

var stringEnum;
(function (stringEnum) {
    stringEnum["Red"] = "red";
    stringEnum["Green"] = "green";
    stringEnum["Blue"] = "blue";
})(stringEnum || (stringEnum = {}));
```

#### 8. const 枚举

1. const 枚举通过常量枚举在枚举上使用 `const` 修饰符来定义

2. 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，可以使用 `const` 枚举

3. `const` 枚举只能使用常量枚举表达式，不允许包含计算成员

4. `const` 枚举在编译阶段会被删除

   ```ts
   // ts
   const enum Enum {
       A = 1,
       B = A * 2
   }
   
   // js: 编译后删除为空
   ```

   ```ts
   // ts
   const enum Directions {
       Up,
       Down,
       Left,
       Right
   }
   
   let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
   
   
   // js
   var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
   ```

#### 9. 外部枚举（Ambient enums）

1. 外部枚举用来描述已经存在的枚举类型的形状（Ambient enums are used to describe the shape of already existing enum types.）
2. in regular enums, members that don’t have an initializer will be considered constant if its preceding enum member is considered constant.
3. In contrast, an ambient (and non-const) enum member that does not have initializer is *always* considered computed.

