## 实现一个 Storage

#### 描述

> 1. 实现 Storage，使得该对象为单例，基于 localStorage 进行封装
> 2. 实现方法 setItem(key, value) 和 getItem(key)

#### 实现：静态方法版

```js
class Storage {
    static getInstance() {
        if(!Storage.instance) {
            Storage.instance = new Storage()
        }
        return Storage.instance
    }
    
    getItem(key) {
        return localStorage.getItem(key)
    }
    
    setItem(key, value) {
        return localStorage.setItem(key, value)
    }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1.setItem('name', '李雷')

// 都是'李雷'
storage1.getItem('name')
storage2.getItem('name')

// true
storage1 === storage2
```

#### 实现：闭包版

```js
function StorageBase() {
    StorageBase.prototype.getItem = function (key) {
        return localStorage.getItem(key)
    }
    
    StorageBase.prototype.setItem = function (key, value) {
        return localStorage.setItem(key, value)
    }
}

const Storage = (function () {
    let instance = null
    return function() {
        if(!instance) {
            instance = new StorageBase()
        }
        return instance
    }
})()

const storage1 = new Storage()
const storage2 = new Storage()

storage1.setItem('name', '李雷')

// 都是'李雷'
storage1.getItem('name')
storage2.getItem('name')

// true
storage1 === storage2
```

## 实现一个全局唯一的模态（Modal）框

```js
<style>
    #modal { ... }
</style>

<body>
    <button id="open">打开弹框</button>
	<button id="close">关闭弹框</button>
</body>

<script>
    const Modal = (function() {
        let modal = null
        if(!modal) {
            modal = document.createElement('div')
            modal.innerHTML = '我是一个全局唯一的Modal'
            modal.id = 'modal'
            modal.style.display = 'none'
            document.body.appendChild(modal)
        }
        return modal
    })()

	// 监听点击事件，未点击则不创建modal实例，避免不必要的内存占用
	document.getElementById('open').addEventListener('click', function() {
        const modal = new Modal()
        modal.style.display = 'clock'
    })

	document.getElementById('close').addEventListener('click', function() {
        const modal = new Modal()
        if(modal) {
            modal.style.display = 'none'
        }
    })
</script>
```

