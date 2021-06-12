import {useState, useEffect} from 'react';

import {useInput} from '../../hooks/use-input'; 
import styles from './Checkout.module.scss';

export const Checkout = ({onCancel, onConfirm}) => {
  const {value: nameValue, errors: nameErrors, changeHandler: nameChangeHandler, blurHandler: nameBlurHandler, reset: nameReset, valid: nameValid, touched: nameTouched} = useInput({minLength: 3, maxLength: 20});
  const {value: streetValue, errors: streetErrors, changeHandler: streetChangeHandler, blurHandler: streetBlurHandler, reset: streetReset, valid: streetValid, touched: streetTouched} = useInput({minLength: 3, maxLength: 50});
  const {value: postalValue, errors: postalErrors, changeHandler: postalChangeHandler, blurHandler: postalBlurHandler, reset: postalReset, valid: postalValid, touched: postalTouched} = useInput({minLength: 5, maxLength: 6});
  const {value: cityValue, errors: cityErrors, changeHandler: cityChangeHandler, blurHandler: cityBlurHandler, reset: cityReset, valid: cityValid, touched: cityTouched} = useInput({minLength: 3, maxLength: 30});
  const[enableButton, setEnableButton] = useState(false);
  const isFormValid = nameValid && streetValid && postalValid && cityValid;

  const formSubmitHandler = (event)=>{
    event.preventDefault();
    if(!isFormValid){
      return
    }
    nameReset();
    streetReset();
    postalReset();
    cityReset();
    onConfirm({
      name: nameValue,
      street: streetValue,
      postalCode: postalValue,
      city: cityValue,
    });
  }

  useEffect(()=>{
    setEnableButton(isFormValid)
  }, [isFormValid])

  return (
    <form action="#" onSubmit={formSubmitHandler}>
      <div className={`${styles.control} ${nameValid || !nameTouched ? '' : styles.invalid}`}>
        <label htmlFor="customerName">Your Name</label>
        <input type="text" name="customerName" value={nameValue} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
        {nameErrors.map(error => <span key={Math.random()} className={styles.errorMessage}>{error}</span>)}
      </div>
      <div className={`${styles.control} ${streetValid || !streetTouched ? '' : styles.invalid}`}>
        <label htmlFor="street">Address</label>
        <input type="text" name="street" value={streetValue} onChange={streetChangeHandler} onBlur={streetBlurHandler} />
        {streetErrors.map(error => <span key={Math.random()} className={styles.errorMessage}>{error}</span>)}
      </div>
      <div className={`${styles.control} ${postalValid || !postalTouched ? '' : styles.invalid}`}>
        <label htmlFor="postCode">Postal Code</label>
        <input type="text" name="postCode" value={postalValue} onChange={postalChangeHandler} onBlur={postalBlurHandler}/>
        {postalErrors.map(error => <span key={Math.random()} className={styles.errorMessage}>{error}</span>)}
      </div>
      <div className={`${styles.control} ${cityValid || !cityTouched ? '' : styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" name="city" value={cityValue} onChange={cityChangeHandler} onBlur={cityBlurHandler} />
        {cityErrors.map(error => <span key={Math.random()} className={styles.errorMessage}>{error}</span>)}
      </div>
      <button disabled={!enableButton} type="submit" className={styles.confirmation} onClick={formSubmitHandler}>Confirm My Order</button>
      <button type="button" onClick={onCancel} className={styles.cancel}>Cancel</button>
    </form>
  )
}