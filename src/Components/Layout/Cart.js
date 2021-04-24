import { useContext } from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal';

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const cartItemRemoveHandler = (id) => { };
  const cartItemAddHandler = (item) => { };
  const cartItems = cartCtx.items.map(item => <CartItem key={item.id} price={item.price} name={item.name} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />);
  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  return (
    <Modal toggleModal={props.toggleModal}>
      <ul>
        {cartItems}
        <div>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div>
          <button onClick={props.toggleModal}>Close</button>
          {cartCtx.items.length > 0 && <button>Order</button>}
        </div>
      </ul>
    </Modal>
  )
}

export default Cart;