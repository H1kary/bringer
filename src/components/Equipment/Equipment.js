import React from 'react';
import './Equipment.css';

const Equipment = ({ equipment, onUnequipItem }) => {
  const slots = [
    { id: 'helmet', name: 'Шлем', icon: '🪖' },
    { id: 'amulet', name: 'Амулет', icon: '📿' },
    { id: 'chest', name: 'Нагрудник', icon: '👕' },
    { id: 'ring', name: 'Кольцо', icon: '💍' },
    { id: 'legs', name: 'Штаны', icon: '👖' },
    { id: 'boots', name: 'Обувь', icon: '👢' },
    { id: 'weapon', name: 'Оружие', icon: '⚔️' },
    { id: 'shield', name: 'Щит', icon: '🛡️' }
  ];

  return (
    <div className="equipment-grid">
      {slots.map(slot => (
        <div key={slot.id} className="equipment-slot">
          <div className="slot-name">{slot.name}</div>
          <div className="slot-content">
            {equipment[slot.id] ? (
              <div 
                className="item-equipped" 
                onClick={() => onUnequipItem(slot.id, equipment[slot.id])}
              >
                <div className="item-icon">{equipment[slot.id].icon}</div>
                <div className="item-name">{equipment[slot.id].name}</div>
              </div>
            ) : (
              <div className="empty-slot">{slot.icon}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Equipment; 