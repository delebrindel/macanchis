import {useContext} from 'react';

import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = props => {
  const cartCtx = useContext(CartContext);

  const price = `$ ${props.price.toFixed(2)}`;
  const onAddToCartHandler = amount =>{
    cartCtx.addItem({id: props.id, name: props.name, amount: amount, price: props.price});
  }

  return (
    <li className={styles['meals-list__item']}>
      <div className={styles['meals-list__item__text']}>
        <h3>{props.name}</h3>
        <div className={styles['meals-list__item__description']}>{props.description}</div>
        <div className={styles['meals-list__item__price']}>{price}</div>
      </div>
      <MealItemForm onAddToCart={onAddToCartHandler}/>
    </li>
  )
}

export default MealItem;