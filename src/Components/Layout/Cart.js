import { useContext, useState } from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import styles from './Cart.module.scss';

import Modal from '../UI/Modal';
import { Checkout } from './Checkout';

const Cart = ({ toggleModal }) => {
  const cartCtx = useContext(CartContext);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = async (userData) => {
    setIsSubmitting(true);
    console.log(userData);
    console.log("=======================");
    console.log("Order is being handled!");
    console.log("=======================");
    console.log(`Username: ${userData.name}`);
    console.log(`Address: ${userData.street}`);
    console.log(`City: ${userData.city}`);
    console.log(`Postal Code: ${userData.postalCode}`);
    console.log("=======================");
    cartCtx.items.forEach((item) => {
      console.log(`Ordering ${item.amount} x ${item.name}, $ ${(item.amount * item.price).toFixed(2)}`);
    })
    console.log("=======================");
    console.log(`Your total is $ ${cartCtx.totalAmount.toFixed(2)}`)
    console.log("=======================");
    const sendOrderRequest = await fetch('https://macanchis-990a2-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      })
    })
    const sendOrderResponse = await sendOrderRequest.json();
    setTimeout(()=>{
      sendOrderResponse && setOrderSent(true);
      cartCtx.resetCart();
      setIsSubmitting(false);
    }, 1000);
  }

  const toggleCheckoutHandler = () => {
    setReadyForCheckout(lastState => !lastState);
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readyForCheckout, setReadyForCheckout] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const cartItems = cartCtx.items.map(item => <CartItem key={item.id} price={item.price} name={item.name} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />);
  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;

  const cartModalContent = (<>
    <ul className={styles['cart__list']}>
      {cartItems}
    </ul>
    <div className={styles['cart__total']}>
      <span>Total Amount: </span>
      <span>{totalAmount}</span>
    </div>
    {readyForCheckout && <Checkout onCancel={toggleModal} onConfirm={orderHandler} />}
    {!readyForCheckout &&
      <div className={styles['cart__actions']}>
        {!readyForCheckout && cartCtx.items.length > 0 && <button className={styles.confirmation} onClick={toggleCheckoutHandler}>Order</button>}
        <button onClick={toggleModal} className={styles.cancel}>Cancel</button>
      </div>
    }
  </>
  )
  
  const submittingOrderContent = (
    <p className={styles.orderSent}>Sending order data...</p>
  )

  const orderSentContent = (
    <div className={styles.orderSent}>
      <p>Succesfully sent your order!</p>
      <p>You will be contacted soon.</p>
      <div className={styles['cart__actions']}>
        <button onClick={toggleModal} className={styles.confirmation}>Ok</button>
      </div>
    </div>
  )

  return (
    <Modal toggleModal={toggleModal}>
      {!isSubmitting && !orderSent && cartModalContent}
      {isSubmitting && submittingOrderContent}
      {orderSent && orderSentContent}
    </Modal>
  )
}

export default Cart;