## Getting Started（入门）

​	React Navigation is born from the React Native community's need for an extensible yet easy-to-use navigation solution entirely in JavaScript(so you can read and understand all of the source), on top of powerful native primitives.

> React  Navigation 源于 React Native 社区对（开发）一个完全以 JavaScript 编写的（因此你可以阅读和理解所有源代码）、功能强大且易于使用的导航方案的需求，**on top of powerful native primitives.**

​	Before you commit to using React Navigation for your project, you might want to read [anti-pitch](https://reactnavigation.org/docs/3.x/pitch)  —— it wiil help you to understand the tradeoffs that we have chosen along with the areas where we consider the library to be deficient currently.

> 在致力于为项目使用 React Navigation 之前，你可能需要阅读 anti-pitch —— 它可以帮助你了解我们选择的折衷方法，以及我们认为的当前的库的不足的地方

### What to expect（期望）

​	If you're already familiar with React Native then you'll be able to get moving with React  Navigation quickly! If not, you may want to read sections 1 to 4 (inclusive) of  [React Native Express](http://reactnativeexpress.com/) first, then come back here when you're done.

> 如果你已经熟悉了 React Native，那么你将很快就能够使用 React Navigation！如果你不熟悉，你可能需要阅读 React Native Express 的第 1 至 4 节（含），阅读完成后再回到这里。

​	What follows within the *Fundamentals* section of this documentation is a tour of the most important aspects of React Navigation. It should cover enought for you to know how to build your typical small mobile application, and give you the background that you need to dive deeper into the more advanced parts of React Navigation.

> 在本文档接下来的 "基础知识"  部分，我们将介绍 React Navigation 最重要的几个方面。它应该足以让你知道如何构建典型的小型移动应用程序，并为你提供深入研究 React Navigation 更高级部分所需的背景知识。

### Installation（安装）

（1）Install the `react-navigation`  package in your React Native project.

> 将 `react-navigation` 包安装进你的 React Native 项目中

1. npm：`npm install react-navigation`
2. yarn：`yarn add react-navigation`

（2）Next, install`react-native-gesture-handler` and `react-native-reanimated`**（读者：实际项目中，不安装`react-native-reanimated`似乎也不会报错）**. If you're using Expo, to ensure that you get the compatible versions of the libraries you should run:

1. `expo install react-native-gesture-handler react-native-reanimated`

> 接下来，安装`react-native-gesture-handler` and `react-native-reanimated`。如果使用的是 Expo，确保你运行的兼容的库版本

（3）Otherwise, just use yarn or npm directly:

> 否则（如果使用的不是 Expo），直接使用 yarn 或 npm 即可

1. npm: `npm install react-native-gesture-handler react-native-reanimated`
2. yarn: `yarn add react-native-gesture-handler react-native-reanimated`

（4）Next, if your are not using the Expo managed workflow then you need to link these libraries if you haven't already. The steps  depends on your React Native version:

> 接下来，如果你没有使用 Expo 管理工作流，那么你需要对这两个库进行链接（如果你还没有链接）。链接的步骤取决于 React Native 的版本：

1. React Native 0.60 and higher: On newer versions of React Native, [linking is automatic](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md).
>  React 0.60 及更高版本：在 React Native 的较新版本中，**链接是自动的**。

   ——On iOS, to complete the linking, make sure you have Cocoapods installed. The run:

> 在 iOS 上，要完成链接，需要确保安装了 Cocoapods，然后运行：

   ```js
cd ios
pod install
cd ..
   ```

   ——On Android, it shouldn't need any more steps. But if you get errors regarding Android Support library during building the app, you need to install and configure [jetifier](https://github.com/mikehardy/jetifier).

> 在 Android 上，不需要任何其他步骤。但是，如果在构建应用程序时遇到有关 Android 支持库的错误，则需要安装和配置 jetifier。

2. React Native 0.59 and lower：If you're on an older React Native version, you need to manually link the dependencies. To do that, run: 

> React 0.59 及更低版本：如果你使用的是 React Native 的较旧版本，则需要手动链接依赖库（dependencies）。为此，需要运行：
>

   ```js
   react-native link react-native-reanimated
   react-native link react-native-gesture-handler
   ```

   ——To finalize installation of `react-native-gesture-handler` for Android, be sure to make the necessary modifications to `MainActivity.java`:

> 对于安卓来说，要完成`react-native-gesture-handler`的安装，请务必对`MainActivity.java`进行必要的修改

   ```java
   package com.reactnavigation.example;
   
   import com.facebook.react.ReactActivity;
   + import com.facebook.react.ReactActivityDelegate;
   + import com.facebook.react.ReactRootView;
   + import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
   
   public class MainActivity extends ReactActivity {
   
     @Override
     protected String getMainComponentName() {
       return "Example";
     }
   
   +  @Override
   +  protected ReactActivityDelegate createReactActivityDelegate() {
   +    return new ReactActivityDelegate(this, getMainComponentName()) {
   +      @Override
   +      protected ReactRootView createRootView() {
   +       return new RNGestureHandlerEnabledRootView(MainActivity.this);
   +      }
   +    };
   +  }
   }
   ```

   Finally, run `react-native run-android` or `react-native run-ios` to launch the app on your devices/simulator.

> 最后，运行 `react-native run-android` 或者 `react-native run-ios`以启动设备或者模拟器中的应用

### Hybrid iOS Application (Skip for RN only projects)：混合iOS应用程序（只有 RN 的项目请忽略）

​	If you're using React Navigation within a hybrid app - an iOS app that has both Swift/ObjC and React Native parts - you may be missing the `RTCLinkingIOS` subspec in your Podfile, which is installed by default in new RN projects. To add this, ensure your Podfile looks like the following: 

> 如果你在混合应用程序（同时具有 Swift/ObjC 和 React Native 的 iOS 应用程序）中使用 React Navigation，你可能会在你的Podfile 中丢失 `RTCLinkingIOS` **subspec**，该 subspec 默认安装在新 RN 项目中。要添加此内容，请确保 Podfile 如下所示：

```
 pod 'React', :path => '../node_modules/react-native', :subspecs => [
    . . . // other subspecs
    'RCTLinkingIOS',
    . . .
  ]
```

​	You're good to go! Continue to "Hello React Navigation" to start writing some code.

> 你可以继续阅读下面的文章了。接下来请继续 "Hello React Navigation" 章节，并开始编写一些代码。