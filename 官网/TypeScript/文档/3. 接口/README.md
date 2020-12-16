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