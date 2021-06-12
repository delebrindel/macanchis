import {useState} from 'react';

const ERROR_TYPES = {
  MIN_LENGTH : 1,
  MAX_LENGTH : 2,
}

export const useInput  = (configuration)=>{
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState([]);
  const [valid, setValid] = useState(false);

  const changeHandler = (event) =>{
    setTouched(true);
    let activeErrors = [];
    const newValue = event.target.value;
    activeErrors = validationManager(newValue);
    let errorMessages = activeErrors.map(error => error.errorMsg);
    newValue.trim().length <= configuration.maxLength &&  setValue(newValue);
    setValid(activeErrors.length === 0 && touched);
    setErrors(errorMessages);
  }
  
  const blurHandler = (event) =>{
    setTouched(true);
    let activeErrors = [];
    const newValue = event.target.value;
    activeErrors = validationManager(newValue);
    let errorMessages = activeErrors.map(error => error.errorMsg);
    setValid(activeErrors.length === 0 && touched);
    setErrors(errorMessages);
  }

  const validationManager = (value) =>{
    let errors = [];
    if(touched){
      configuration.minLength && value.trim().length < configuration.minLength && errors.push({errorType: ERROR_TYPES.MIN_LENGTH, errorMsg: `Field can not be less than ${configuration.minLength} characters long.`});
    }
    return errors;
  }

  const reset = ()=>{
    setValue('');
    setErrors([]);
    setValid(false);
    setTouched(false);
  }

  return {value, errors, changeHandler, blurHandler, valid, touched, reset}

}