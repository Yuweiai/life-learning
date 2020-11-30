## App containers（App 容器）

​	Containers are responsible for managing your app state and linking your top-level navigator to the app environment. On Android, the app container uses the Linking API to handle the back button. The container can also be configured to persist your navigation state. On web, you'd use different containers than React Native.

> 容器负责管理你的应用程序状态，并将顶层的导航器链接到应用程序环境。在 Android 上，应用程序容器使用了 `Linking API` 处理返回按钮。也可以将容器配置为保存你的导航的状态。在 web 上，你将使用与 React Native 不同的容器

​	Note: In v2 and earlier, the containers in React Navigation are automatically provided by the `create*Navigator`  functions. As of v3, you are required to use the container directly. In v3 we also renamed `createNavigationContainer` to `createAppContainer`

> 在 v2 和更早版本中，React Navigation 中的容器由 `create*Navigator` 函数自动提供。从 v3 开始，你需要直接使用容器。在 v3 中，我们还将 `createNavigtionContainer` 重命名为 `createAppContainer`

​	A quick example of `createAppContainer`:

> 关于 `createAppContainer` 的一个简单的例子：
>
> （现在 `AppContainer` 是 React 渲染的主要组件）

```js
import { createAppContainer, createStackNavigator } from 'react-navigation'
// you can also import from @react-navigation/native

const AppNavigator = crateStackNavigator(...);
                                         
const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
```

###  Props of `createAppContainer` on React Native（React Native 中的 `createAppContainer` props

```js
<AppContainer
	onNavigationStateChange={handleNavigationChange}
	uriPrefix="/app"
/>
```

`onNavigationStateChange(prevState, newState, action)`

​	Function that gets called every navigation state managed by the navigator changes. It receives the previous state, the new state of the navigation and the action that issued state change. By default it prints state changes to the console.

> 导航器管理的每个导航状态的更改都会调用一个函数。该函数接收之前的状态、导航的新状态和发出状态更改的动作。默认情况下，它将状态打印到控制台。

`uriPrefix`

​	The prefix of the URIs that the app might handle. This will be used when handling a [deep link](https://reactnavigation.org/docs/3.x/deep-linking) to extract the path passed to the router.

> 应用程序可能处理的 URI 的前缀。处理 "deep link" 时会提取传递到路由的路径，此时可以使用此方法。

### Calling Dispatch or Navigate on App Container（在 App 容器中调用 Dispatch 或 Navigate）

​	In case you want to dispatch actions on an app container, you can use a React `ref` to call the `dispatch` method on it:

> 如果要在应用程序容器上 dispatch actions（分派操作），可以使用 React 的 `ref` 对应用程序容器上的 `dispatch` 方法进行调用：

```js
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  someEvent() {
    // call navigate for AppNavigator here:
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: someRouteName })
      );
  }
  render() {
    return (
      <AppContainer
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}
```

### App Container on the web

​	On the web, you can use `createBrowserApp` and `handleServerRequest` to maintain the state of your top-level navigator.

> 在 web 上，你可以使用 `createBrowserApp` 和 `handleServerRequest` 来维护你的顶层导航器的状态