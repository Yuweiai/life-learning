## Header buttons（标题按钮）

​	Now that we know  how to customize the look of the our headers, let's make them sentient! Actually perhaps that's ambitious, let's just make them able to respond to our touches in very defined ways.

> 到目前为止，我们知道了如何定制我们的标题的外观，现在让我们使标题可以感知到外部的世界！实际上，这种说法可能是一种热望，但至少我们能够以一种非常明确地方式让他们对我们的触摸做出回应。

### Adding a button to the header（给标题添加一个按钮）

The most common way to interact with a header is by tapping on a button either to the left or the right of the title. Let's add a button to the right side of the header (one of the most difficult places to touch on your entire screen, depending on finger and phone size, but also a normal place to put buttons)

> 与标题进行交互的最常见的方法是点击标题左侧或右侧的按钮。那么，就让我们在标题的右侧添加一个按钮（这是整个屏幕上最不易触摸的位置之一，具体取决于手指和手机的大小，但这也是放置按钮的常用位置）

```js
class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  };
}
```

​	The binding of `this` in `navigationOptions` is not the `HomeScreen` instance, so you can't call `setState` or any instance methods on it. This is pretty important because it's extremely common to want the buttons in your header to interact with the screen that the header belongs to. So, we will look how to do this next.

> `navigationOptions` 中的 `this` 绑定的并不是 `HomeScreen` 实例，所以你不能调用 `setState` 或者任何其她的实例方法。这非常重要，因为让标题中的按钮与标题所属的屏幕进行交互是非常普遍的。因此，接下来我们将考虑如何执行此操作。

​	Please note that a community-developed library for rendering buttons in the header with the correct styling is available: `react-navigation-header-buttons`.

> 注意：有一个社区开发的库——`react-navigation-header-buttons`，用于渲染标题中的不同样式的按钮

### Header interaction with its screen component（标题与屏幕组件的交互）

​	The most commonly used pattern for giving a header button access to a function on the component instance is to use `params`. We'll demonstrate this with a classic example, the counter.

> 让标题按钮能够访问组件实例上的函数的最常用的模式是使用 `params`。我们将通过一个典型的例子——计数器，来演示这一点。

```js
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color="#fff"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  /* later in the render function we display the count */
  {/* <Text>Count: {this.state.count}</Text> */}
}
```

​	React Navigation doesn't guarantee that your screen component will be mounted before the header. Because the `increaseCount` params is set in `componentDidMount`, we may not have it available to us in `navigationOptions`. This usually will not be a problem because `onPress` for `Button` and `Touchable` components will do nothing if the callback is null. If you have your own custom component here, you should make sure it behaves as expected with `null` for its press handler prop.

> React Navigation 并不保证屏幕组件先于标题装载。因为 `increaseCount` 参数在 `componentDidMount` 中被设置，因为我们可能在 `navigationOptions` 中无法使用它。这通常不会有问题，因为如果回调为 `null`，`<Button>` 的 `onPress` 和 `Touchable`组件都不会执行任何操作。当然，如果你使用自定义组件，则应确保该组件的触摸处理对于 `null` 也如预期一致

​	As an alternative to `setParams`, you could use a state management library (such as Redux or Mobx) and communicate between the header and the screen in the same way you would with two distinct components.

> 作为 `setParams` 的替代方案，你可以使用状态管理库（例如 Redux 或 Mobx）并在标题和屏幕之间进行通信，就像你使用两个不同的组件一样

### Customizing the back button（自定义返回按钮）

​	`createStackNavigator` provides the platform-specific defaults for the back button. On iOS this includes a label next to the button, which shows the title of the previous screen when the title fits in the available space, otherwise it says "Back".

> `createStackNavigator` 提供平台特定的默认的返回按钮。在 iOS 上，返回按钮旁边包括一个标签，当标题栏标题可用空间足够时，该标签会显示前一个屏幕的标题栏标签，否则显示 "Back"（返回）

​	You can change the label behavior with `headerBackTitle` and `headerTruncatedBackTitle`（[read more](https://reactnavigation.org/docs/3.x/stack-navigator#headerbacktitle)). To customize the back button image, you can use `headerBackImage`。

> 你可以使用 `headerBackTitle` 和 `headerTruncatedBackTitle` （更多信息）更改标签的表现行为。要自定义返回按钮图像，可以使用 `headerBackImage`

### Overriding the back button（重写返回按钮）

​	The back button will be rendered automatically in a stack navigator whenever it is possible for the user to go back from their current screen —— In other words, the back button will be rendered whenever there is more than one screen in the stack.

> 当用户可以从当前屏幕进行返回操作时，堆栈导航器的返回按钮会自动渲染 —— 换句话说，当堆栈中多于一个屏幕时，返回按钮会被渲染

​	Generally, this is what you want. But it's possible that in some circumstances that you want to customize the back button more than you can through the options mentioned above, in which case you can set the `headerLeft` options to a React Element that will be rendered, just as we did with `headerRight`. Alternatively, the `headerLeft` options also accepts a React Component, which can be used, for example, for overriding the onPress behavior of the back button. Read more about this in the [api reference](https://reactnavigation.org/docs/3.x/stack-navigator#headerleft).

> 通常，这就是你想要的的。但是在某些情况下，相比通过上述提及的可选项之外，你可能希望更多自定义返回按钮。在这种情况下，你可以将 `headerLeft` 选项设置为一个 React 元素，该元素会被渲染，就像我们对 `headerRight` 所执行的操作一样。另外，`headerLeft` 选项也可以接受一个 React 组件，举例来说，该组件可用于重写返回按钮的 `onPress` 行为。在 "api reference" 中阅读有关此内容的更多信息。

### Summary（总结）

- You can set buttons in the header through the `headerLeft` and `headerRight` properties in `navigationOptions`
- The back button is fully customizable with `headerLeft`, but if you just want to change the title or image, there are other `navigationOptions` for that —— `headerBackTitle`, `headerTruncatedBackTitle` and `headerBackImage`.

> 1. 你可以通过 `navigationOptions` 中的 `headerLeft` 和 `headerRight` 属性设置标题栏的按钮
> 2. 返回按钮可以通过 `headerLeft` 完全定制。但是如果你只是想改变标题或图片，还有其他的 `navigationOptions` 配置 —— `headerBackTitle`, `headerTruncatedBackTitle` 和 `headerBackImage`.