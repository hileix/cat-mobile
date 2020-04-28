import React from 'react';
import { PureComponent } from 'react';
import classNames from 'classnames';
import PurePortal from '../PurePortal';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

export interface ModalProps {
  /**
   * 前缀
   */
  prefix: string;
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 宽度
   */
  width: number;
  /**
   * Modal 中的内容
   */
  children: React.ReactNode;
  /**
   * 确认按钮文字
   */
  okText?: React.ReactNode;
  /**
   * 取消按钮文字
   */
  cancelText?: React.ReactNode;
  /**
   * 自定义的ModalFooter
   */
  footer?: React.ReactNode;
  /**
   * 点击确定回调
   */
  onOk?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * 关闭操作回调函数
   */
  onClose?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    isMask: boolean
  ) => void;
  /**
   * 关闭时是否销毁子元素
   */
  destroyOnClose: boolean;
  /**
   * 是否显示遮罩
   */
  mask: boolean;
  /**
   * 平台（平台不同，样式不同）
   */
  platform: Platform;
  /**
   * body 行内样式
   */
  bodyStyle?: React.CSSProperties;
}

export type Platform = 'ios' | 'android';

export interface ModalState {
  /**
   * 模态窗高度是否溢出了浏览器可视区域高度
   */
  isOverflow: boolean;
}

const TIMEOUT = 300;

/**
 * Modal 对话框
 */
class Modal extends PureComponent<ModalProps, ModalState> {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.node,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.node,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    footer: PropTypes.node,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    destroyOnClose: PropTypes.bool,
    mask: PropTypes.bool,
    platform: PropTypes.oneOf(['ios', 'android'])
  };

  static defaultProps = {
    prefix: 'cat-mobile',
    visible: false,
    width: 270,
    destroyOnClose: false,
    mask: true,
    okText: 'Ok',
    cancelText: 'Cancel',
    platform: 'ios'
  };

  state = {
    isOverflow: false
  };

  modalRef: HTMLDivElement | null;

  getModalRef = (node: HTMLDivElement) => {
    this.modalRef = node;
  };

  handleMaskClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { mask } = this.props;
    mask && this.handleClose(e, true);
  };

  handleClose = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    isMask = false
  ) => {
    const { onClose } = this.props;
    onClose && onClose(e, isMask);
  };

  handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { onOk } = this.props;
    onOk && onOk(e);
  };

  handleModalClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  renderHeader = () => {
    const { prefix, title, platform } = this.props;

    if (!title) {
      return null;
    }

    const modalPrefix = `${prefix}-modal`;

    return (
      <div
        className={`${modalPrefix}__header ${modalPrefix}__header--${platform}`}
      >
        {title}
      </div>
    );
  };

  renderBody = () => {
    const { prefix, children, platform, bodyStyle } = this.props;
    const modalPrefix = `${prefix}-modal`;
    return (
      <div
        className={`${modalPrefix}__body ${modalPrefix}__body--${platform}`}
        style={bodyStyle}
      >
        {children}
      </div>
    );
  };

  renderFooter = () => {
    const { prefix, footer, okText, cancelText, platform, onOk } = this.props;
    const footerPrefix = `${prefix}-modal__footer`;

    let newFooter;
    if (typeof footer === 'undefined') {
      newFooter = (
        <div
          className={`${footerPrefix}-button-wrapper ${footerPrefix}-button-wrapper--${platform}`}
        >
          <button
            type='button'
            className={`${footerPrefix}-cancel-button ${footerPrefix}-cancel-button--${platform}`}
            onClick={this.handleClose}
          >
            {cancelText}
          </button>
          <button
            type='button'
            className={`${footerPrefix}-ok-button ${footerPrefix}-ok-button--${platform}`}
            onClick={onOk}
          >
            {okText}
          </button>
        </div>
      );
    } else {
      newFooter = footer;
    }

    return <div className={classNames(footerPrefix)}>{newFooter}</div>;
  };

  render() {
    const {
      prefix,
      className,
      style,
      visible,
      destroyOnClose,
      width,
      mask,
      platform
    } = this.props;
    const { isOverflow } = this.state;

    const modalPrefix = `${prefix}-modal`;

    const classes = classNames(modalPrefix, className);

    let moreStyle: React.CSSProperties = {
      transform: 'translate(-50%, -50%)'
    };
    if (isOverflow) {
      moreStyle.transform = 'translate(-50%)';
      moreStyle.top = 0;
      moreStyle.margin = '60px 0';
    }

    let newWidth = width;
    if (platform === 'android') {
      newWidth = 292;
    }

    const modalStyle: React.CSSProperties = {
      width: newWidth,
      ...style,
      ...moreStyle
    };

    return (
      <PurePortal selector='body'>
        <CSSTransition
          timeout={TIMEOUT}
          in={visible}
          classNames={`${modalPrefix}-container`}
          unmountOnExit={destroyOnClose}
          mountOnEnter
          appear
        >
          <div className={`${modalPrefix}-container`}>
            {mask && <div className={`${modalPrefix}__mask`} />}
            <div
              className={`${modalPrefix}__modal-wrapper`}
              onClick={this.handleMaskClose}
            >
              <div
                className={classes}
                style={modalStyle}
                ref={this.getModalRef}
                onClick={this.handleModalClick}
              >
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
              </div>
            </div>
          </div>
        </CSSTransition>
      </PurePortal>
    );
  }
}

export default Modal;
