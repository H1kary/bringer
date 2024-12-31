import React, { useState } from 'react';
import './Items.css';
import SellPopup from '../SellPopup/SellPopup';

const Items = ({ items, onEquipItem, onSellItem, onUseItem }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortType, setSortType] = useState('newest');

  const handleSellClick = (item, e) => {
    e.stopPropagation();
    if (item.quantity > 1) {
      setSelectedItem(item);
    } else {
      onSellItem(item, 1);
    }
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
      case 'resource': return 'Ресурс';
      default: return type || 'Ресурс';
    }
  };

  const getRarityWeight = (rarity) => {
    switch (rarity) {
      case 'legendary': return 5;
      case 'epic': return 4;
      case 'rare': return 3;
      case 'uncommon': return 2;
      case 'common': return 1;
      default: return 0;
    }
  };

  const getSortedItems = () => {
    const itemsToSort = [...items];
    
    switch (sortType) {
      case 'newest':
        return itemsToSort.reverse();
      case 'oldest':
        return itemsToSort;
      case 'expensive':
        return itemsToSort.sort((a, b) => b.price - a.price);
      case 'cheap':
        return itemsToSort.sort((a, b) => a.price - b.price);
      case 'mostQuantity':
        return itemsToSort.sort((a, b) => b.quantity - a.quantity);
      case 'leastQuantity':
        return itemsToSort.sort((a, b) => a.quantity - b.quantity);
      case 'nameAZ':
        return itemsToSort.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameZA':
        return itemsToSort.sort((a, b) => b.name.localeCompare(a.name));
      case 'rarityHigh':
        return itemsToSort.sort((a, b) => getRarityWeight(b.rarity) - getRarityWeight(a.rarity));
      case 'rarityLow':
        return itemsToSort.sort((a, b) => getRarityWeight(a.rarity) - getRarityWeight(b.rarity));
      default:
        return itemsToSort;
    }
  };

  const handleItemClick = (item, e) => {
    e.stopPropagation();
    if (item.type === 'food') {
      onUseItem(item);
    } else if (item.type && item.type !== 'resource') {
      onEquipItem(item);
    }
  };

  return (
    <div className="items-container">
      <div className="items-header">
        <h3>Инвентарь</h3>
        <select 
          className="sort-select" 
          value={sortType} 
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="expensive">Сначала дорогие</option>
          <option value="cheap">Сначала дешёвые</option>
          <option value="mostQuantity">Больше предметов</option>
          <option value="leastQuantity">Меньше предметов</option>
          <option value="nameAZ">От А до Я</option>
          <option value="nameZA">От Я до А</option>
          <option value="rarityHigh">Сначала редкие</option>
          <option value="rarityLow">Сначала обычные</option>
        </select>
      </div>
      <div className="items-grid">
        {getSortedItems().map((item, index) => (
          <div 
            key={index} 
            className={`item ${item.rarity || ''}`}
            data-rarity={item.rarity}
            onClick={(e) => handleItemClick(item, e)}
            style={{ cursor: item.type !== 'resource' ? 'pointer' : 'default' }}
          >
            <div className="item-content">
              <div className="item-icon">{item.icon}</div>
              <div className="item-name">{item.name}</div>
              {item.quantity > 1 && (
                <div className="item-quantity">×{item.quantity}</div>
              )}
              {item.rarity && (
                <div 
                  className="item-rarity"
                  style={{ color: getRarityColor(item.rarity) }}
                >
                  {getRarityText(item.rarity)}
                </div>
              )}
              {item.type && (
                <div className="slot-type">
                  {getSlotName(item.type)}
                </div>
              )}
            </div>
            <div className="item-stats">
              {item.defense && (
                <div className="item-stat">🛡️ {item.defense}</div>
              )}
              {item.attack && (
                <div className="item-stat">⚔️ {item.attack}</div>
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
              className="sell-button"
              onClick={(e) => handleSellClick(item, e)}
              title="Продать предмет"
            >
              <span className="sell-icon">🪙</span>
              <span className="sell-price">{item.price}</span>
            </button>
          </div>
        ))}
      </div>
      {selectedItem && (
        <SellPopup
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSell={onSellItem}
        />
      )}
    </div>
  );
};

export default Items;
