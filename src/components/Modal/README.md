# Modal 对话框

## Example

```tsx
<Modal
  title='title'
  visible={visible}
  footer={footer}
  onClose={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setVisible(false)}
>
  <p>
    content
  </p>
</Modal>
```

## API
|      属性      |         类型          |  默认值   |         描述         | 是否必填 |
| :------------: | :-------------------: | :-------: | :------------------: | :------: |
|     prefix     |       `string`        |   `cat`   |       类名前缀       |    -     |
|   className    |       `string`        |     -     |         类名         |    -     |
|     style      | `React.CSSProperties` |     -     |       行内样式       |    -     |
|     title      |   `React.ReactNode`   |     -     |         标题         |    -     |
|    visible     |       `boolean`       |  `false`  |    Modal 是否可见    |    -     |
|     width      |   `number` `string`   |   `428`   |      Modal 宽度      |    -     |
|    children    |   `React.ReactNode`   |     -     |    Modal 中的内容    |    -     |
|     okText     |   `React.ReactNode`   | `Confirm` |     确认按钮文案     |    -     |
|   cancelText   |   `React.ReactNode`   | `Cancel`  |     取消按钮文案     |    -     |
|  onCloseIcon   |       `boolean`       |  `false`  |     不要关闭按钮     |    -     |
|     footer     |   `React.ReactNode`   |     -     |    自定义 footer     |    -     |
|      onOk      |     `(e) => void`     |     -     |  点击确定按钮的回调  |    -     |
|    onClose     |     `(e) => void`     |     -     |    关闭操作的回调    |    -     |
| destroyOnClose |       `boolean`       |  `false`  | 关闭时是否销毁子元素 |    -     |
|      mask      |       `boolean`       |  `true`   |     是否显示遮罩     |    -     |
