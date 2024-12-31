import React from 'react';
import './GameOver.css';

const GameOver = ({ onRestart }) => {
  return (
    <div className="game-over-overlay">
      <div className="game-over-container">
        <h2>Игра окончена</h2>
        <p>Ваш герой погиб в походе</p>
        <button className="restart-button" onClick={onRestart}>
          Начать заново 🔄
        </button>
      </div>
    </div>
  );
};

export default GameOver; 