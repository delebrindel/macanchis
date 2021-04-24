import React from 'react';

const initialContext = {
  items: [],
  totalAmount: 0,
  addItem: (item ) => {},
  removeItem: ( id ) => {} 
}

const CartContext = React.createContext(initialContext);

export default CartContext;