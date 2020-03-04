import React from 'react';
import { getDisplayName, argumentContainer } from '../utils';
import withCreateNotificationContainer from '../withCreateNotificationContainer';
import PurePortal from '../../components/PurePortal';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

describe('hoc utils', () => {
  test('getDisplayName', () => {
    class A extends React.Component {
      static displayName = 'A';
      render() {
        return <div>A</div>
      }
    }
    class AWithoutDisplayName extends React.Component {
      render() {
        return <div>AWithoutDisplayName</div>
      }
    }

    expect(getDisplayName(A)).toBe('A');
    expect(getDisplayName(AWithoutDisplayName)).toBe('AWithoutDisplayName');
  });

  test('argumentContainer', () => {
    class Container extends React.Component {
      render() {
        return <div>Container</div>
      }
    }
    class WrappedComponent extends React.Component {
      static displayName = 'WrappedComponent';
      static defaultTypes = {
        foo: 'foo',
        bar: 'bar'
      }
      render() {
        return <div>WrappedComponent</div>
      }
    }

    argumentContainer(Container, WrappedComponent, 'withHoc');
    expect((Container as any).displayName).toBe('withHoc(WrappedComponent)');
    expect((Container as any).defaultTypes).toEqual({ foo: 'foo', bar: 'bar' });
  });
});

describe('withCreateNotificationContainer', () => {
  // reset dom
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('withCreateNotificationContainer', () => {
    interface ContentProps {
      selector: string;
    }

    class Content extends React.Component<ContentProps> {
      static displayName = 'Content';
      static propTypes = {
        selector: PropTypes.string,
      }
      static defaultProps = {
        selector: '.my-container'
      }

      render() {
        return (
          <PurePortal selector={this.props.selector}>
            <div>Content</div>
          </PurePortal>
        )
      }
    }
    const EnhancedContent1 = withCreateNotificationContainer({ className: 'my-container' })(Content);
    const EnhancedContent2 = withCreateNotificationContainer({ className: 'my-container' })(Content);

    // 1
    mount(
      <EnhancedContent1 selector='.my-container'></EnhancedContent1>
    );
    let containerDOMs = document.querySelectorAll('.my-container');
    let containerDOM = containerDOMs[0];

    expect(containerDOMs.length).toBe(1);
    expect(containerDOM.className).toBe('my-container');

    // 2
    mount(
      <EnhancedContent2 selector='.my-container'></EnhancedContent2>
    )
    containerDOMs = document.querySelectorAll('.my-container');
    containerDOM = containerDOMs[0];

    expect(containerDOMs.length).toBe(1);
    expect(containerDOM.className).toBe('my-container');
  });

});
