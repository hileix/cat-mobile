import React, { useState } from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import PurePortal from '../index';
import '../../../styles/index.scss';
import './style.scss';
import markdown from '../README.md';


const Demo1 = () => {
  return (
    <div className='pure-portal-box'>
      <PurePortal selector='.pure-portal-box'>
        <p>pure protal content</p>
      </PurePortal>
    </div>
  )
};

storiesOf('工具/PurePortal 传送门', module)
  .add('PurePortal',
    () => <Demo1 />,
    {
      notes: {
        markdown
      }
    })
