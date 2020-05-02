import React, { useReducer } from 'react';
import './build.css';
import FoodIcons from './food-icons';
import { CheckmarkCircleIcon, OffCircleOutlineIcon } from '../icons/ionicons';
import {
  quantities,
  tortillas,
  fillings,
  rices,
  beans,
  toppings
} from '../data';

function Build() {
  const initialState = {
    quantity: quantities[0],
    tortilla: null,
    filling: null,
    rice: null,
    beans: null,
    toppings: []
  };

  function validate(state) {
    return true;
  }

  function addToCart(state) {
    if (validate(state)) {
      console.log('add to cart');
    } else {
      console.log('choose required items');
    }
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'quantity':
        return { ...state, quantity: action.payload };
      case 'tortilla':
        return { ...state, tortilla: action.payload };
      case 'filling':
        return { ...state, filling: action.payload };
      case 'rice':
        return { ...state, rice: action.payload };
      case 'beans':
        return { ...state, beans: action.payload };
      case 'toppings':
        const items = [...state.toppings];
        const item = action.payload;
        const index = items.findIndex((i) => i.id === item.id);

        if (index > -1) {
          items.splice(index, 1);
        } else {
          items.push(item);
        }

        return { ...state, toppings: items };
      case 'ADD_TO_CART':
        addToCart(state);
        return state;
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Main>
        <TacoBuilder state={state} dispatch={dispatch} />
      </Main>
      <Footer state={state} dispatch={dispatch} />
    </>
  );
}

function TacoBuilder({ state, dispatch }) {
  return (
    <div className="taco-builder">
      <Section
        title="Choose Quantity"
        type="quantity"
        items={quantities}
        reducer={{ state, dispatch }}
      />
      <Section
        type="tortilla"
        items={tortillas}
        reducer={{ state, dispatch }}
      />
      <Section type="filling" items={fillings} reducer={{ state, dispatch }} />
      <Section type="rice" items={rices} reducer={{ state, dispatch }} />
      <Section type="beans" items={beans} reducer={{ state, dispatch }} />
      <Section
        title="Top things off"
        type="toppings"
        items={toppings}
        reducer={{ state, dispatch }}
      />
    </div>
  );
}

function Section({ title, type, items, reducer }) {
  const { state, dispatch } = reducer;

  function handleClick(item) {
    dispatch({ type, payload: item });
  }

  return (
    <div className="section">
      <h2 className="capitalize">{title ? title : type}</h2>
      <ul>
        {items &&
          items.map((item) => (
            <li key={item.id}>
              <Item
                item={item}
                selectedItem={state[type]}
                onClick={handleClick}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

function Item({ item, selectedItem, onClick }) {
  let selected;

  if (Array.isArray(selectedItem)) {
    selected = selectedItem.filter((i) => i.id === item.id).length;
  } else {
    selected = selectedItem && selectedItem.id === item.id;
  }

  return (
    <div
      className="item"
      style={{
        backgroundImage: item.image ? `url('${item.image}')` : ''
      }}
      onClick={() => onClick(item)}
    >
      <strong>{item.name}</strong>
      {selected ? (
        <CheckmarkCircleIcon
          title="checkmark"
          className="icon checkmark-circle align-self-center z-index-1"
        />
      ) : (
        ''
      )}
      {!selected && !item.image && (
        <div className="no-item">
          <OffCircleOutlineIcon
            title="none"
            className="icon off-circle-outline"
          />
        </div>
      )}
    </div>
  );
}

function Main({ children }) {
  return (
    <main>
      <div className="main-header">
        <div className="main-header-logo">
          <img src="/logo.svg" alt="taco" width="256" />
        </div>
        <div className="main-header-content">
          <h1>build your tacos</h1>
          <FoodIcons />
          <p>
            Choose from freshly grilled meat in a soft or hard-shell tortilla
            with guac, salsa, queso blanco, sour cream or cheese, and topped
            with hand-cut romaine lettuce.
          </p>
        </div>
      </div>
      <div className="main-content">{children}</div>
    </main>
  );
}

function Footer({ state, dispatch }) {
  const quantity = state.quantity && state.quantity.value;
  const filling = state.filling && state.filling.name;
  const meal = `${filling} taco${quantity > 1 ? 's' : ''}`;

  function handleClick() {
    dispatch({ type: 'ADD_TO_CART' });
  }

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <h3 className="uppercase">Your meal</h3>
          <p>
            {filling ? (
              <span className="capitalize">{meal}</span>
            ) : (
              'Select a filling to get started'
            )}
          </p>
        </div>
        <button
          className="btn btn-add justify-self-center"
          onClick={handleClick}
        >
          Add to cart
        </button>
      </div>
    </footer>
  );
}

export default Build;
