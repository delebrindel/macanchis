import {useReducer} from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const ACTION_TYPES = {
  ADD : 'ADD_ITEM_TO_CART',
  REMOVE : 'REMOVE_ITEM_FROM_CART',
  RESET : 'RESET_CART',
}

const cartReducer = (state, action) => {

  switch(action.type){
    case ACTION_TYPES.ADD :{
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      
      if(existingCartItem){
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount + action.item.amount};
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      else{
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }
    }

    case ACTION_TYPES.REMOVE: {
      const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      let updatedItems;
      if(existingCartItem.amount === 1){
        updatedItems = state.items.filter(item => item.id !== action.id);
      }
      else{
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount -1 }
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
  
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }
    }

    case ACTION_TYPES.RESET: {
      return defaultCartState
    }

    default: {
      return defaultCartState;
    }
  }
};

export const CartProvider = (props) => {
  
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatchCartAction({type: ACTION_TYPES.ADD, item: item});
  }
  
  const removeItemHandler = (id) => {
    dispatchCartAction({type: ACTION_TYPES.REMOVE, id: id});
  }
  
  const resetCartHandler = ()=>{
    dispatchCartAction({type: ACTION_TYPES.RESET});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    resetCart: resetCartHandler,
  }
  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;