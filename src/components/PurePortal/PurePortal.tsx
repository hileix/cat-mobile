import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export interface PurePortalProps {
  /**
   * children，即 ReactDOM.createPortal() 的第一个参数
   */
  children?: React.ReactNode;
  /**
   * 作为容器的 css 选择器（或 dom 元素）
   */
  selector: string | HTMLElement;
  /**
   * unmount 时的回调
   */
  onUnmount?: () => void;
}

/**
 * RaectDOM.createPortal() 的组件化形式
 */
class PurePortal extends React.Component<PurePortalProps> {
  static propTypes = {
    children: PropTypes.node,
    selector: PropTypes.oneOfType([PropTypes.string, PropTypes.object,]),
    render: PropTypes.func,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func
  };
  static defaultProps = {
    selector: 'body'
  };

  private container: Element | null;

  componentDidMount = () => {
    this.getContainer();
  };

  componentDidUpdate = (prevProps: PurePortalProps) => {
    if (prevProps.selector !== this.props.selector) {
      this.getContainer();
    }
  };

  componentWillUnmount = () => {
    const { onUnmount } = this.props;
    this.container = null;
    onUnmount && onUnmount();
  };

  getContainer = (): void => {
    const { selector } = this.props;
    let container;

    if (selector instanceof HTMLElement) {
      container = selector;
    } else {
      container = document.querySelector(selector);
    }

    if (!container) {
      container = document.body;
    }
    this.container = container;
    this.forceUpdate();
  };

  render(): React.ReactPortal | null {
    if (!this.container) {
      return null;
    }


    return ReactDOM.createPortal(this.props.children, this.container);
  }
}

export default PurePortal;
