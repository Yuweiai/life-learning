## Supported React Native versions

​	Since `react-navigation@3.x` depends on the new `React.createContext` API, which was added in `react@16.3.x`, we require `react-native@^0.54.x`. Also, `react-navigation@3.x` needs `react-native-gesture-handler` to work, so you will need to make sure that the versionn of `react-native-gesture-handler` you are using matches your s`react-native` version.

> 由于`react-navigation@3.x` 基于 `react@16.3.x` 新增的 `React.createContext API`，所以我们需要`react-native@^0.54.x`。另外，`react-navigation@3.x` 也依赖`react-native-gesture-handler`，因此需要确保 `react-native-gesture-handler` 使用的版本与当前 `react-native` 版本匹配。

​	If you are using `react-native-screens`, you will need to be aware of its own supported `react-native` version too.

> 如果你正在使用 `react-native-screens`，你也需要知道它所被支持的 `react-native` 版本。

​	Pleast note that the statements above may not be correct for a particular `react-native` version. If you notice a version that is not working properly, fell free to either file an issue or correct it in this page.

> 请注意，以上声明可能不适用于某一特定的 `react-native` 版本，如果发现某个版本无法正常工作，请随时在提出 issue 或者更正它。 