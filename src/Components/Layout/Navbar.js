import styles from './Navbar.module.scss';
import CartButton from './CartButton';

export const Navbar = (props) => {
  return (
    <nav className={styles['navbar-wrapper']}>
      <h1>Macanchis</h1>
      <CartButton toggleModal={props.toggleModal}>Cart</CartButton>
    </nav>
  )
}

export default Navbar;