## 基础类型

#### 1. 布尔值`boolean`

> 1. 最简单的数据类型是布尔值

```typescript
let isDone: boolean = false;
```

#### 2. 数字`number`

> 1. ts 和 js 中的所有数字都是浮点数
> 2. 除了支持十进制和十六进制字面量，ts 还支持 ES 2015 中引入的二进制和八进制字面量

```ts
let decLiteral: number = 6;

let hexLiteral: number = 0xf00d;

let binaryLiteral: number = 0b1010;

let octalLiteral: number = 0o744;
```

#### 3. 字符串`string`

> 1. ts 和 js 使用双引号（`"`）和单引号（`'`）表示字符串
> 2. 可以使用模板字符串（<code>`</code>）

```ts
let name: string = "bob";
name = "smith";
```

#### 4. 数组`Array`

（1）元素类型后面接上`[]`：表示由此类型元素组成的一个数组

```ts
let list: number[] = [1, 2, 3];
```

2）使用数组泛型，`Array<元素类型>`

```ts
let list: Array<number> = [1, 2, 3]
```

#### 5. 元组`tuple`

> 1. 元组类型允许表示一个已知元素数量和类型的数组，**各元素的类型不必相同**
> 2. 当访问一个已知索引的元素，会得到对应索引的类型
> 3. 当访问一个越界的元素，会使用联合类型替代（联合类型在后文详述）

```ts
let x: [string, number] = ['hello', 10]
```

#### 6. 枚举`enum`

> 1. 枚举类型是对 js 标准类型的一个补充
> 2. 默认情况下，从 0 开始编号。当然，也可以手动指定部分成员或全部成员的编号

```ts
enum Color {Red, Green, Blue}

let c: Color = Color.Green;
```

```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color[2]
```

#### 7. `any`

> 1. 任意类型允许在编译时可选择地包含或移除类型检查
> 2. 与`Object`不同，`any` 不仅允许给变量赋任意值，而且允许调用任意**存在的**方法
> 3. 对于数组，当只知道部分数据时，可以使用`any`类型

```ts
let list: any[] = [1, true, "free"]
```

#### 8. `void`

> 1. 某种程度上，`void` 类型像是与 `any` 类型相反，其表示没有任何类型
> 2. 当一个函数没有返回值时，其返回值通常是 `void`
> 3. 声明一个 `void` 类型的变量没有什么大用，因为只能为其赋予 `undefined` 和 `null`

```ts
function warnUser(): void {
    console.log("This is my warning message")
}
```

#### 9. `undefined` 和 `null`

> 1. ts 中，undefined 和 null 各有自己的类型，分别叫做 `undefined` 和 `null`
> 2. 和 `void` 类似，它们本身的类型用处不是很大
> 3. 默认情况下，`undefined` 和 `null` 是所有类型的子类型，**可以赋值给任何类型**
> 4. 当指定了 `--strictNullChecks` 标记时，undefined 和 null 只能赋值给 void 和 它们各自

```
let u: undefined = undefined;
let u: null = null;
```

#### 10. `never`

> 1. `never` 类型表示那些永不存在的值的类型
>
>    ​	（1）总是会抛出异常或根本不会有返回值的函数表达式或箭头表达式的返回值类型
>
>    ​	（2）被永不为真的类型保护所约束的变量的类型
>
> 2. `never` 类型是任何类型的子类型，也可以赋值给任何类型
>
> 3. 没有类型是 `never` 的子类型或可以赋值给 `never` 类型（除了 `never` 本身）

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed")
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while(true) {
    }
}
```

#### 11. `Object`

> 1. `Object` 表示非原始类型，即除 `boolean`、`number`、`string`、`symbol`、`undefined` 或 `null` 之外的类型

## 类型断言

> 1. 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构
> 2. 类型断言没有运行时的影响，只在编译阶段起作用—— ts 会假设开发者已经进行了必须的检查

（1）尖括号语法

```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

（2）as 语法（**当在 ts  中使用 JSX 时，只有 `as` 语法断言是被允许的**）

```ts
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length
```

