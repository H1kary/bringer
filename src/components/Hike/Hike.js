import React, { useState } from 'react';
import './Hike.css';
import { usePopupClose } from '../../hooks/usePopupClose';

const Hike = ({ isOpen, onClose, onStartHike, isHiking }) => {
  const [selectedTime, setSelectedTime] = useState(0.17);
  const [autoHike, setAutoHike] = useState(false);
  const popupRef = usePopupClose(isOpen, onClose);

  const handleStartHike = () => {
    if (isHiking) return;
    onStartHike(selectedTime, autoHike);
    onClose();
  };

  if (!isOpen || isHiking) return null;

  return (
    <div className="hike-overlay popup-overlay">
      <div className="hike-popup" ref={popupRef}>
        <h3>Выберите длительность похода</h3>
        <select 
          value={selectedTime} 
          onChange={(e) => setSelectedTime(Number(e.target.value))}
        >
          <option value={0.08}>5 секунд</option>
          <option value={0.17}>10 секунд</option>
          <option value={0.5}>30 секунд</option>
          <option value={1}>1 минута</option>
          <option value={3}>3 минуты</option>
          <option value={5}>5 минут</option>
        </select>
        <div className="auto-hike-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={autoHike}
              onChange={(e) => setAutoHike(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <span className="auto-hike-label">Автопоход</span>
        </div>
        <div className="hike-buttons">
          <button onClick={handleStartHike}>Начать поход</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default Hike;
