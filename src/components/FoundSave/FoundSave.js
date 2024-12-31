import React from 'react';
import './FoundSave.css';

const FoundSave = ({ onContinue, onNewGame }) => {
  console.log('Рендерим FoundSave');
  
  const handleContinue = () => {
    console.log('Нажата кнопка продолжить');
    onContinue();
  };

  const handleNewGame = () => {
    console.log('Нажата кнопка новой игры');
    onNewGame();
  };

  return (
    <div className="found-save-overlay">
      <div className="found-save-container">
        <h2>Найдено сохранение</h2>
        <p>Обнаружено сохранение предыдущей игры. Хотите продолжить?</p>
        <div className="found-save-buttons">
          <button className="continue-button" onClick={handleContinue}>
            Продолжить игру 🎮
          </button>
          <button className="new-game-button" onClick={handleNewGame}>
            Начать заново 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundSave; 