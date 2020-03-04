import React from 'react';
import ReactDOM from 'react-dom';

interface NotificationContainerOptions {
  /**
   * 容器类名
   */
  className: string;
  /**
   * 动画时间
   */
  animateTime: number;
}

export interface ContainerMaps {
  [key: string]: { container: HTMLDivElement; };
}

/**
 * 通知类的组件容器类
 */
class NotificationContainer {
  constructor(options: NotificationContainerOptions) {
    this.options = options;
    const { className } = options;
    const container = document.querySelector(className);
    if (!container) {
      const div = document.createElement('div');
      div.className = className;
      document.body.appendChild(div);
    }
  }

  options: NotificationContainerOptions;

  container: HTMLDivElement;
  index = 0;

  containerMaps: ContainerMaps = {};

  createContainerId = () => {
    return ++this.index + '';
  };

  remove = (id: string, callback?: () => void) => {
    const containerObj = this.containerMaps[id];
    if (!containerObj) {
      return;
    }
    const { container } = containerObj;
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container);
      delete this.containerMaps[id];
      callback && callback();
    }, this.options.animateTime * 1000);
  };

  render(Component: any, props: any) {
    const div = document.createElement('div');

    const id = this.createContainerId();

    const cProps = {
      ...props,
      id
    };

    this.containerMaps[id] = { container: div };

    ReactDOM.render(<Component {...cProps} />, div);
  }
}

export default NotificationContainer;
