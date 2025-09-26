import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from "./components/SingleProduct"
import Navbar from './components/Navbar';
import Cart from './pages/Cart'
import { useCart } from './context/CardContext'

const App = () => {
  const { cartItem, setCartItem } = useCart();

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem');
    if (storedCart) setCartItem(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route
          path="/cart"
          element={
              <Cart />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

