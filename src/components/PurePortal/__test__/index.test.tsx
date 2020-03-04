import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import PurePortal from '../index';

describe('PurePortal', () => {
  // reset dom
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renders correctly', () => {
    const wrapper = mount(<PurePortal>content</PurePortal>);
    expect(wrapper).toMatchSnapshot();

    let portalContainerDOM = document.createElement('div');
    portalContainerDOM.className = 'my-portal-container';
    document.body.append(portalContainerDOM);

    mount(<PurePortal selector={portalContainerDOM}>content</PurePortal>)
    expect(portalContainerDOM.innerHTML).toBe('content');

  });

  test('onUnmount is called', () => {
    const onUnmount = sinon.spy();
    const wrapper = mount(
      <PurePortal onUnmount={onUnmount}>content</PurePortal>
    );
    expect(onUnmount.callCount).toBe(0);
    wrapper.unmount();
    expect(onUnmount.callCount).toBe(1);
  });

  test('If the selector does not have a dom corresponding to it, the body is used', () => {
    const wrapper = mount(
      <PurePortal selector='does-not-have-a-dom-selector'>
        <span className='my-pure-portal-content'>content</span>
      </PurePortal>
    );
    let contentDOM = document.querySelector('.my-pure-portal-content');
    let parentDOM = (contentDOM as Element).parentNode;
    expect(parentDOM instanceof HTMLBodyElement).toBe(true);
  });

  test('When a selector is changed, the content is rendered to the selector container', () => {
    const wrapper = mount(
      <PurePortal selector='body'>
        <span className='my-pure-portal-content'>content</span>
      </PurePortal>
    );

    let contentDOM = document.querySelector('.my-pure-portal-content');
    let parentDOM = (contentDOM as any).parentNode;
    expect(parentDOM instanceof HTMLBodyElement).toBe(true);

    // create dom
    const divDOM = document.createElement('div');
    divDOM.setAttribute('class', 'my-new-container');
    document.body.append(divDOM);
    // change selector props
    wrapper.setProps({ selector: '.my-new-container' });

    contentDOM = document.querySelector('.my-pure-portal-content');
    parentDOM = (contentDOM as Element).parentNode;

    expect((parentDOM as Element).getAttribute('class')).toBe(
      'my-new-container'
    );
  });
});
