## 第4章：TypeScript 项目构成

> **为了使用 TypeScript 成功创建一个项目，需要李俊杰 TypeScript 项目组织中的各项功能**

### 4.1 编译上下文

> 1. 编译上下文可以用于给文件分组（告诉 TypeScript 哪些文件是有效的、哪些是无效的）—— 定义这种逻辑分组，一个比较好的方式是使用 tsconfig.json 文件
> 2. 除了有效文件所携带的信息外，编译上下文还包含**正在被使用的编译选项的信息**

#### 1. tsconfig.json

#### 2. 指定文件

### 4.2 声明空间

> 1. 在 TypeScript 中，存在两种声明空间：类型声明空间和变量声明空间

#### 1. 类型声明空间

1. 类型声明空间包含**用来当做类型注解的内容**，例如下面的类型声明：

   ```ts
   class Foo { }
   interface Bar { }
   type Bas = { }
   ```

2. 声明的类型（上述 Foo、Bar、Bas）可以作为类型注解使用：

   ```js
   let foo: Foo;
   let bar: Bar;
   let bas: Bas;
   ```

3. **尽管定义了 `interface Bar`，但并不能够把 `Bar` 作为一个变量来使用，因为它没有定义在<mark>变量声明空间</mark>中**

   ```ts
   interface Bar {};
   var bar = Bar; // ERROR: "cannot find name 'Bar'"
   ```

#### 2. 变量声明空间

1. 变量声明空间包含可**用作变量的内容**
2. 声明的变量只能在变量声明空间中使用，不能用作类型注解

### 4.3 模块

#### 1. 全局模块

#### 2. 文件模块