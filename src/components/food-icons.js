import React from 'react';
import { twemojis } from '../icons/twemojis';

function FoodIcons() {
  return (
    <div className="food-icons">
      {twemojis.map((icon) => {
        return (
          <img key={icon.code} src={icon.src} alt={icon.title} width="32" />
        );
      })}
    </div>
  );
}

export default FoodIcons;
