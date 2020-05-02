import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './cart.css';
import { CloseOutlineIcon } from '../icons/ionicons';

function Cart({ setShowCart }) {
  const el = document.createElement('div');
  el.classList.add('cart-container');

  const ref = useRef(false);
  const btnRef = useRef(false);

  function handleClose() {
    setShowCart(false);
  }

  function handleClick(e) {
    if (ref.current.contains(e.target)) return;
    handleClose();
  }

  useEffect(() => {
    const portal = document.getElementById('portal-root');
    portal.appendChild(el);

    return () => {
      portal.removeChild(el);
    };
  }, [el]);

  useEffect(() => {
    btnRef.current.focus();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  return ReactDOM.createPortal(
    <div className="cart" ref={ref}>
      <header>
        <button className="btn btn-icon" onClick={handleClose} ref={btnRef}>
          <CloseOutlineIcon title="close" className="icon close-outline" />
        </button>
      </header>
      <div className="cart-content">
        <h3>Your cart is empty</h3>
      </div>
      <footer></footer>
    </div>,
    el
  );
}

export default Cart;
