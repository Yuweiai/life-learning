## 第3章：JavaScript 新语法特性

### 3.1 类

1. 在 JavaScript 中，类作为 “一等公民”（第一等语言结构） 的重要原因在于以下 3 点：

   （1）提供一个有用的抽象化结构

   （2）为开发者提供使用类的一致方法，而不是每个框架（Ember.js、React.js 等）都有自己的版本

   （3）熟知面向对象的开发者已经对类有所了解

#### 1. 继承（extends）—— 深入参见 ES6 相关

1. 在 TypeScript 中的类，与其他语言一样，支持使用 extends 关键字实现单继承
2. 如果一个类中拥有构造器，则必须在该构造器中调用父级构造器（TypeScript 会指明这一点）——这能确保可以使用 this 来设置或获取一些变量
3. 调用 super 之后，可以添加任何想在构造器中添加的表达式

#### 2. 静态（static）

1. TypeScript 类支持静态属性，静态属性会被所有的实例共享
2. 放置（和访问）它们的合适位置在类本身上（*A natural place to put (and access) them is on the class itself*）
3. 不仅可以拥有静态属性，还可以拥有静态函数

#### 3. 访问修饰符（Access Modifiers）

1. TypeScript 支持访问修饰符 public（缺省默认）、protected 和 private，它们决定了成员（包括成员属性和成员函数）的可访问性：

   | 可访问 | public | protected | private |
   | :----: | :----: | :-------: | :-----: |
   |   类   |   是   |    是     |   是    |
   |  子类  |   是   |    是     |   否    |
   |  实例  |   是   |    否     |   否    |

2. 如果未指定访问修饰符，则默认是 public
3. 访问修饰符对于运行时没有任何意义，但是如果没有正确使用访问修饰符的话，则在编译时会抛出错误

#### 4. 抽象（abstract）

1. abstract 也可以被认为是一个访问修饰符，但是 abstract 可以作用在类及类的任何成员上

   - abstract 类不能直接被实例化，用户必须创建一个类来继承 abstract 类

     ```js
     abstract class FooCommand {}
     
     class BarCommand extends FooCommand {}
     
     const fooCommand: FooCommand = new FooCommand(); // Cannot create an instance of an abstract class.
     
     const barCommand = new BarCommand(); // You can create an instance of a class that inherits from an abstract class.
     ```

   - abstract 成员不能直接被访问，子类必须实现这个功能

     ```js
     abstract class FooCommand {
       abstract execute(): string;
     }
     
     class BarErrorCommand  extends FooCommand {} // 'BarErrorCommand' needs implement abstract member 'execute'.
     
     class BarCommand extends FooCommand {
       execute() {
         return `Command Bar executed`;
       }
     }
     
     const barCommand = new BarCommand();
     
     barCommand.execute(); // Command Bar executed
     ```
   
#### 5. 构造器（constructor）

1. 构造器是可选的，类不是必须要有一个构造器

2. 可以使用构造器来定义成员变量：在类中拥有一个成员，并在构造器中初始化该成员：

   ```ts
   class Foo {
       x: number;
   	constructor(x: number) {
           this.x = x
       }
   }
   ```

3. TypeScript 提供了上述普遍形式的缩写：

   ```ts
   // 在成员中加一个修饰符前缀: 该成员会在类上自动声明，并且从构造器中复制过去
   class Foo {
       constructor(public x: number) {
           
       }
   }
   ```

#### 6. 属性初始化（ES 7：Property initializer）

1. 可以在类的构造器外初始化类中的任何成员：实际提供了一个默认值

   ```ts
   class Foo {
       members = [];	// 直接初始化
       add(x) {
           this.members.push(x);
       }
   }
   ```

#### 7. IIFE（Immediately-Invoked Function Expression）

```ts
// ts
class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}
```

```js
// 上述ts代码编译后的js代码
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    return Point;
}());
```

1. 使用IIFE，与继承有关：IIFE 允许 TypeScript 使用变量 _super 来捕获基类（base class）。如下所示（基类为 `Point`）：

   ```js
   var Point3D = (function (_super) {
       _extends(Point3D, _super);
       function Point3D(x, y, z) {
           _super.call(this, x, y);
           this.z = z;
       }
       Point3D.prototype.add = function (point) {
           var point2D = _super.prototype.add.call(this, point);
           return new Point3D(point2D.x, point2D.y, this.z + point.z);
       }
   })(Point);
   ```

#### 8. _extends

1. 当在 TypeScript 中使用类的继承时，它们会生成如下代码：

   ```js
   var __extends = this.__extends || function (d, b) {
       for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
       function __() { this.constructor = d; }
       __.prototype = b.prototype;
       d.prototype = new __();
   };
   ```

2. 以上，d 表示派生类，b 表示基类。这个函数做了两件事情：

   （1）将基类的静态成员复制到子类：

   ```js
   for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
   ```

   （2）设置子类函数的原型，用来选择性地查找父类 proto 上的成员：

   ```js
   function __() { this.constructor = d; }
   __.prototype = b.prototype;
   d.prototype = new __();
   
   // 上述代码可表示为: 
   d.prototype = {
       __proto__: __.prototype,
       constructor: d
   }
   
   // d.prototype.__proto__ = b.prototype的重要性
   // 允许将成员函数添加到子类，并从基类继承其他函数
   ```

##### \__proto__

1. JavaScript 中的所有对象都包含一个 \__proto__ 成员（该成员在较老版本的浏览器中不能被获取，有些文档将这个属性称为称为[[prototype]]），它的存在意义之一是作为原型链的组成部分

##### prototype

