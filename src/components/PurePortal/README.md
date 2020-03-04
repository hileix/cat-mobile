# PurePortal 纯传送门

## Example

```jsx
<PurePortal selector='body'>
  <div>children</div>
</PurePortal>
```

## API

|   属性   |       类型        | 默认值 |                       描述                        |
|:--------:|:-----------------:|:------:|:-------------------------------------------------:|
| children | `React.ReactNode` |   -    | children，即 ReactDOM.createPortal() 的第一个参数 |
| selector |     `string`      | `body` |                 容器的 css 选择器                 |
