## 先谈构造器模式

1. 公司员工信息录入系统——对象字面量

（1）变得是每个 user 的姓名、年龄、工种这些值——这是用户的个性

（2）不变的是每个员工都具备姓名、年龄、工种这些属性——这是用户的共性

[]()

```js
const liLei = {
    name: '李雷',
    age: 25,
    career: 'coder'
}
const hanMeiMei = {
    name: '韩梅梅',
    age: 24,
    career: 'product manager'
}
```

2. 公司员工录入系统——构造函数

```js
function User(name, age, career) {
    this.name = nage;
    this.age = age;
    this.career = career;
}
```

**构造器**：像 User 这样，当新建对象的内存被分配后，用来初始化该对象的特殊函数，就叫做构造器。

**构造器模式**：在 JavaScript 中，我们使用构造函数去初始化对象，就是应用了构造器模式。

> 1. 构造器将 name、age、career 赋值给对象的过程封装，确保了每个对象都具备这些属性，即确保了**共性**的不变，同时将 name、age、career 各自的取值操作开放，确保了**个性**的灵活。
> 2. 如果在使用构造器模式的时候，我们本质上是去**抽象了每个对象实例的变与不变**。那么使用工厂模式时，我们要做的就是去**抽象不同构造函数（类）之间的变与不变**。

## 简单工厂模式

（1）新增需求：不同工种分配职责说明——给每个工种的用户加上一个个性化的字段，来描述他们的工作内容（**员工的共性被拆离了**）

> 1. 从数据库拿到一条数据，都要人工判断一下该员工的工种，然后手动给其分配构造器吗？——这也是一个“变”

```js
function Coder(name , age) {
    this.name = name
    this.age = age
    this.career = 'coder' 
    this.work = ['写代码','写系分', '修Bug']
}
function ProductManager(name, age) {
    this.name = name 
    this.age = age
    this.career = 'product manager'
    this.work = ['订会议室', '写PRD', '催更']
}
```
> 2. 给上文人工判断员工工种的“变”交给函数去处理。整个公司上下有数十个工种，难道要手写数十个类、数十行 switch 吗？——我们对共性封装得不够彻底

```js
function Factory(name, age, career) {
    switch(career) {
        case 'coder':
            return new Coder(name, age) 
            break
        case 'product manager':
            return new ProductManager(name, age)
            break
        ...
}
```

> 3. coder 和 product manager 虽然是两个工种的员工，但都拥有 name、age、career、work 四个属性，这是其**共性**。它们的区别，在于每个字段取值的不同，以及 work 字段需要随 career 字段取值的不同而改变

```js
function User(name, age, career, work) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = work;
}

function Factory(name, age, career) {
    let work
    switch(career) {
        case 'coder':
            work =  ['写代码','写系分', '修Bug'] 
            break
        case 'product manager':
            work = ['订会议室', '写PRD', '催更']
            break
        case 'boss':
            work = ['喝茶', '看报', '见客户']
        case 'xxx':
            // 其它工种的职责分配
            ...
            
    return new User(name, age, career, work)
}
```

**工厂模式**：将创建对象的过程单独封装

> 工厂模式的目的，就是为了实现**无脑传参**，就是为了爽
> （1）有构造函数的地方，我们就应该想到简单工厂
>
> （2）写了大量构造函数、调用了大量的  new、自觉非常不爽的情况下，我们就应该思考是不是可以掏出工厂模式重构我们的代码了