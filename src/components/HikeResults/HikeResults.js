import React from 'react';
import './HikeResults.css';

const HikeResults = ({ items, gold, onClose }) => {
  return (
    <div className="hike-results">
      <h2>Результаты похода</h2>
      <div className="found-gold">
        <span className="gold-icon">💰</span>
        <span className="gold-amount">{gold} золота</span>
      </div>
      <div className="found-items">
        {items.map((item, index) => (
          <div key={index} className="found-item">
            <span className="item-icon">{item.icon}</span>
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              {item.quantity > 1 && (
                <span className="item-quantity">×{item.quantity}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HikeResults; 