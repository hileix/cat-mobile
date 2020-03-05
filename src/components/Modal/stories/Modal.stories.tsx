import React from 'react';
import { storiesOf } from '@storybook/react';
import { Modal } from '@components/index';
import '../../../styles/index.scss';
import './style.scss';
import markdown from '../README.md';

const { useState } = React;

const BaseModal = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <>
      <div>ios</div>
      <button className='modal-button' onClick={() => setVisible1(true)}>
        Basic
      </button>

      <hr />
      <div>android</div>
      <button className='modal-button' onClick={() => setVisible2(true)}>
        Basic
      </button>

      <Modal
        title='title'
        visible={visible1}
        onClose={() => setVisible1(false)}
        onOk={() => console.log('ok')}
      >
        <p>content</p>
        <p>content</p>
        <p>content</p>
      </Modal>
      <Modal
        title='title'
        visible={visible2}
        onClose={() => setVisible2(false)}
        platform='android'
        onOk={() => console.log('ok')}
      >
        <p>content</p>
        <p>content</p>
        <p>content</p>
      </Modal>
    </>
  );
};

const FooterModal = () => {
  const [visible, setVisible] = useState(false);

  const footer = (
    <div className='footer' style={{ textAlign: 'center' }}>
      <button onClick={() => setVisible(false)}>Submit</button>
    </div>
  );

  return (
    <>
      <button className='modal-button' onClick={() => setVisible(true)}>
        自定义 footer 的 Modal
      </button>
      <Modal
        title='Enter the amount you want to redeem'
        visible={visible}
        footer={footer}
        onClose={() => setVisible(false)}
      >
        <p>
          Please ensure that the amount you are redeeming does not exceed the
          remaining total amount.
        </p>
      </Modal>
    </>
  );
};

const NoMaskModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button className='modal-button' onClick={() => setVisible(true)}>
        没有遮罩
      </button>
      <Modal
        title='Enter the amount you want to redeem'
        visible={visible}
        onClose={() => setVisible(false)}
        mask={false}
      >
        <p>
          Please ensure that the amount you are redeeming does not exceed the
          remaining total amount.
        </p>
      </Modal>
    </>
  );
};

const DestroyOnCloseModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button className='modal-button' onClick={() => setVisible(true)}>
        关闭 Modal 后自动销毁 children 的 Modal（请打开控制台，查看 DOM）
      </button>
      <Modal
        title='Enter the amount you want to redeem'
        visible={visible}
        onClose={() => setVisible(false)}
        destroyOnClose
      >
        <p>
          Please ensure that the amount you are redeeming does not exceed the
          remaining total amount.
        </p>
      </Modal>
    </>
  );
};

storiesOf('反馈/Modal 模态窗', module).add('Modal', () => <BaseModal />, {
  info: {
    text: markdown
  }
});
