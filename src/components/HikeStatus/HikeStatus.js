import React, { useState, useEffect } from 'react';
import './HikeStatus.css';

const HikeStatus = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const getTimeLeft = () => {
      const now = new Date();
      const timeLeft = endTime - now;
      
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Обновляем время сразу
    setTimeLeft(getTimeLeft());

    // Обновляем время каждую секунду
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    // Очищаем интервал при размонтировании
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="hike-status">
      <div className="hike-status-content">
        <span className="hike-icon">🚶</span>
        <span className="time-left">{timeLeft}</span>
      </div>
    </div>
  );
};

export default HikeStatus; 