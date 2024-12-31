import React from 'react';
import './Shop.css';
import { usePopupClose } from '../../hooks/usePopupClose';

const Shop = ({ items, gold, onBuyItem, onClose }) => {
  const popupRef = usePopupClose(true, onClose);

  return (
    <div className="shop-overlay">
      <div className="shop-container" ref={popupRef}>
        <div className="shop-header">
          <h2>Магазин</h2>
          <div className="shop-gold">💰 {gold}</div>
          <button className="close-button" onClick={onClose}>✖</button>
        </div>
        <div className="shop-items">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`shop-item ${item.rarity || ''}`}
              data-rarity={item.rarity}
            >
              <div className="item-content">
                <div className="item-icon">{item.icon}</div>
                <div className="item-name">{item.name}</div>
                {item.rarity && (
                  <div className="item-rarity" style={{ color: getRarityColor(item.rarity) }}>
                    {getRarityText(item.rarity)}
                  </div>
                )}
                <div className="item-type">{getSlotName(item.type)}</div>
              </div>
              <div className="item-stats">
                {item.attack && (
                  <div className="item-stat">
                    ⚔️ {item.attack > 0 ? '+' : ''}{item.attack}
                  </div>
                )}
                {item.defense && (
                  <div className="item-stat">
                    🛡️ {item.defense > 0 ? '+' : ''}{item.defense}
                  </div>
                )}
                {item.luck && (
                  <div className={`item-stat ${item.luck < 0 ? 'negative' : ''}`}>
                    ☘️ {item.luck > 0 ? '+' : ''}{item.luck}
                  </div>
                )}
                {item.healing && (
                  <div className="item-stat healing">
                    ❤️ +{item.healing}
                  </div>
                )}
                {item.healthRegen && (
                  <div className={`item-stat ${item.healthRegen < 0 ? 'negative' : ''}`}>
                    ❤️‍🩹 {item.healthRegen > 0 ? '+' : ''}{item.healthRegen.toFixed(1)}/сек
                  </div>
                )}
              </div>
              <button 
                className="buy-button"
                onClick={() => onBuyItem(item)}
                disabled={gold < item.price}
              >
                <span className="price-icon">🪙</span>
                <span className="price-amount">{item.price}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common': return '#9e9e9e';
    case 'uncommon': return '#4CAF50';
    case 'rare': return '#2196F3';
    case 'epic': return '#9C27B0';
    case 'legendary': return '#FFD700';
    default: return '#9e9e9e';
  }
};

const getRarityText = (rarity) => {
  switch (rarity) {
    case 'common': return 'Обычный';
    case 'uncommon': return 'Необычный';
    case 'rare': return 'Редкий';
    case 'epic': return 'Эпический';
    case 'legendary': return 'Легендарный';
    default: return 'Обычный';
  }
};

const getSlotName = (type) => {
  switch (type) {
    case 'helmet': return 'Шлем';
    case 'amulet': return 'Амулет';
    case 'chest': return 'Броня';
    case 'ring': return 'Кольцо';
    case 'weapon': return 'Оружие';
    case 'shield': return 'Щит';
    case 'legs': return 'Поножи';
    case 'boots': return 'Обувь';
    case 'food': return 'Еда';
    default: return type || 'Предмет';
  }
};

export default Shop; 