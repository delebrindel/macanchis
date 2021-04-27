import { useContext } from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import styles from './Cart.module.scss';

import Modal from '../UI/Modal';

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
   };
  const cartItemAddHandler = (item ) => { 
    cartCtx.addItem({...item, amount: 1});
  };

  const orderHandler = ()=>{
    console.log("=======================");
    console.log("Order is being handled!");
    console.log("=======================");
    cartCtx.items.forEach((item)=>{
      console.log(`Ordering ${item.amount} x ${item.name}, $ ${(item.amount * item.price).toFixed(2)}`);
    })
    console.log("=======================");
    console.log(`Your total is $ ${cartCtx.totalAmount.toFixed(2)}`)
    console.log("=======================");
  }

  const cartItems = cartCtx.items.map(item => <CartItem key={item.id} price={item.price} name={item.name} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />);
  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  return (
    <Modal  toggleModal={props.toggleModal}>
      <ul className={styles['cart__list']}>
        {cartItems}
      </ul>
        <div className={styles['cart__total']}>
          <span>Total Amount: </span>
          <span>{totalAmount}</span>
        </div>
        <div className={styles['cart__actions']}>
          <button onClick={props.toggleModal}>Close</button>
          {cartCtx.items.length > 0 && <button onClick={orderHandler}>Order</button>}
        </div>
    </Modal>
  )
}

export default Cart;