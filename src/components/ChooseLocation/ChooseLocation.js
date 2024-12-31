import React from 'react';
import './ChooseLocation.css';
import { usePopupClose } from '../../hooks/usePopupClose';

const ChooseLocation = ({ isOpen, onClose, onSelectLocation, currentLocation, locations }) => {
  const popupRef = usePopupClose(isOpen, onClose);

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

  if (!isOpen) return null;

  return (
    <div className="location-overlay popup-overlay">
      <div className="location-container" ref={popupRef}>
        <h3>Выберите локацию</h3>
        <div className="locations-grid">
          {locations.map(location => (
            <div
              key={location.id}
              className={`location-card ${currentLocation === location.id ? 'selected' : ''}`}
              onClick={() => {
                onSelectLocation(location.id);
                onClose();
              }}
            >
              <div className="location-header">
                <span className="location-icon">{location.icon}</span>
                <span className="location-name">{location.name}</span>
              </div>
              <div className="location-difficulty">
                {'⭐'.repeat(location.difficulty)}
              </div>
              <p className="location-description">{location.description}</p>
              <div className="location-rewards">
                <div className="rewards-title">Возможные награды:</div>
                <div className="rewards-list">
                  {location.rewards.map((reward, index) => (
                    <span 
                      key={index} 
                      className={`reward-item ${reward.rarity || 'common'}`}
                      title={reward.rarity ? `${getRarityText(reward.rarity)}` : 'Обычный'}
                    >
                      {reward.icon} {reward.name}
                    </span>
                  ))}
                </div>
                <div className="gold-range">
                  💰 {location.minGold}-{location.maxGold} золота
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseLocation; 