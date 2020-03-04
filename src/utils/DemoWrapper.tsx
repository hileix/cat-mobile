import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CommonProps } from './commonInterface';

const demoWrapperStyle = {
  margin: '0 25px'
};

const titleStyle = {
  margin: '40px 0 16px',
  fontSize: 32,
  fontWeight: 600
};

const descStyle = {
  fontSize: 14,
  lineHeight: 1.6,
  marginBottom: 16,
  color: 'rgba(0, 0, 0, 0.66)'
};

const childrenStyle = {
  margin: 8
};

export interface DemoWrapperProps extends CommonProps {
  /**
   * demo 的标题
   */
  title?: React.ReactNode;
  /**
   * demo 的描述
   */
  desc?: React.ReactNode;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * demo wrapper
 */
class DemoWrapper extends React.PureComponent<DemoWrapperProps> {
  static propTypes = {
    title: PropTypes.node,
    desc: PropTypes.node,
    children: PropTypes.node
  };
  static defaultProps = {};

  constructor(props: DemoWrapperProps) {
    super(props);
  }

  render() {
    const { title, desc, children } = this.props;
    return (
      <div style={demoWrapperStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <p style={descStyle}>{desc}</p>
        <div style={childrenStyle}>{children}</div>
      </div>
    );
  }
}

export default DemoWrapper;
