import { Fragment } from 'react';
import ReactDom from 'react-dom';
import styles from './Footer.module.scss';
const portalElement = document.getElementById('footer');

const FooterWrapper = ()=>{
  return(
    <span className={styles['footer']}>
    <p>
      Written with &lt;3 by <a href="https://gitlab.com/delebrindel" target="git">delebrindel</a>
    </p>
    <p>
      Github repo <a href="https://github.com/delebrindel/macanchis" target="git">here</a>
    </p>
    </span>
  )
}

const Footer = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<FooterWrapper />, portalElement)}
    </Fragment>
  )
}

export default Footer;