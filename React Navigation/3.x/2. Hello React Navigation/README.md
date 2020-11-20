## Hello React Navigation（你好，React Navigation）

​	In a web browser, you can link to different pages using an anchor (&lt;a&gt;) tag. When the user clicks on a link, the URL is pushed to the browser **history stack**. When the user presses the back button, the browser pops the item from the top of the history stack, so the active page is now the previously visited page. 

> 在 web 浏览器中，可以使用锚标记（&lt;a&gt;）链接到不同的页面。当用户点击该链接时，该链接对应的 URL 会被 push 到浏览器的历史记录堆栈中。当用户按下返回按钮时，对应的项目会从浏览器的历史记录堆栈中 pop 出来，此时浏览器的活动页面时以前访问过的页面。

​	React  Native doesn't have a built-in idea of a global history stack like a web browser does —— this is where React Navigation enters the story.

> React Native 不像 web 浏览强那样具有内置的全局历史记录堆栈的概念，这也正是 React Navigation 得以开始的原因。

​	React Navigation‘s **stack navigator** provides a way for your app to transition between screens and manage navigation history. If your app uses only one stack navigator then it is conceptually similar to how a web browser handlers navigation state - your app pushes and pops items from the **navigation stack** as users iteract with it, and this results in the user seeing different screens. 

> React Navigation 的堆栈导航器为应用程序提供了一种切换屏幕和管理导航历史记录的方式。如果应用只使用一个堆栈导航器，那么它在概念上类似于 web 浏览器处理导航状态的方式：在用户与应用进行交互时，应用从导航堆栈中 push 和 pop 对应的项目，通过这种方式可以让用户看到不同的屏幕。

​	A key difference between how this works in a web browser and in React Navigation is that React Navigation's stack navigator provides the gestures and animations that you would expect on Android and iOS when navigating between routes in the stack.

> 堆栈在 web 浏览器和 React  Navigation 中的工作方式的主要区别在于，React Navigation 的堆栈导航器为 Android 和 iOS 都提供了理想的路由切换手势和动画。

​	Let's start by demonstrating the most common navigator, `createStackNavigator`.

> 让我们从演示最常见的导航器 —— createStackNavigator 开始。

## Creating a stack navigator

​	`createStackNavigator` is **a function that returns a React component**. It takes **a route configuration object** and, optionally, **an options object** (we omit this below, for now). Because the `createStackNavigator` function returns a React component, we can export it directly from `App.js` to be used as our App's root component.

```js
// In App.js in a new project

import React, { Component } from 'react'
import {
    View,
    Text,
} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

class HomeScreen extends Component {
    render() {
        return (
        	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            	<Text>Home Screen</Text>
            </View>
        )
    }
}

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    }
})

export default createAppContainer(AppNavigator)
```

​	If you run this code, you will see a screen with an empth navigation bar and a white content area containing your `HomeScreen` component. The styles you see for the navigation bar and the content area are the default configuration for a stack navigator, we'll learn how to configure those later.