## 序

> 1. React 是目前前端工程化最前沿的技术
> 2. 2004 年 Gmail 的推出，让大家猛然发现，**单页应用**的互动也可以如此流畅
>    2010 年，前端**单页应用框架**接踵而至——Backbone、Knockout、Angular 各领风骚
>    2013 年，React 横空出世，独树一帜：单向绑定、声名式 UI，大大简化了大型应用的构建——毋庸置疑，React 已经是前端社区里程碑式的技术
> 3. React 之所以流行，**在于它平衡了函数式编程的约束与工程师的实用主义**
>    （1）React 从函数式编程社区中借鉴了许多约定：把 DOM 当成纯函数，不仅免去了繁琐的手动 DOM 操作，还开启了**多平台渲染**的美丽新世界
>    （2）React 社区进一步强调不可变性（immutability）和单向数据流
>                ——这几个约定，将原本很复杂的程序化简，加强了程序的**可预测性**
>    （3）不强迫工程师只用函数式，而是提供了简单粗暴的手段，方便实现各种功能——项直接操作 DOM 也可以，想双向绑定也没问题。
>                ——Facebook 黑客之道：**Done is better than perfect.**（比完美更重要的是完成）

## 前言

> 1. 整个互联网应用经历了从**轻客户端**到**富客户端**的变化，前端
>    ——应用的规模越来越大
>    ——交互越来越复杂
> 2. 在近几年，前端工程用简单的方法库已经不能维系应用的复杂度，需要使用一种框架的思想去构建应用：因此，我们看到 MVC、MVVM 这些 B/S 或 C/S 中常见的**分层模型**都出现在前端开发的过程汇总——与其说不断在创建，还不如说**前端在学习应用端积累下来的浑厚体系**（待）
> 3. 从表现上看，**React 被大部分人理解成 View 库**。然而，从它的功能上看，它**远远复杂于 View 的承载**
> 4. 从官方描述上看，创造 React 是为了构建随着时间数据不断变化的大规模应用程序
> 5. 在未来，React 必然不过是一块小石头沉入水底，但它溅起的涟漪影响了无数的前端开发的思维，影响了无数应用的构建。对于它来说，这些就是它的成就——**成就 JavaScript 的繁荣，成就前端标准更快地推进**

## 本书目的

> 1. 希望从实践起步，以深刻的角度去解读 React 这个库给前端界带来的革命性变化
> 2. 本书除了详细阐述基本概念外，还会帮助从了解 React 到熟悉其原理，从探索 Flux 应用架构的思想到精通 Redux 应用架构，帮助思考 React 给前端界带来的价值——**React 今天是一种思想**，希望通过解读它，能够让读者有自学的能力

## 第 1 章：初入 React 世界

#### 1.1 React 简介

> 1. React 是 Facebook 在 2013 年开源在 GitHub 上的 JavaScript 库
> 2. React 把用户界面抽象成一个个组件——开发者通过组合这些组件，最终得到功能丰富、可交互的页面——正是组件这层抽象，让 React 把代码和真实渲染目标隔离开来，除了可以在浏览器端渲染到 DOM 来开发网页外，还能用于开发原生移动应用
> 3. React 通过引入 JSX语法，使得复用组件变得非常容易，同时也能保证组件结构清晰

##### 1.1.1 专注视图层

> 1. 和 Angular、Ember 等框架不同，React 并不是完整的 MVC/MVVM 框架，它专注于提供清晰、简洁的 View（视图）层解决方案
> 2. 又与模板引擎不同，React 不仅专注于解决 View 层的问题，又是一个包括 View 和 Controller 的库
> 3. React 不像其他框架那样提供了许多复杂的概念与繁琐的 API，它
>    ——以 **Minimal APIInterface** 为目标，只提供组件化相关的非常少量的 API
>    ——同时为了保持灵活性，并没有自创一套规则，而是尽可能地让用户使用原生 JavaScript 进行开发（只要熟悉原生 JavaScript 并了解重要概念后，就可以很容易上手 React 应用开发）

##### 1.1.2 Virtual DOM

> 1. 真实页面对应一个 DOM 树——DOM 操作非常昂贵，前端开发中性能消耗最大的就是 DOM 操作，而且这部分代码会让整体项目变得难以维护
>
> 2. React 把真实 DOM 转换成 JavaScript 对象树，也就是 Virtual DOM
>
> 3. 传统 DOM 开发模式：每次需要更新页面时，都要手动操作 DOM 来进行更新
>    Virtual DOM 开发模式：每次数据更新后，重新计算 Virtual DOM，并和上一次生成的 Virtual DOM 做对比，对发生变化的部分做批量更新——React 也提供了直观的 shouldComponentUpdate 生命周期回调，来减少数据变化后不必要的 Virtual DOM 对比过程，以保证性能
>
> 4. Virtual DOM 提升了 React 的性能，但这并不是 React 的唯一亮点。而且，Virtual DOM 的渲染方式相比传统 DOM 的操作性优势并不明显，因为对比 DOM 节点也是需要计算资源的
>
> 5. Virtual DOM 最大的喊出在于方便和其他平台集成——比如 react-native 是基于 Virtual DOM 渲染出原生控件，在输出的时候，是输出 Web DOM，还是 Android 控件，或者是 iOS 控件，就由平台本身决定了
>
>    ##### ——react-native 因此也有一个口号：Learn Once，Write Anywhere

