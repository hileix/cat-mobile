import React from 'react';
import { argumentContainer } from './utils';

export interface Options {
  /**
   * 容器的 className
   */
  className: string;
}

/**
 * 创建 notification 容器（若存在 className 对应的 容器，则不再创建容器）的高阶组件
 * @param WrappedComponent 
 */
const withCreateNotificationContainer = (
  options: Options
) => {
  return (WrappedComponent: any) => {
    class withCreateNotificationContainer extends React.Component<any, { didMount: boolean }> {
      state = {
        didMount: false
      }

      componentDidMount = () => {
        const container = document.querySelector(`.${options.className}`);
        if (!container) {
          const div = document.createElement('div');
          div.className = options.className;
          document.body.appendChild(div);
        }
        this.setState({ didMount: true });
      }

      render() {
        if (!this.state.didMount) {
          return null;
        }
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }
    return argumentContainer(
      withCreateNotificationContainer,
      WrappedComponent,
      'withCreateNotificationContainer'
    );
  }
};

export default withCreateNotificationContainer;
