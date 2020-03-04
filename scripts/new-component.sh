#!/bin/bash

set -e

input=$1
lowerInput=$(echo $input | tr "[A-Z]" "[a-z]")

mkdir src/components/${input}
mkdir src/components/${input}/__test__
mkdir src/components/${input}/stories

touch src/components/${input}/index.ts
touch src/components/${input}/${input}.tsx
touch src/components/${input}/README.md
touch src/components/${input}/__test__/index.test.tsx
touch src/components/${input}/stories/${input}.stories.tsx
touch src/components/${input}/stories/style.scss
touch src/styles/${lowerInput}.scss

# 导入${input}/${input}.tsx默认模块
echo "import * as React from 'react'
import { Component } from 'react'
import classNames from 'classnames'

export interface ${input}Props {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: object;
}

/**
 * ${input}
 */
class ${input} extends Component<${input}Props, any> {

  render() {
    const { children, ...restProps } = this.props

    return (
      <${input}
        {...restProps}
      >
        {children}
      </${input}>
    )
  }
}

export default ${input}" >> src/components/${input}/${input}.tsx

# 导入${input}/index.ts默认模块
echo "import ${input} from './${input}'

export default ${input}" >> src/components/${input}/index.ts

# 导入${input}/README.md默认模块
echo "Example

\`\`\`jsx
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (<div className='${lowerInput}-box'>
      <${input}>
        test
      </${input}>

      <style>
        {\`
          .${lowerInput}-box {
            padding: 5px;
          }
        \`}
      </style>
    </div>
    )
  }
}

<Example />
\`\`\`" >> src/components/${input}/README.md


# 导入${input}/__test__/index.test.tsx默认模块
echo "import React from 'react'
import { render, mount } from 'enzyme'
import ${input} from '../index'

describe('${input}', () => {
  test('renders correctly', () => {
    const wrapper = render(
      <${input}>Test</${input}>
    )
    expect(wrapper).toMatchSnapshot()
  })

})" >> src/components/${input}/__test__/index.test.tsx

# 导入${input}/stories/${input}.stories.tsx默认模块
echo "import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ${input} from '../${input}';
import '../../../styles/index.scss';
import './style.scss';

storiesOf('${input}', module)
  .add(
    'something',
    () => (
      <div>
        <${input}>
        </${input}>
      </div>
    )
  )" >> src/components/${input}/stories/${input}.stories.tsx

echo -e "\033[32m \n新建组件成功: ${input}\n \033[0m"

# 导入src/components/index.ts默认模块
echo "export { default as ${input} } from './${input}'" >> src/components/index.ts

# 导入src/styles/index.ts默认模块
echo "@import './${lowerInput}.scss';" >> src/styles/index.scss