##### 1.1.3 函数式编程

> 1. 在过去，工业界的编程方式一直以**命令式编程**为主——命令式编程就像是在给电脑下命令，解决的是做什么的问题
> 2. **函数式编程**，对应的是**声明式编程**，它是人类模仿自己逻辑思考方式发明出来的——**声名式编程的本质是 lambda 演算**
>    当需要操作数组的每个元素并返回一个新数组时：
>        ——如果是计算机的思考方式：需要一个新数组，然后便利该数组，并计算赋值
>        ——如果是人的思考方式：需要构建一个规则，即构建一个 f 函数作用在该数组上，然后返回新数组——**这样，计算可以被重复利用**
> 3. React 能充分利用很多函数式方法去减少冗余代码——此外，由于它本身就是简单函数，所以易于测试——可以说，**函数式编程才是 React 的精髓**（读者注：组件？）

#### 1.2 JSX 语法

##### 1.2.1 JSX 的由来

> 1. React 为方便 View（视图）层组件化，承载了**构建HTML 结构化页面的职责**
>    ——从这点上看，React 与 其他 JavaScript 模板语言有着许多异曲同工之处
>    ——不同之处：React 是通过创建与更新虚拟元素（virtual element）来管理整个 Virtual DOM 的
>
> 2. 虚拟元素可以理解为真实元素的对应，**虚拟元素的构建与更新都是在内存中完成的，并不会真正渲染到 DOM 中去**
>
> 3. React 中创建的虚拟元素可以分为：
>    ——DOM 元素（DOM element）：对应原生 DOM 元素
>    ——组件元素（component element）：对应自定义元素
>
> 4. JSX 与创建元素的过程有着莫大的关联：
>    ——原生 DOM 元素（包括了**元素的类型和属性**）：
>
>    ```js
>    <button class="btn btn-blue">
>        <em>Confirm</em>
>    </button>
>    ```
>
>    ——转换成 JSON 对象（同样可以包括元素的类型和属性）：只是不可变的描述对象
>
>    ```js
>    {
>        type: 'button',
>        props: {
>            className: 'btn btn-blue',
>            children: [
>                {
>                    type: 'em',
>                    props: {
>                        children: 'Confirm'
>                    }
>                }
>            ]
>        }
>    }
>    ```
>
>    ——组件元素（原生 DOM 元素的方法封装）：方法名对应 DOM 元素类型，参数对应 DOM 元素属性
>
>    ```js
>    const Button = ({color, text}) => {
>        return {
>            type: 'button',
>            props: {
>                className: `btn btn-${color}`,
>                children: [
>                    {
>                        type: 'em',
>                        props: {
>                            children: text
>                        }
>                    }
>                ]
>            }
>        }
>    }
>    ```
>
>    ——组件元素对原生 DOM 元素的进一步描述
>
>    ```js
>    {
>        type: 'Button',
>        props: {
>            color: 'blue',
>            children: 'Confirm'
>    }  
>    ```
>
>    ——React 组件：层层封装的组件元素
>
>    ```js
>    // 1
>    <Button color="red">delete<Button>  =>  <DangerButton>delete</DangerButton>
>
>    // 2
>    const DeleteAccount = () => (
>    	<div>
>        	<p>Are you sure?</p>
>        	<DangerButton>Confirm</DangerButton>
>        	<Button color="blue">Cancel</Button>
>        </div>
>    );
>    ```
>    
> 5. JSX 将 HTML 语法直接加入到 JavaScript 代码汇总，再通过翻译器转换到纯 JavaScript 后由浏览器执行
>    ——实际开发中，JSX 在产品打包阶段都已经编译成纯 JavaScript，不会带来任何副作用，反而会让代码更加直观并易于维护
>    ——尽管 JSX 是第三方标准，但适用于任何一套框架
>
> 6. React 官方在早期为 JSX 语法解析开发了一套编译器 JSTransform，目前已经不再维护，而是全部采用 Babel 的 JSX 编译器实现——Babel 作为专门的 JavaScript 语法编译工具，提供了更为强大的功能，达到了 "一处配置，统一运行" 的目的
>    ——Babel 转译：
>
>    ```js
>    var DeleteAccount = function DeleteAccount() {
>    	return React.createElement(
>        	'div',
>            null,
>            // p
>            React.createElement(
>           		'p',
>                null,
>                'Are you sure?'
>            ),
>            // DangerButton——此处DangerButton又会进行一次Babel转译
>            React.createElement(
>            	DangerButton,
>                null,
>                'Confirm'
>            ),
>            // Button
>            React.createElement(
>            	Button,
>                { color: 'blue' },
>                'Cancel'
>            )
>        );
>    };
>    ```
>
> 7. **等到依赖的组件元素不再出现组件元素，就可以将完整的 DOM 树构建出来了**
>
> 8. JSX 并非必需，但应该是首选的
>    ——非必需：JSX 只是 React.createElement(component, props, ...children) 的语法糖，所有 JSX 语法最终都会被转换为这个方法的调用
>    ——首选：使用 JSX 语法创建界面元素更加清晰简洁，能提供良好的编程体验

