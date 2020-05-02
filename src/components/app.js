import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './app.css';
import Build from './build';
import Cart from './cart';
import FoodIcons from './food-icons';
import { CartOutlineIcon } from '../icons/ionicons';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [isBuild, setIsBuild] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname.includes('/build')) {
      setIsBuild(true);
    } else {
      setIsBuild(false);
    }
  }, [location]);

  return (
    <div className={`app${isBuild ? ' build' : ''}`}>
      {showCart && <Cart setShowCart={setShowCart} />}
      <Header setShowCart={setShowCart} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/build" element={<Build />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

function Header({ setShowCart }) {
  return (
    <header>
      <Link to="/" className="btn btn-icon">
        <img src="/logo.svg" alt="taco" width="32" />
      </Link>
      <button
        className="btn btn-icon justify-self-end"
        onClick={() => setShowCart(true)}
      >
        <CartOutlineIcon title="cart" className="icon cart-outline" />
      </button>
    </header>
  );
}

function Main() {
  return (
    <main>
      <div className="main-header">
        <div className="main-header-logo">
          <img src="/logo.svg" alt="taco" width="256" />
        </div>
        <div className="main-header-content">
          <h1>taco tuesday</h1>
          <FoodIcons />
          <p>
            Chipotle's taco builder is a great way to enjoy taco tuesday. Let's
            give it a try!
          </p>
        </div>
      </div>
      <div className="main-content">
        <Link to="/build" className="btn btn-link align-self-center">
          Build your tacos
        </Link>
      </div>
    </main>
  );
}

export default App;
