## 接口

> 1. ts 的核心原则之一是：对值所具有的结构进行类型检查（这也叫做**鸭式辩型**或**结构性子类型化**）
> 2. 在 ts 中，接口的作用就是**为这些类型命名和为你的代码或第三方代码定义契约**

#### 1. 接口初探

```ts
function printLabel(labelledObj: { label: string}) {
    console.log(labelledObj.label);
}

let myObj = {
    size: 10,
    label: "Size 10 Object"
};

printLabel(myObj)
```

> ​	类型检查器会查看 `pringLabel` 的调用：`pringLabel` 有一个参数，并要求这个对象参数<mark>至少</mark>有一个名为 `label` 类型为 `string` 的属性

```ts
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {
    size: 10,
    label: "Size 10 Object"
};

printLabel(myObj)
```

> 对象参数<mark>只能</mark>有一个名为 `label` 类型为 `string` 的属性

#### 2. 可选属性

> 1. 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号
>
> 2. 可选属性的好处：
>
>    （1）对可能存在的属性进行预定义
>
>    （2）可以补货引用了不存在的属性时的错误

#### 3. <mark>只读属性</mark>

> 1. 在属性名前用 `readonly` 指定只读属性：只能在刚刚创建时修改其值
> 2. ts 具有 `ReadonlyArray<T>` 类型，其与 `Array<T>` 类似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改

#### 4. `readonly` VS `const`

> 1. 最简单判断该用 `readonly` 还是 `const`：作为变量还是作为一个属性
>
>    （1）作为变量：`const`
>
>    （2）作为属性：`readonly`

#### 5. 额外的属性检查

#### 6. 函数类型

> 1. 接口能够描述 JS 中对象拥有的各种各样的外形
>
>    （1）除了描述带有属性的普通对象外，接口可以描述函数类型
>
>    （2）为了使用接口表示函数类型，需要给接口定义一个**调用签名**——就像是一个只有参数列表和返回值类型的函数定义；参数列表里的每个参数都需要名字和类型
>
>    （3）对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(source: string, subString: string) {
    let result = source.search(subString)
    return result > -1
}
```