##### 1.2.2 JSX 基本语法

> 1. JSX 官方定义：类 XML 语法的 ECMAScript 扩展——JavaScript 自带语法和特性 + HTML 语法  =>  虚拟元素
> 2. JSX 基本语法基本被 XML 囊括了，但也有少许不同之处

###### 1. XML 基本语法

```js
const List = () => (
	<div>
    	<Title>This is title</Title>
    	<ul>
    		<li>list item</li>
    		<li>list item</li>
    		<li>list item</li>
    	</ul>
    </div>
);
```

> 1. 定义标签时，只允许被一个标签包裹——**一个标签会被转译成对应的 React.createElement 调用方法，最外层没有被包裹，显然无法转译成方法调用**——JSX 只是 React.createElement(component, props, ...children) 的语法糖
> 2. 标签一定要闭合
>    ——所有标签（比如 `<div></div>`、`<p></p>`）都必须闭合，否则无法编译通过
>    ——HTML 中自闭合的标签（如 `<img>`）在 JSX 中也遵循必须闭合的规则
>    ——自定义标签可以根据是否有子组件或文本来决定闭合方式

###### 2. 元素类型

> 1. 在 JSX 中，DOM 元素和组件元素通过标签是否为小写字母来区分
>
> 2. JSX 还可以通过命名空间的方式使用组件元素
>    （1）以解决组件相同名称冲突的问题
>    （2）或是对一组组件进行归类
>    使用 Material UI 组件库中的组件，以 MUI 为包名：
>
>    ```js
>    const App = () => {
>        <MUI.RaiseButton label="Default" />
>    }
>    ```

###### 3. 元素属性

> 1. DOM 元素的属性：标准规范属性
>    ——两个例外：class  =>  className    for  =>  htmlFor
>
> 2. 组件元素的属性：完全自定义的属性（可以理解为实现组件所需要的的参数）
>    ——自定义属性为**小驼峰写法**
>
>    ——JSX 特有的属性表达：
>    （1）Boolean 属性：**省略 Boolean 属性值**会导致 JSX 认为 bool 值设为了 true；要传 false 时，必须使用属性表达式
>
>    （2）展开属性：
>
>    ```js
>    // 常规属性
>    const component = <Component name={name} value={value} />
>        
>    // 展开属性
>    const data = { name: 'foo', value:'bar' }
>    const component = <Component {...data} />
>    ```
>
> 3. 在 JSX 中往 DOM 元素传入自定义属性，React 不会渲染
>    要使用 **HTML 自定义属性**，要使用 data- 前缀（与 HTML 标准是一致的）
>    在自定义标签中，任意的属性都是支持的（即使是 aria- 开头的**网络无障碍属性**）

###### 4. JavaScript 属性表达式

> 1. 属性值要使用表达式，只要用 {} 替换 "" 即可：
>
>    ```js
>    // 输入(JSX)
>    const person = <Person name={window.isLoggedIN ? window.name : ''} />;
>    
>    // 输出(JavaScript)
>    const person = React.createElement(
>    	Person,
>        {name: window.isLoggedIn ? window.name : ''}
>    );
>    ```

###### 5. HTML  转义（待验证）

> 1. React 会将所有要显示到 DOM 的字符串转义，防止 **XSS**
>    ——如果 JSX 中含有转义后的实体字符，比如`&copy;` （&copy; ），则最后 DOM 不会正确显示，因为 React 自动把 `&copy;` 中的特殊字符转义了。有几种解决方法：
>    （1）直接使用 UTF-8 字符 &copy;
>    （2）使用对应字符的 Unicode 编码查询编码
>    （3）使用数组组装`<div>{ ['cc ', <span>&copy;</span>, ' 2015'] }</div>`
>    （4）直接插入原始的 HTML
>    （5）使用 React 提供的 dangerouslySetInnerHTML 属性（避免转义字符）

#### 1.3 React 组件

> 1. React 诞生之前，前端界对于组件的封装实现一直都处在摸索和实践的阶段

##### 1.3.1 组件的演变

> 1. MV* 架构出现之前，组件主要分为两种：
>    （1）狭义上的组件（UI 组件）：比如 Tabs 组件、DropDown 组件，这类组件主要围绕在交互动作上的抽象，针对这些交互动作，利用 JavaScript 操作 DOM 结构或 style 样式来控制
>    （2）广义上的组件：带有业务含义和数据的 UI 组件组合，这类组件不仅有交互动作，更重要的是有数据与界面的交互
>            ——然而，广义上的组件往往有较大的争议。在规模较大的场景下，我们更倾向于采用分层的思想去处理

##### 1.3.2 React 组件的构建