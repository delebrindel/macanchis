import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import styles from './CartButton.module.scss';
import CartIcon from './CartIcon';

const CartButton = (props)=>{
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce((accumulator, item)=>{ return accumulator + item.amount }, 0)

  return (
    <button className={styles['navbar__cart']} onClick={props.toggleModal}>
      <span className={styles['navbar__cart__icon']}><CartIcon /></span>
      <span className={styles['navbar__cart__badge']}>{numberOfItems}</span>
    </button>
  )
}

export default CartButton;