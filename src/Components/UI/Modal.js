import {Fragment} from 'react';
import ReactDom from 'react-dom';
import styles from './Modal.module.scss';

const Backdrop = props =>{
  return <div onClick={props.toggleModal} className={styles.backdrop}></div>
}

const ModalOverlay = props =>{
  return (
    <div className={styles.modal}>
      <div className={styles['modal__content']}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlays');

const Modal = props => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop toggleModal={props.toggleModal} />, portalElement)}
      {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  )
}

export default Modal;