## 泛型

1. 软件工程中，不仅要创建一致的定义良好的 API，同时也要考虑可重用性——组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型——这在创建大型系统时提供了十分灵活的功能
2. 在像 C# 和 Java 这样的语言中，可以使用 `泛型` 来创建可重用的组件：一个组件可以支持多种类型的数据

#### 1. 泛型函数

```ts
// 1: 必须传入数字类型, 且会返回数字类型
function identity(arg: number): number {
    return arg;
}

// 2: 可以传入任意类型, 会返回任意类型
function identity(arg: any): any {
    return arg;
}

// 3： 使用类型变量——特殊的变量，只用于表示类型而不是值
// (1) 类型变量可以捕获用户传入的类型
// (2) 使用类型变量可以适用于多个类型——因此该identity函数可以叫做泛型
function identity<T>(arg: T): T {
    return arg;
}

// 3.1 使用泛型函数一: 传入所有的参数，包括类型参数
let output = identity<string>("myString");
// 3.2 使用泛型函数二: 利用类型推论(编译器会根据传入的参数自动确定类型变量T的类型)
let output = identity("myString");
```

#### 2. 泛型变量

> **泛型变量代表的是任意类型**

```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);	// Error: T doesn't have .length
    return arg;
}

// 可以把泛型变量当做类型的一部分来使用——捕获T, 规定传入的是T[], 并返回T[]
function loggingIdentity<T>(arg: T[]): T[] {
// function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);	// Array has a .length, so no more error
    return arg;
}
```

#### 3. 泛型类型

```ts
function identity<T>(arg: T): T {
    retrun arg;
}

// 可以使用不同的泛型参数名, 只要在数量上和使用方式上能对应上就行
let myIdentity: <U>(arg: U) => U = identity;

// 可以使用带调用签名的对象字面量定义泛型函数
let myIdentity: {<T>(arg: T): T} = identity;
```

#### 4. 泛型接口

```ts
// 直接将带调用签名的对象字面量做为接口
// 1. 把参数放在调用签名里
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

```ts
// 将泛型参数当作整个接口的一个参数: 接口里的成员也能够清楚地知道使用的具体是哪个泛型类型
// 2. 把参数放在接口上
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentity<number> = identity;
```

#### 5. 泛型类

> 1. 除了泛型接口，还可以创建泛型类
> 2. 无法创建泛型枚举和泛型命名空间

```ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

// 1. number类型
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// 2. string类型
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };
```

PS：类有两部分：静态部分和实例部分。**泛型类指的是实例部分的类型**，所以类的静态属性不能使用该泛型类型

#### 6. 泛型约束

> 为泛型函数定义约束，因此泛型函数可能不再适用于任意类型

```ts
// 编译器并不能确认没中类型都有 length 属性，所以报错
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

// 定义一个接口来描述约束条件: 只要传入的类型至少包含 length 属性
interface LengthWise {
    length: number;
}

// 使用约束条件接口和 extends 关键字实现约束
function loggingIdentity<T extends LengthWise>(arg: T): T {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
```

##### 在泛型约束中使用类型参数

> 可以声明一个类型参数，且该类型参数被另一个类型参数所约束

```ts
// 用属性名key从对象obj里获取属性值，并且确保属性名key存在于对象obj上
function getProperty(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

##### 在泛型里使用类类型（待续）

> 在 TypeScript 使用泛型创建工厂函数时，需要引用构造函数的类类型

```ts
function create<T>(c: { new(): T; }): T {
    return new c();
}
```

