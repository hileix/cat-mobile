import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

/**
 * 获取需要增强功能组件的名称
 * @param {class} WrappedComponent 需要增强功能的组件
 */
export function getDisplayName<T = {}>(WrappedComponent: React.ComponentType<T>): string {
  return (
    WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'
  );
}

/**
 * 给容器组件添加静态属性和静态方法
 * @param {class} Container 容器组件
 * @param {class} WrappedComponent 需要增强功能的组件
 * @param {string} hocName 高阶组件名称
 */
export function argumentContainer<TProps>(
  Container: any,
  WrappedComponent: React.ComponentType<TProps>,
  hocName: string
) {
  // 添加静态属性
  Container.displayName = `${hocName}(${getDisplayName(WrappedComponent)})`;

  // 将 WrappedComponent 组件的静态方法 copy 至 Container 组件，类似 Object.assign() 方法
  return hoistStatics(Container, WrappedComponent);
}