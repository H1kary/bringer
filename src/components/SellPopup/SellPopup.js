import React, { useState } from 'react';
import './SellPopup.css';
import { usePopupClose } from '../../hooks/usePopupClose';

const SellPopup = ({ item, onClose, onSell }) => {
  usePopupClose(true, onClose);

  const [quantity, setQuantity] = useState(1);

  const handleSell = () => {
    onSell(item, quantity);
    onClose();
  };

  return (
    <div className="sell-overlay popup-overlay">
      <div className="sell-popup">
        <h3>Продать предмет</h3>
        <div className="item-preview">
          <span className="item-icon">{item.icon}</span>
          <span className="item-name">{item.name}</span>
        </div>
        <div className="quantity-selector">
          <div className="quantity-label">
            Количество: {quantity} из {item.quantity}
          </div>
          <input
            type="range"
            min="1"
            max={item.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <div className="total-price">
            Итого: {item.price * quantity} 🪙
          </div>
        </div>
        <div className="sell-buttons">
          <button onClick={handleSell}>Продать</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default SellPopup; 