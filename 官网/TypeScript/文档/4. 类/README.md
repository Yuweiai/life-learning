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

#### 1. 继承

> 1. ts 中可以使用常用的面向对象模式
> 2. 基于类的程序设计中一种最基本的模式是允许**使用继承来扩展现有的类**

```ts
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

上述代码：

1. 最基本的继承：类从基类中继承属性和方法
2. Dog 是一个派生类，通过 `extends` 关键字派生自 Animal 基类
3. 派生类通常被称作子类，基类通常被称作超类
4. 派生类可以包含一个构造函数，该构造函数必须调用 `super()`，它会执行基类的构造函数。而且，在构造函数里访问 `this`的属性之前，我们 *一定*要调用 `super()`。 这个是TypeScript强制执行的一条重要规则。

#### 2. 修饰符

1. TypeScript 支持访问修饰符 public（缺省默认）、protected 和 private，它们决定了成员（包括成员属性和成员函数）的可访问性：

   |      可访问      | public | protected | private |
   | :--------------: | :----: | :-------: | :-----: |
   | 类（基类、超类） |   是   |    是     |   是    |
   |  子类（派生类）  |   是   |    是     |   否    |
   |       实例       |   是   |    否     |   否    |

3. 访问修饰符对于运行时没有任何意义，但是如果没有正确使用访问修饰符的话，则在编译时会抛出错误

4. TypeScript 使用的是**结构类型系统**，当比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。然而，当我们比较带有 `private`或 `protected`成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 `private`成员，那么只有当另外一个类型中也存在这样一个 `private`成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 `protected`成员也使用这个规则。

   ```ts
   class Animal {
       private name: string;
       constructor(theName: string) { this.name = theName; }
   }
   
   class Rhino extends Animal {
       constructor() { super("Rhino"); }
   }
   
   class Employee {
       private name: string;
       constructor(theName: string) { this.name = theName; }
   }
   
   let animal = new Animal("Goat");
   let rhino = new Rhino();
   let employee = new Employee("Bob");
   
   animal = rhino;
   animal = employee; // 错误: Animal 与 Employee 不兼容.
   ```

4. 构造函数也可以被标记成 `protected`：这意味着这个类不能在包含它的类外被实例化，但是能被继承

5. 可以使用 `readonly` 关键字将属性设置为只读的——只读属性必须在声明时或构造函数里被初始化

#### 3. 参数属性

1. 参数属性可以方便地在一个地方定义并初始化一个成员（声明和赋值合并至一处）
2. 参数属性通过给构造函数参数前面添加一个访问限定符来声明——使用 `private` 限定一个参数属性会声明并初始化一个私有成员；`public` 和 `protected` 类似

```ts
// 使用参数属性前的写法
class Octopus {
    name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
        this.name = theName;
    }
}

// 使用参数属性后的写法
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(name: string) {
    }
}
```

#### 4. 存取器

1. TypeScript 支持通过 getter/setter 来截取对对象成员的访问
2. 存取器要就将编译器设置为输出 ECMAScript 5 或更高，不支持降级到 ECMAScript 3
3. 只带有 `get` 不带有 `set` 的存取器自动被推断为 `readonly` 

#### 5. 静态属性

1. 类的静态成员属性存在于类本身上面而不是类的实例上，它不是仅当类被实例化的时候才会被初始化的属性
2. 每个实例想要访问静态成员属性时，都要在该属性前面加上类名

#### 6. 抽象类

1. **抽象类作为其它派生类的基类使用，并且一般不会直接被实例化**

2. `abstract` 关键字用于定义抽象类和在抽象类内部定义抽象方法

3. 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现

   （1）不同于接口，抽象类可以包含成员的实现细节

   （2）抽象方法的语法与接口方法相似：两者都是定义方法签名但不包含方法体；抽象方法必须包含 `abstract` 关键字并且可以包含访问修饰符

```ts
abstract class Department {
    constructor(public name: string) {
    }
    
    printName(): void {
        console.log('Department name: ' + this.name);
    }
    
    abstract printMeeting(): void;	// 必须在派生类中实现
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing');	// 在派生类的构造函数中必须调用super()
    }
    
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }
    
    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

// 允许创建一个对抽象类型的引用
let department: Department;
department = new Department();	// 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment();	// 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports();	// 错误: 方法在声明的抽象类中不存在
```

#### 7. 构造函数

1. 在 TypeScript 中声明一个类，实际会创建类的实例类型（`let greeter: greeter`）和一个构造函数（构造函数会在使用 `new` 创建类的实例的时候被调用；构造函数也包含了类的所有静态属性）
2. 因为类可以创建出类型，所以能够在允许使用接口的地方使用类（把类当做接口使用）