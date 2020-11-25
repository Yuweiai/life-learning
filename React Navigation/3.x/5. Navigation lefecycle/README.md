## Navigation lifecycle（Navigation 生命周期）

​	In the  previous section, we worked with a stack navigator that has two screens (`Home` and `Details`) and learned how to use `this.props.navigation.navigate('RouteName')` to navigate between the routes.

> 在上一节，我们使用了一个包含两个屏幕（`Home` 和 `Details`）的堆栈导航器，并学习了如何使用`this.props.navigation.navigate('RouteName')` 实现在路由之间进行导航

​	An important question in this context is: what happens with `Home` when we navigate aways from it, or when we come back to it? How does a route find out that a user is leaving it or coming back to it?

> 在这种情况下，一个重要的问题是：当我们导航离开 `Home` 或者导航回到 `Home` 时它会发生什么？一个路由如何确定用户正在离开或是返回该路由呢？

​	Coming to react-navigation from the web, you may assume that when user navigates from route A to route B, A will unmount(its `componentWillUnmount` is called) and A will mount again when user comes back to it. While these React lifecycle methods are still valid and are used in react-navigation, their usage differs from the web. This is driven by more complex needs of mobile navigation.

> 对于 web 的 react-navigation 来说，你可以认为当用户从路由 A 导航到路由 B 时，A 将卸载（A 的 `componentWillUnmount` 会被调用）；用户返回到路由 A 时，A 将加载。然而，在 react-navigation 中，虽然这些 React 生命周期仍然有效，但它们的用法并不同于 web——这是由更复杂的移动导航需求驱动的

## Example scenario（示例场景）

​	Consider a stack navigator with screens A and B. After navigating to A, its `componentDidMount` is called. When pushing B, its `componentDidMount` is also called, but A remains mounted on the stack and its `componentWillUnmount` is therefor not called.

> 

​	When going back from B to A, `componentWillUnmount` of B is called, but `componentDidmount` of A is not because A remained mounted the whole time.

​	Similar results can be observed (in combination) with other navigators as well. Consider a tab navigator with two tabs, where each tab is a stack navigator:

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

## React