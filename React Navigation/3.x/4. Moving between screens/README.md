## Moving between screens（在屏幕之间移动）

​	In the prvious section, "Hello React Navigation", we defined a stack navigator with two routes (`Home` and `Details`), but we didn't learn how to let a user navigate from `Home` to `Details` (although we did learn how to change the initial route in our code, but foring our users to clone our repository and change the route in our code in order to see another screens is arguably among the worst user experiences one could imagine).

​	If this was a web browser, we'd be able to write something like this:

```js
<a href="details.html">Go to Details</a>
```

​	Another way to write this would be:

```js
<a onClick={() => document.location.href = "details.html"}>Go to Details</a>
```

​		We'll do something similar to the latter, but rather than using a `document` global we'll use the `navigation` prop that is passed down to our screen components.

## Navigating to a new screen（导航到另一个屏幕）

```js
import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

class HomeScreen extends Component {
    render() {
        return (
        	<View>
            	<Text>Home Screen</Text>
            	<Button
            		title="Go to Details"
            		onPress={() => this.props.navigation.navigate('Details')}
            	/>
			</View>
        )
    }
}

// ...other code from the previous section
```

​	Let's break this down:

- `this.props.navigation`: the `navigation` props is passed in to every screen component in stack navigator (more about this later in "The navigation prop in deppth")

- `navigata('Details')`: we call the `navigate` function (on the `navigation` prop —— naming is hard!) with the name of the route that we'd like to move the user to.

  If we call `this.props.navigation.navigate` with a route name that we haven't defined on a stack navigator, nothing will happen. Said another way, we can only navigate to routes that have been defined on our stack navigator —— we cannot navigate to an arbitrary component.

> 
>

  	So we now have a stack with two routes: 1) the Home route; 2) the Details route. What would happen if we navigated to the Details route again, from the Details screen?

## Navigate to a route multiple times（多次导航到同一个路由）

## Going back（路由返回）

## Summary（总结）