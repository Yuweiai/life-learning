## Passing parameters to routes（将参数传递给路由）

​	Remember when I said "more on that later when we talk about `params`!"? Well, the time has come.

> 还记得我之前说的 "稍后再谈 `params`" 吗？现在，正是时候。

​	Now that we know how to create a stack navigator with some routes and navigate between those routes, let's look at how we can pass data to routes when we navigate to them.

> 目前，我们已经知道了如何创建包含路由的堆栈导航器，并在这些路由之间进行导航。现在，让我们来看一下在进行导航时如何将数据传递给路由。

​	There are two pieces to this: 

    1. Pass params to a route by putting them in an object as a second parameter to the `navigation.navigate` function: `this.props.navigation.navigate('RouteName', { /* params go here */ })`
  2. Read the params in your screen component: `this.props.navigation.getParam(paramName, defaultValue)`

> 这分为两个部分：
>
> 	1. 将参数放入一个对象并将该对象作为 `navigation.navigate` 函数的第二个参数，由此将参数传递给路由：`this.props.navigation.navigate('RouteName', { /* params go here */ })`
>
>  	2. 直接获取屏幕组件中的参数：`this.props.navigation.getParam(paramName, defaultValue)`

   We recommend that the params you pass are JSON-serializable. That way, you'll be able to use  [state persistence](https://reactnavigation.org/docs/3.x/state-persistence) and your screen components will have the right contract for implementing [deep linking](https://reactnavigation.org/docs/3.x/deep-linking)..

> 我们建议：传递的参数是 JSON 可序列化的。这样，应用的状态得以维持，屏幕组件也实现了深度链接的正确约定。

```js
class HomeScreen extends Component {
    render() {
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('Dertails', {
                        itemId: 86,
                        otherParam: 'anything you want here'
                    })
                }}
			/>
    }
}

class DetailsScreen extends Component {
    render() {
        /* 2. Get the param, provide a fallback value if not available */
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherItem = navigation.getParam('otherParam', 'some deffault value');
        
        return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>Details Screen</Text>
				<Text>itemId: {JSON.stringify(itemId)}</Text>
				<Text>otherParam: {JSON.stringify(otherParam)}</Text>
				<Button
					title="Go to Details... again"
					onPress={() => this.props.navigation.push('Details', {
						itemID: Math.floor(Math.random() * 100)
					})}
				/>
				<Button
					title="Go to Home"
					onPress={() => this.props.navigation.navigate('Home')}
				/>
				<Button
					title="Go back"
					onPress={() => this.props.navigation.goBack()}
				/>
				<Button
					title="pop to top"
					onPress={() => this.props.navigation.popToTop()}
				/>
			</View>
		)
    }
}
```

​	<img src="../images/pic_four.jpg" style="zoom:25%;" />

<img src="../images/pic_five.jpg" style="zoom:25%;" />

​	You can also directly access the params object with `this.props.navigation.state.params`. This may be `null` if no params were supplied, and so it's usually easier to just use `getParam` so you don't have to deal with that case.

> 你可以通过 `this.props.navigation.state.params` 直接访问 `params` 对象——如果没有提供任何参数，这种方法获取的可能是 `null` 。通常来说，`getParams` 使用起来更容易，因为你不必处理这种情况。

​	If you want to access the params directly through props (eg. `this.props.itemId`) rather than `this.props.navigation.getParam`, you may use a community-develop `react-navigation-props-mapper` package.

> 如果你想直接通过 props（例如，`this.props.itemId` ）而不是通过`this.props.navigation.getParam` 来获取参数，你可以使用社区开发的 `react-native-props-mapper` 程序包

### Summary（总结）

- `navigate` and `push` accept an optional second argument to let you pass parameters to the route you are navigating to. For example: `this.props.navigation.navigate('RouteName', { paramName: 'value'})`
- You can read the params through `this.props.navigation.getParam`
- As an alternative to `getParam`, you may use `this.props.navigation.state.params`. It is `null` if no parameters are specified.

> 1. `navigate` 和 `push` 接收可选的第二个参数（argument），通过第二个参数（argument），可以将参数（parameters）传递给要导航到的路由。例如，`this.props.navigation.navigate('RouteName', { paramName: 'value'})`
>
> 2. 可以通过 `this.props.navigation.getParam` 来获取传递过来的路由参数
> 3. 也可以使用 `this.props.state.params` 作为 `getParam` 的替代方案——如果没有指定任何参数，则该替代方案的值为 `null`

