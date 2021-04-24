import {useState, useRef} from 'react';

import styles from './MealItemForm.module.scss';

import Input from '../../UI/Input';

const MealItemForm = (props)=>{
  const amountInputRef = useRef();
  const [isValid, setIsValid] = useState(true);

  const addItemToCartHandler = (event)=>{
    event.preventDefault();
    const selectedAmount = amountInputRef.current.value;
    const selectedAmountNumber = + selectedAmount;
    if(selectedAmount.trim().length === 0 || selectedAmountNumber <= 0){
      setIsValid(false);
      return;
    }
    props.onAddToCart(selectedAmountNumber);
  }

  return(
    <form className={styles['meals-list__item__form']} onSubmit={addItemToCartHandler}>
      <Input ref={amountInputRef} label="Amount" input={{type: 'number', defaultValue: 0, min: 0, id:'amount', step: 1, }}/>
      <button className={styles['meals-list__item__button']}>Add</button>
      {!isValid && <p className={styles['error-message']}>Please enter a valid value</p>}
    </form>
  )
}

export default MealItemForm;