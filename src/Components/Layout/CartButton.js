import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import styles from './CartButton.module.scss';
import CartIcon from './CartIcon';

const CartButton = (props)=>{
  const [buttonHighlighted, setButtonHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce((accumulator, item)=>{ return accumulator + item.amount }, 0)
  const buttonClasses = `${styles['navbar__cart']} ${buttonHighlighted ? styles['navbar__cart--bump'] : ''}`;
  const {items } = cartCtx;

  useEffect(()=>{
    if(items.length > 0){
      setButtonHighlighted(true);
      const timer = setTimeout(()=>{ setButtonHighlighted(false)}, 900);

      return ()=>{
        clearTimeout(timer);
      }
    } 

  }, [items])

  return (
    <button className={buttonClasses} onClick={props.toggleModal}>
      <span className={styles['navbar__cart__icon']}><CartIcon /></span>
      <span className={styles['navbar__cart__badge']}>{numberOfItems}</span>
    </button>
  )
}

export default CartButton;