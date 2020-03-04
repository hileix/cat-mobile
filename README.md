# cat-mobile

喜马拉雅国际版移动端基础组件库


## 更新日志

[更新日志](./changelog.md)

## 安装

```shell
npm install @hife/cat-mobile
```

or

```shell
yarn add @hife/cat-mobile
```

## 使用

### 1 在入口中导入 `css` 文件

```js
// index.js
import '@hife/catui/styles/index.css';
```

### 2 使用组件

```jsx
import { Button } from '@hife/cat-mobile';

const App = () => {
  return <Button>Add</Button>;
};

export default App;
```

### 3 组件按需加载

- `yarn add babel-plugin-import -D` 下载 `babel-plugin-import` 插件
- 配置 `babel-plugin-import` 插件：

webpack.config.js

```js
/**
 * css name covert
 * 1 Button => button
 * 2 ElementSelect => element-select
 * @param {string} name 组件名称
 */
const cssNameConvert = function(name) {
  const len = name.length;
  let ret = '';
  for (let i = 0; i < len; i++) {
    const charCode = name.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      ret +=
        i === 0
          ? String.fromCharCode(charCode + 32)
          : `-${String.fromCharCode(charCode + 32)}`;
    } else {
      ret += name[i];
    }
  }
  return ret;
};

module.exprots = {
  module: {
    rules: [
      {
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              [
                'import',
                {
                  libraryName: '@hife/catui',
                  libraryDirectory: 'lib/components',
                  "camel2DashComponentName": false,
                  customStyleName: name => {
                    const newName = cssNameConvert(name);
                    return `@hife/catui/styles/${newName}.css`;
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
```

## 开发流程

[开发流程](./docs/开发流程.md)
