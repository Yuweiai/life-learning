## 类

```ts
class Greeter {
    greeting: string;
    
    constructor(message: string) {
        this.greeting = message;
    }
    
    greet() {
        return 'Hello, ' + this.greeting;
    }
}

let greeter = new Greeter("World");
```

> 1. `Greeter` 类有3个成员：
>
>    （1）一个`greeting` 属性
>
>    （2）一个构造函数
>
>    （3）一个`greet`方法
>
> 2. 参看<mark> new 关键字</mark>

#### 继承

> 1. ts 中可以使用常用的面向对象模式
> 2. 基于类的程序设计中一种最基本的模式是允许**使用继承来扩展现有的类**