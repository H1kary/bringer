import React from 'react';
import './Character.css';

function Character({ 
  onHikeClick, 
  equipment, 
  isHiking, 
  onCancelHike, 
  onUnequipItem,
  gold,
  onShopClick,
  onLocationClick,
  health,
  maxHealth,
  healthRegen
}) {
  const slotNames = {
    helmet: { name: 'Шлем', icon: '🪖' },
    amulet: { name: 'Амулет', icon: '📿' },
    chest: { name: 'Нагрудник', icon: '👕' },
    ring: { name: 'Кольцо', icon: '💍' },
    weapon: { name: 'Оружие', icon: '⚔️' },
    shield: { name: 'Щит', icon: '🛡️' },
    legs: { name: 'Штаны', icon: '👖' },
    boots: { name: 'Обувь', icon: '👢' }
  };

  const totalDefense = Object.values(equipment)
    .filter(item => item && item.defense)
    .reduce((sum, item) => sum + item.defense, 0);

  const totalAttack = Object.values(equipment)
    .filter(item => item && item.attack)
    .reduce((sum, item) => sum + item.attack, 0);

  const totalLuck = Object.values(equipment)
    .filter(item => item && item.luck)
    .reduce((sum, item) => sum + item.luck, 0);

  return (
    <div className="character">
      <div className="character-header">
        <div className="character-portrait">
          <div className="character-icon">🧙‍♂️</div>
          <div className="character-stats">
            <div className="health-bar">
              <div 
                className={`health-fill ${health < 30 ? 'health-low' : ''}`} 
                style={{ width: `${(health / maxHealth) * 100}%` }}
              />
              <div className="health-text">
                {health.toFixed(1)}/{maxHealth} HP
              </div>
            </div>
            <div className="stats-row">
              <div className="stat" data-type="attack">⚔️ {totalAttack}</div>
              <div className="stat" data-type="defense">🛡️ {totalDefense}</div>
              <div className={`stat ${totalLuck >= 0 ? 'positive' : 'negative'}`} data-type="luck">
                ☘️ {totalLuck > 0 ? '+' : ''}{totalLuck}
              </div>
              <div className="stat" data-type="regen">
                ❤️‍🩹 {healthRegen.toFixed(1)}/сек
              </div>
            </div>
          </div>
        </div>
        <div className="character-actions">
          <div className="gold">💰 {gold}</div>
          <button onClick={onShopClick}>Магазин 🏪</button>
          <button onClick={onLocationClick}>Выбрать локацию 🗺️</button>
          <button onClick={isHiking ? onCancelHike : onHikeClick}>
            {isHiking ? 'Отменить поход ⚔️' : 'В поход! ⚔️'}
          </button>
        </div>
      </div>

      <div className="equipment-grid">
        {Object.entries(slotNames).map(([slot, item]) => (
          <div key={slot} className="equipment-slot">
            <div className="slot-label">{item.name}</div>
            {equipment[slot] ? (
              <div className="equipped-item" onClick={() => onUnequipItem(slot, equipment[slot])}>
                <span className="item-icon">{equipment[slot].icon}</span>
                <span className="item-name">{equipment[slot].name}</span>
              </div>
            ) : (
              <div className="empty-slot">
                <span className="empty-icon">{item.icon}</span>
                <span>Пусто</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Character;
