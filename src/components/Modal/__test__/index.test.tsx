import React from 'react';
import { mount, render } from 'enzyme';
import Modal from '../index';
import sinon from 'sinon';

describe('Modal', () => {
  // reset dom
  afterEach(() => {
    (document.querySelector('body') as any).innerHTML = '';
  });
  beforeEach(() => {
    (document.querySelector('body') as any).innerHTML = '';
  });

  test('renders correctly', () => {
    // visible={false}
    const wrapper1 = mount(
      <Modal
        title='title'
        visible={false}
      >
        content
      </Modal>
    );

    // visible={true}
    const wrapper2 = mount(
      <Modal
        title='title'
        visible={true}
      >
        content
      </Modal>
    );

    // mask={false}
    const wrapper3 = mount(
      <Modal
        title='title'
        visible={true}
        mask={false}
      >
        content
      </Modal>
    );

    // custom footer
    const wrapper4 = mount(
      <Modal
        title='title'
        visible={true}
        footer={<div>footer</div>}
      >
        content
      </Modal>
    );

    // no close icon
    const wrapper5 = mount(
      <Modal
        title='title'
        visible={true}
      >
        content
      </Modal>
    );

    // no title
    const wrapper6 = mount(
      <Modal visible={true}>
        content
      </Modal>
    );

    // style
    const wrapper7 = mount(
      <Modal visible={true} style={{ width: 500 }}>
        content
      </Modal>
    );

    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper3).toMatchSnapshot();
    expect(wrapper4).toMatchSnapshot();
    expect(wrapper5).toMatchSnapshot();
    expect(wrapper6).toMatchSnapshot();
    expect(wrapper7).toMatchSnapshot();
  });

  test('When the confirm button is clicked, the onOk callback is triggered', () => {
    const clickConfirmCallback = sinon.spy();

    const wrapper = mount(
      <Modal
        title='title'
        visible={true}
        onOk={clickConfirmCallback}
      >
        content
      </Modal>
    );
    const confirmBtnDOM = wrapper.find('button').find('.cat-modal__footer-confirm');

    expect(clickConfirmCallback.callCount).toBe(0);
    confirmBtnDOM.simulate('click');
    expect(clickConfirmCallback.callCount).toBe(1);
  });

  test('When the cancel button(or mask) is clicked, the onClose callback is triggered', () => {
    const clickCancelCallback = sinon.spy();

    const wrapper = mount(
      <Modal
        title='title'
        visible={true}
        onClose={clickCancelCallback}
      >
        content
      </Modal>
    );
    const cancelBtnDOM = wrapper.find('button').at(0);

    expect(clickCancelCallback.callCount).toBe(0);
    cancelBtnDOM.simulate('click');
    expect(clickCancelCallback.callCount).toBe(1);

    const maskDOM = wrapper.find('.cat-modal__modal-wrapper');
    maskDOM.simulate('click');
    expect(clickCancelCallback.callCount).toBe(2);
  });
});