1. JavaScript 中的所有函数都有一个 prototype 属性，prototype 属性本身也是一个对象，其有一个指向函数本身的构造器属性

##### new

1. new 作用于被调用函数时，被调用函数中的 this 基本上都将指向从函数返回的新对象：

   ```js
   function Foo() {
       this.bar = 123;
   }
   
   // call with the new operator
   var newFoo = new Foo();
   console.log(newFoo.bar); // 123
   ```

2. 实际上，在函数上调用 new，会将函数的 Prototype 分配给新创建对象的 \__proto__，同时该新创建对象应该是函数调用返回的

#### d.prototype.__proto__ = b.prototype

```js
function Animal() { }
Animal.prototype.walk = function () { console.log('walk') };

function Bird() { }
// d.prototype.__proto__ = b.prototype
// 从基类Animal中继承
Bird.prototype.__proto__ = Animal.prototype;
// 子类Bird添加成员
Bird.prototype.fly = function () { console.log('fly') };

var bird = new Bird();
// bird.walk(一个被继承的成员)即bird.__proto__.__proto__.walk中，因为
// 1. bird.__proto__ = Bird.prototype
// 2. bird.__proto__.__proto__ = Animal.prototype
bird.walk();
// bird.fly即bird.__proto__.fly
bird.fly();
```

### 3.2 箭头函数

1. 设计箭头函数的主要目的：

   （1）不再需要书写 function（语法简洁）

   （2）从词义上说，箭头函数包含了 this  和 argument 的意义

2. 箭头函数通过使用捕获上下文的 this 的意义的方式修复了 JavaScript 中的 this 指向问题：箭头函数会从函数体外部捕获到 this 的引用

   ```js
   // 1
   function Person(age) {
       this.age = age;
       this.growOld = function() {
           this.age++;
       }
   }
   
   // 2
   function Person(age) {
       this.age = age;
       this.growOld = () => {
           this.age++;
       }
   }
   
   // 3
   function Person(age) {
       this.age = age;
       var _this = this;
       this.growOld = function() {
           _this.age++;
       }
   }
   
   // 4: 如果使用TypeScript, 可以使用箭头函数和类以让代码更简洁
   class Person {
       constructor(public age: number) { }
       growOld = () => {
           this.age++;
       }
   }
   ```

#### 1. 箭头函数和继承（待续）

1. 箭头函数作为类的属性可以很好地处理继承

#### 2. 快速返回对象

1. 需要只返回一个简单对象字面量的函数时，可以用 () 包围对象字面量的方式

   ```js
   var foo = () => ({
       bar: 123;
   })
   ```

### 3.3 rest参数

1. rest 参数，即用 "... + 参数名" 的形式表示最后一个参数，以在函数中快速获取剩余参数（可以是多个），并将它们转化为数组
2. 在任意函数中都能使用 rest 参数，如普通函数、箭头函数、类成员函数

### 3.4 let

1. var 变量在 JavaScript 中是函数作用域，而并非块作用域

2. 函数会创建新的作用域

3. 在 TypeScript 编译生成的 JavaScript 中，

   （1）如果在周围的作用域内不存在相同的名称的话，TypeScript 只是简单地将 let 重命名为 var

   （2）如果在周围的作用域内存在相同的名称，则 TypeScript 会创建一个新的变量名称：

   ```ts
   // ts
   var foo = "123";
   
   if(true) {
       let foo = 123;
   }
   
   // js
   var foo = "123";
   if (true) {
       var foo_1 = 123;
   }
   ```

4. switch

5. 闭包中的 let

   ```js
   var funcs = [];
   // 创建一组函数
   for (var i = 0; i < 3; i++) {
       funcs.push(function() {
           console.log(i);
       })
   }
   // 调用这些函数: 这些函数输出的都是3
   // 原因: 这些函数都是从外部作用域使用变量i的, 而第一个循环中止后，i的值将为3
   for (var j = 0; j < 3; j++) {
       funcs[j]();
   }
   ```

   **修复方法一：**在每个循环中创建一个新的变量，同时创建一个新的函数（使用新创建的变量）并立即执行来创建一个新的变量作用域，即 IIFE 模式——这里形成了一个闭包（注意：由于闭包需要存储周围的状态，所以会对性能产生影响）

   ```js
   var funcs = [];
   // create a bunch of functions
   for (var i = 0; i < 3; i++) {
       (function() {
           var local = i;
           funcs.push(function() {
               console.log(local);
           })
       })();
   }
   // call them
   for (var j = 0; j < 3; j++) {
       funcs[j]();
   }
   ```

   **修复方法二：**let 关键字会在每个循环中创建一个变量 i

### 3.5 const

1. const 可以创建不可变的变量
2. const 在可读性和可维护性方面，都称得上是一个良好的实现，并且 const 可以避免使用魔法字面量（magic literal）

> 1. Magic number 一般是指硬写到代码里的整数常量，数值是编程者自己指定的，其他人不知道数值有什么具体意义，表示不明觉厉，就称作 magic number
> 2. 编程教材书用 magic number 指代初学者不定义常量直接写数的不良习惯

```js
// 可读性低
if(x > 10) {
    
}

// 可读性好多了
const maxRows = 10;
if(x > maxRows) {
    
}
```

3. const 声明必须初始化（因为一旦声明不可变）

4. 常量在创建之后不能被改变（赋值符号的左值不能是一个常量），否则编译时会报错

5. 块作用域

6. 深层次的不变性（Deep immutability）

   （1）const 可以处理对象字面量，以保护变量引用

   （2）const 仍然允许对象的子属性的改变

### 3.6 解构

