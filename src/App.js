import { useState } from 'react';

import Navbar from './Components/Layout/Navbar';
import Intro from './Components/Layout/Intro';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Layout/Cart';

import CartProvider from './store/CartProvider';


import './App.scss';

function App() {

  const [modalState, setModalState] = useState(false);

  const toggleModalHandler = () => {
    setModalState((prevState) => !prevState);
  }

  return (
    <div className="App">
      <CartProvider>
        <Navbar toggleModal={toggleModalHandler} />
        {modalState && <Cart toggleModal={toggleModalHandler} />}
        <Intro />
        <Meals />
      </CartProvider>
    </div>
  );
}

export default App;
