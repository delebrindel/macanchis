import React from 'react';

const initialContext = {
  items: [],
  totalAmount: 0,
  addItem: (item ) => {},
  removeItem: ( id ) => {},
  resetCart: ()=>{},
}

const CartContext = React.createContext(initialContext);

export default CartContext;