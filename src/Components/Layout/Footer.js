import styles from './Footer.module.scss';

const Footer = (props) => {
  return (
    <div className={styles['footer']}>
      <p>
        Written with &lt;3 by <a href="https://gitlab.com/delebrindel" target="git">delebrindel</a>
      </p>
      Github repo <a href="https://github.com/delebrindel/macanchis" target="git">here</a>
    </div>
  )
}

export default Footer;