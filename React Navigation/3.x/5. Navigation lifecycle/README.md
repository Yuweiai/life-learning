## Navigation lifecycle（Navigation 生命周期）

​	In the  previous section, we worked with a stack navigator that has two screens (`Home` and `Details`) and learned how to use `this.props.navigation.navigate('RouteName')` to navigate between the routes.

> 在上一节，我们使用了一个包含两个屏幕（`Home` 和 `Details`）的堆栈导航器，并学习了如何使用`this.props.navigation.navigate('RouteName')` 实现在路由之间进行导航

​	An important question in this context is: what happens with `Home` when we navigate aways from it, or when we come back to it? How does a route find out that a user is leaving it or coming back to it?

> 在这种情况下，一个重要的问题是：当我们导航离开 `Home` 或者导航回到 `Home` 时它会发生什么？一个路由如何确定用户正在离开或是返回该路由呢？

​	Coming to react-navigation from the web, you may assume that when user navigates from route A to route B, A will unmount(its `componentWillUnmount` is called) and A will mount again when user comes back to it. While these React lifecycle methods are still valid and are used in react-navigation, their usage differs from the web. This is driven by more complex needs of mobile navigation.

> 对于 web 的 react-navigation 来说，你可以认为当用户从路由 A 导航到路由 B 时，A 将卸载（A 的 `componentWillUnmount` 会被调用）；用户返回到路由 A 时，A 将加载。然而，在 react-navigation 中，虽然这些 React 生命周期仍然有效，但它们的用法并不同于 web——这是由更复杂的移动导航需求驱动的

## Example scenario（示例场景）

​	Consider a stack navigator with screens A and B. After navigating to A, its `componentDidMount` is called. When pushing B, its `componentDidMount` is also called, but A remains mounted on the stack and its `componentWillUnmount` is therefor not called.

> 现有一个包含屏幕 A 和屏幕 B 的堆栈导航器。导航到 A 后，A 的 `componentDidMount` 将会被调用。在此情况下，再次 `push` B 时，B 的 `componentDidMount` 也会被调用。但是因为 A 仍然装载在堆栈中，**所以 A 的 `componentWillUnmount` 不会被调用**

​	When going back from B to A, `componentWillUnmount` of B is called, but `componentDidmount` of A is not because A remained mounted the whole time.

> 当从 B 返回到 A 时，B 的 `componentWillUnmount` 会被调用，**但是 A 的 `componentDidMount` 不会被调用**，因为 A 一直保持装载状态。

​	Similar results can be observed (in combination) with other navigators as well. Consider a tab navigator with two tabs, where each tab is a stack navigator:

> 与其他导航器（结合使用）也可以观察到类似的结果：现有一个有两个选项卡的选项卡导航器，其中每个选项卡都是堆栈导航器

```js
const HomeStack = createStackNavigator({
	Home: HomeScreen,
	Details: DetailsScreen,
})

const SettingStack = createStackNavigator({
	Settings: SettingScreen,
    Profile: ProfileScreen
})

const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Settings: SettingStack
})
```

​	We start on the `HomeScreen` and navigate to `DetailScreen`. Then we use the tab bar to switch to the `SettingScreen` and navigate to `ProfileScreen`. After this sequence of operations is done, all 4 of the screens are mounted! if you use the tab bar to switch back to the `HomeStack`, you'll notice you'll be presented with the `DetailsScreen` —— the navigation state of the `HomeStack` has been preserved!

> 我们从 `HomeScreen` 开始，然后导航到 `DetailsScreen`。然后，我们使用标签栏切换到 `settingScreen` 并导航到 `ProfileScreen`。完成这一系列操作后，这四个屏幕都装载了。此时如果通过标签栏切换回 `HomeStack`，则会看到 `DetailsScreen` —— 这意味着 `HomeStack` 的导航状态被保留了。

## React Navigation lifecycle events（React Navigation 生命周期事件）

​	Now that we understand how React lifecycle methods work in React Navigation, let's answer the question we asked at the beginning: "How do we find out that a user is leaving it or coming back to it?"

> 目前我们已经了解了 React 的生命周期方法在 React Navigation 是如何工作的，现在让我们来回答一开始我们问的问题：”我们如何知道用户是离开了（某一屏幕）还是回到了（某一屏幕）？“

​	React Navigation emits events to screen components that subscribe to them. There are four different events that you can subscribe to: `willFocus`, `willBlur`, `didFocus`, and `didBlur`. Reac more about them in the [API reference](https://reactnavigation.org/docs/3.x/navigation-prop#addlistener-subscribe-to-updates-to-navigation-lifecycle).

> React Navigation 会向订阅它们的屏幕组件发布事件。你可以订阅下列四个事件：`willFocus`, `willBlur`, `didFocus`, 和 `didBlur`。更多信息请参见 "API reference"

​	Many of your use cases may be covered with the [`withNavigationFocus` HOC](https://reactnavigation.org/docs/3.x/with-navigation-focus) or the [`<NavigationEvents />` component](https://reactnavigation.org/docs/3.x/navigation-events) whick are a little more straightforward to use.

> 你的许多用例可以包含 `withNavigationFocus` HOC 或者 `<NavigationEvents />`，它们使用起来更直接一些 

## Summary（总结）

- While React's lifecycle methods are still valid, React Navigation adds more lifecycle events that you can subscribe to through the `navigation` prop.
- You may also use the `withNavigationFocus` HOC or `<NavigationEvents />` component to react to lifecycle changes.

> 1. 尽管 React 的生命周期仍然有效，但是 React Navigation 添加了更多生命周期事件，你可以通过 `navigation` prop 来订阅他们
> 2. 你也可以使用 `withNavigationFocus` HOC or `<NavigationEvents />` 组件来对生命周期的更改做出反应