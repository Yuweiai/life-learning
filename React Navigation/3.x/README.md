React Navigation: https://reactnavigation.org/

- The only required configuration for a route is the `screen` component.（路由唯一需要的配置是 `screen` 组件

  ```js
  const AppNavigator = createStackNavigator({
      Home: {
          screen: HomeScreen
      }
  })
  ```

- Given that the only route configuration we have for `Home` is the screen component, we don't nedd to use the `{ screen: HomeScreen }` configuration format, we can use the screen component directly.（鉴于路由配置中的 `Home` 拥有唯一的屏幕组件，所以我们不需要使用 `{ screen: HomeScreen }` 配置格式，而可以直接使用屏幕组件）

  ```js
  const AppNavigator = createStackNavigator({
      Home: HomeScreen
  })
  ```

  ——PS1：此处只是简化了格式，由一个对象`{ screen: HomeScreen }`直接变成了一个组件`HomeScreen`）
  ——PS2：后文说屏幕组件时应该想到 `screen` 这个属性