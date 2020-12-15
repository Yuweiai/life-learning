> 装饰器模式（装饰者模式）：不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求

## 生活中的装饰器

水墨屏手机壳：**不会对手机原有的功能产生任何影响，仅仅是使手机具备一种新的能力**（多了块屏幕）

## 装饰器应用场景

#### 初始需求：

每个业务中的按钮在点击后都弹出 "您还未登陆哦" 的弹框：参看前文的单例模式实现全局唯一的Modal

```js
modal.innerHTML = '您还未登陆哦'
```

#### 二次需求：

在弹框关闭后把按钮的文案改为 "快去登陆"，同时把按钮置灰

```js
实现一: 找到按钮的 click 监听函数，手动往里面添加了文案修改 & 按钮置灰逻辑

问题: 
	1. 适用多业务场景
    2. 更复杂的需求变更
    3. 需要修改已有的函数体，违背 "开放封闭原则"
	4. 往函数体添加如此多逻辑，违背 "单一职责原则"
```

```js
实现二: 把按钮抽象成公共组件 Button

问题: 
	1. 不同业务必定有针对业务定制的不同 Button 组件，比如 MoreButton、BeginButton 等，所以仍然会遇到同样的困境
```

## 装饰器模式初相见

> 程序员说：“我不想努力了，我想开挂，”**于是便有了装饰器模式**

1. 任何人去做上述需求时，**根本不想去关心它现有的业务逻辑是什么样的**

   （1）要是按钮的旧逻辑是本人写的还好，理解成本不高；如果不是本人写的甚至是离职同事写的，则阅读难读无法预料

   （2）应该**只对按钮已有的功能做个拓展**，只去关心拓展出来的那部分新功能如何实现

2. 为了不被已有的业务逻辑干扰，当务之急就是将旧逻辑与新逻辑分离，**把旧逻辑抽出去**

#### ES 5 实现

   ```js
   // 将展示Modal的逻辑单独封装
   function openModal() {
       const modal = new Modal()
       modal.style.display = 'block'
   }
   
   // 按钮文案修改逻辑
   function changeButtonText() {
       const btn = document.getElementById('open')
       btn.innerText = '快去登陆'
   }
   
   // 按钮置灰逻辑
   function disableButton() {
       const btn = document.getElementById('open')
       btn.setAttribute("disabled", true)
   }
   
   // 新版本功能逻辑整合
   function changeButtonStatus() {
       changButtonText();
       disableButton()
   }
   
   document.getElementById('open').addEventListener('click', function() {
       openModal()
       changeButtonStatus()
   })
   ```

####    ES 6 实现

> 以下 ES 6 版本的实现把按钮实例传给了 Decorator，以便后续 Decorator 可以对它 <del>为所欲为</del> 进行逻辑的拓展

```js
// 定义打开按钮
class OpenButton {
    // 点击后展示弹框(旧点击逻辑)
	onClick() {
        const modal = new Modal()
        modal.style.display = 'block'
    }
}

// 定义按钮对应的装饰器
class Decorator {
    // 将按钮实例传入
    constructor(open_button) {
        this.open_button = open_button
    }
    
    onClick() {
        this.open_button.onClick()
        // 包装一层新逻辑
        this.changeButtonStatus()
    }
    
    changeButtonStatus() {
        this.changeButtonText()
        this.disableButton()
    }
    
    changeButtonText() {
        const btn = document.getElementById('open')
        btn.innerText = '快去登陆'
    }
    
    disableButton() {
        const btn =  document.getElementById('open')
        btn.setAttribute("disabled", true)
    }
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)

document.getElementById('open').addEventListener('click', function() {
    // openButton.onClick()
    // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
    decorator.onClick()
})
```

#### ES 7 实现（下节）

## 值得关注的细节

#### 单一职责原则

1. 设计原则并非是板上钉钉的教条——当逻辑粒度过小时，盲目拆分是会导致项目中存在过多的零碎的消防法

#### 前置知识：ES 7 中的装饰器（待续）

