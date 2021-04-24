import React from 'react';
import styles from './CartItem.module.scss';

const CartItem = (props) =>{
  const price = `$ ${props.price.toFixed(2)}`;

  return(
    <li className='cart__item'>
      <div>
        <h2>{props.name}</h2>
        <div className={styles['cart__item__summary']}>
          <span className={styles['cart__item__summary-amount']}>{props.amount}</span>
          <span>&times;</span>
          <span className={styles['cart__item__summary-price']}>{price}</span>
          <span> = </span>
          <span>{`$ ${props.price * props.amount}`}</span>   
          
        </div>
        <div className={styles['cart__item__actions']}>
          <button onClick={props.onRemove}>-</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem;