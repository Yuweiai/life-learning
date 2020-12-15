> **单例模式**：保证一个类仅有一个实例，并提供一个访问它的全局访问点，这样的模式就叫做单例模式

## 单例模式的实现思路

1. 一般情况下，当创建了一个类（本质是构造函数）后，可以通过 new 关键字调用构造函数进而生成**任意多的实例对象**：

   ```js
   class SingleDog {
       show() {
           console.log('我是一个单例对象')
       }
   }
   
   const s1 = new SingleDog()
   const s2 = new SingleDog()
   
   // false
   s1 === s2
   ```

   s1 和 s2 是相互独立的对象，各占一块内存空间。

2. 单例模式想要做到的是，**不管我们尝试去创建多少次，它都只返回第一次创建的那个唯一的一个实例**——要做到这一点，需要构造函数**具备判断自己是否已经创建过一个实例的能力**：

   ```js
   // 以下将是否已经创建过一个实例的判断逻辑写成一个静态方法(实际也可以直接写入构造函数的函数体)
   class SingleDog {
       show() {
           console.log('我是一个单例对象')
       }
       static getInstance() {
           // 判断是否已经new过1个实例
           if(!SingleDog.instance) {
               // 若这个唯一的实例不存在，那么先创建它
               SingleDog.instance = new SingleDog()
           }
           // 如果这个唯一的实例已经存在，则直接返回
           return SingleDog.instance
       }
   }
   
   const s1 = SingleDog.getInstance()
   const s2 = SingleDog.getInstance()
   
   // true
   s1 === s2
   ```

   ```js
   // 使用闭包来实现
   SingleDog.getInstance = (function() {
       // 定义自由变量instance，模拟私有变量
       let instance = null
       return function() {
           // 判断自由变量是否为null
           if(!instance) {
               // 如果为null则new出唯一实例
               instance = new SingleDog()
           }
           return instance
       }
   })()
   
   const s1 = SingleDog.getInstance()
   const s2 = SingleDog.getInstance()
   
   // true
   s1 === s2
   ```

## 生产实践：Vuex中的单例模式

> 1. 近年来，基于 Flux 架构的状态管理工具层出不穷，其中应用最广泛的要数 Redux 和 Vuex
> 2. 无论是 Redux 和 Vuex，都实现了一个全局的 Store 用于存储应用的所有状态——这个 Store 的实现，正是单例模式的典型应用

#### 理解 Vuex 中的 Store

1. Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态——该对象作为一个“唯一数据源（SSOT）”而存在——这也意味着，每个应用将仅仅包含一个 store 实例（一个 Vue 实例只能对应一个 Store，可参看下方代码：在项目中引入 Vuex）
2. 单一状态树让我们能够定为任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照

#### Vuex如何确保Store的唯一性

```js
// 安装vuex插件
Vue.use(Vuex)

// 将store注入到Vue实例中
new Vue({
    el: '#app',
    store
})
```

> 通过调用 `Vue.use()` 方法安装了 Vuex 插件，Vuex 插件是一个对象，其内部实现了一个 install 方法，该方法会在插件安装时被调用，从而把 Store 注入到 Vue 实例中去——**也就是说，每 install 一次，都会尝试给 Vue 实例注入一个 Store**

```js
let Vue // 这个Vue的作用与上文的instance作用一样
...

export function install(_Vue) {
    // 判断传入的Vue实例对象是否已经被install过Vuex插件(是否有了唯一的state)
    if(Vue && _Vue === Vue) {
        if(process.env.NODE_ENV !== 'production') {
           console.err('[vuex] already installed. Vue.use(Vuex) should be called only once.')
       }
       return
    }
    // 若没有，则为这个Vue实例对象install一个唯一的Vuex
    Vue = _vue
    // 将Vuex的初始化逻辑写进Vue的钩子函数里
    applyMixin(Vue)
}
```

> 以上即是 Vuex 源码中单例模式的实现办法，其套路与`getInstance`如出一辙——通过这种方式，可以保证一个 Vue 实例（即一个 Vue 应用）只会被 install 一次 Vuex 插件，所以每个 Vue 实例只会拥有一个全局的 Store

#### 小结

1. 如果在 install 中没有实现单例模式：

   ```js
   // 在主文件里安装Vuex
   Vue.use(Vuex)
   
   ...(中间添加/修改了一些store的数据)
   
   // 在后续的逻辑里不小心又安装了一次
   Vue.use(Vuex)
   ```

   失去了单例判断能力的 install 方法，会为当前的 Vue 实例重新注入一个新的 Store，**也就是说中间的那些数据操作全都没了，一切归0**——因此，单例模式在此处是非常必要的