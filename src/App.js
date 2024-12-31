import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Character from './components/Character/Character';
import Hike from './components/Hike/Hike';
import Items from './components/Items/Items';
import HikeStatus from './components/HikeStatus/HikeStatus';
import Shop from './components/Shop/Shop';
import HikeResults from './components/HikeResults/HikeResults';
import ChooseLocation from './components/ChooseLocation/ChooseLocation';
import GameOver from './components/GameOver/GameOver';
import FoundSave from './components/FoundSave/FoundSave';

// Определяем possibleItems вне компонента
const POSSIBLE_ITEMS = [
  // Ресурсы
  { name: "Гриб", icon: "🍄", type: "resource", rarity: "common", price: 1 },
  { name: "Ягода", icon: "🫐", type: "resource", rarity: "common", price: 1 },
  { name: "Древесина", icon: "🪵", type: "resource", rarity: "common", price: 2 },
  { name: "Железная руда", icon: "⛰️", type: "resource", rarity: "common", price: 3 },
  { name: "Кристалл", icon: "💎", type: "resource", rarity: "uncommon", price: 5 },
  { name: "Золотая руда", icon: "✨", type: "resource", rarity: "uncommon", price: 8 },

  // Шлемы
  { name: "Кожаный шлем", icon: "🪖", type: "helmet", defense: 1, rarity: "common", price: 10 },
  { name: "Стальной шлем", icon: "⛑️", type: "helmet", defense: 2, rarity: "uncommon", price: 25 },
  { name: "Мифриловый шлем", icon: "🪖", type: "helmet", defense: 4, rarity: "rare", price: 50 },
  { name: "Зачарованный шлем", icon: "🪖", type: "helmet", defense: 3, attack: 1, luck: 1, rarity: "epic", price: 100 },

  // Нагрудники
  { name: "Кожаная броня", icon: "👕", type: "chest", defense: 2, rarity: "common", price: 10 },
  { name: "Стальная броня", icon: "🥋", type: "chest", defense: 4, rarity: "uncommon", price: 25 },
  { name: "Мифриловая броня", icon: "👕", type: "chest", defense: 6, rarity: "rare", price: 50 },
  { name: "Броня берсерка", icon: "👕", type: "chest", defense: 3, attack: 2, rarity: "epic", price: 100 },
  { name: "Роба мага", icon: "👕", type: "chest", defense: 2, attack: 3, luck: 2, rarity: "epic", price: 100 },

  // Штаны
  { name: "Кожаные штаны", icon: "👖", type: "legs", defense: 1, rarity: "common", price: 10 },
  { name: "Стальные поножи", icon: "🩳", type: "legs", defense: 3, rarity: "uncommon", price: 25 },
  { name: "Мифриловые поножи", icon: "👖", type: "legs", defense: 5, rarity: "rare", price: 50 },
  { name: "Зачарованные поножи", icon: "👖", type: "legs", defense: 2, attack: 1, rarity: "epic", price: 100 },

  // Ботинки
  { name: "Кожаные ботинки", icon: "👢", type: "boots", defense: 1, rarity: "common", price: 10 },
  { name: "Стальные сапоги", icon: "🥾", type: "boots", defense: 2, rarity: "uncommon", price: 25 },
  { name: "Мифриловые сапоги", icon: "👢", type: "boots", defense: 4, rarity: "rare", price: 50 },
  { name: "Сапоги скорости", icon: "👢", type: "boots", defense: 1, attack: 2, luck: 1, rarity: "epic", price: 100 },

  // Оружие
  { name: "Деревянный меч", icon: "🗡️", type: "weapon", attack: 1, rarity: "common", price: 10 },
  { name: "Стальной меч", icon: "⚔️", type: "weapon", attack: 3, rarity: "uncommon", price: 25 },
  { name: "Мифриловый меч", icon: "⚔️", type: "weapon", attack: 5, rarity: "rare", price: 50 },
  { name: "Посох мага", icon: "⚔️", type: "weapon", attack: 4, defense: 1, rarity: "epic", price: 100 },
  { name: "Топор берсерка", icon: "⚔️", type: "weapon", attack: 6, rarity: "epic", price: 100 },
  { name: "Проклятый клинок", icon: "⚔️", type: "weapon", attack: 7, defense: -2, luck: -1, rarity: "legendary", price: 200 },

  // Щиты
  { name: "Деревянный щит", icon: "🛡️", type: "shield", defense: 1, rarity: "common", price: 10 },
  { name: "Стальной щит", icon: "🔰", type: "shield", defense: 2, rarity: "uncommon", price: 25 },
  { name: "Мифриловый щит", icon: "🛡️", type: "shield", defense: 4, rarity: "rare", price: 50 },
  { name: "Шипованный щит", icon: "🛡️", type: "shield", defense: 2, attack: 1, rarity: "epic", price: 100 },
  { name: "Магический барьер", icon: "🛡️", type: "shield", defense: 3, attack: 1, rarity: "legendary", price: 200 },

  // Амулеты
  { name: "Медный амулет", icon: "📿", type: "amulet", defense: 1, luck: 1, rarity: "common", price: 15 },
  { name: "Серебряный амулет", icon: "📿", type: "amulet", defense: 2, luck: 2, rarity: "uncommon", price: 35 },
  { name: "Золотой амулет", icon: "📿", type: "amulet", defense: 2, luck: 3, rarity: "rare", price: 75 },
  { name: "Амулет мудрости", icon: "📿", type: "amulet", defense: 3, attack: 1, luck: 2, rarity: "epic", price: 150 },
  { name: "Амулет дракона", icon: "🔮", type: "amulet", defense: 3, attack: 3, luck: 2, rarity: "legendary", price: 300 },

  // Кольца
  { name: "Медное кольцо", icon: "💍", type: "ring", attack: 1, rarity: "common", price: 15 },
  { name: "Серебряное кольцо", icon: "💍", type: "ring", attack: 2, luck: 1, rarity: "uncommon", price: 35 },
  { name: "Золотое кольцо", icon: "💍", type: "ring", attack: 2, luck: 2, rarity: "rare", price: 75 },
  { name: "Кольцо силы", icon: "💍", type: "ring", attack: 4, defense: -1, rarity: "epic", price: 150 },
  { name: "Кольцо власти", icon: "👑", type: "ring", attack: 3, defense: 2, luck: 2, rarity: "legendary", price: 300 },
];

// Добавляем массив locations на уровне компонента
const locations = [
  {
    id: 'forest',
    name: 'Тёмный лес',
    icon: '🌲',
    description: 'Густой лес, полный грибов и ягод. Относительно безопасное место для новичков.',
    difficulty: 1,
    rewards: [
      { name: 'Лесные грибы', icon: '🍄', price: 1, type: 'food', healing: 15 },
      { name: 'Сочные ягоды', icon: '🫐', price: 1, type: 'food', healing: 10 },
      { name: 'Древесина', icon: '🪵', price: 2, type: 'resource' },
      { name: 'Кожаный шлем', icon: '🪖', rarity: 'common', type: 'helmet', defense: 1, price: 10 },
      { name: 'Деревянный щит', icon: '🛡️', rarity: 'common', type: 'shield', defense: 1, price: 10 },
      { name: 'Кольцо жизни', icon: '💍', rarity: 'uncommon', type: 'ring', healthRegen: 0.1, price: 50 },
      { name: 'Амулет регенерации', icon: '📿', rarity: 'rare', type: 'amulet', healthRegen: 0.2, price: 100 }
    ],
    minGold: 1,
    maxGold: 5
  },
  {
    id: 'cave',
    name: 'Заброшенные пещеры',
    icon: '⛰️',
    description: 'Древние пещеры, богатые рудой и кристаллами. Будьте осторожны в темноте!',
    difficulty: 2,
    rewards: [
      { name: 'Железная руда', icon: '⛰️', price: 3, type: 'resource' },
      { name: 'Кристаллы', icon: '💎', price: 5, type: 'resource' },
      { name: 'Целебные кристаллы', icon: '💎', price: 8, type: 'food', healing: 25 },
      { name: 'Стальной меч', icon: '⚔️', rarity: 'uncommon', type: 'weapon', attack: 3, price: 25 },
      { name: 'Серебряное кольцо', icon: '💍', rarity: 'uncommon', type: 'ring', attack: 2, luck: 1, price: 35 }
    ],
    minGold: 3,
    maxGold: 8
  },
  {
    id: 'ruins',
    name: 'Древние руины',
    icon: '🏛️',
    description: 'Руины древней цивилизации. Здесь можно найти ценные артефакты.',
    difficulty: 3,
    rewards: [
      { name: 'Древние свитки', icon: '📜', price: 10, type: 'resource' },
      { name: 'Драгоценности', icon: '💎', price: 15, type: 'resource' },
      { name: 'Древнее зелье', icon: '🧪', price: 20, type: 'food', healing: 40 },
      { name: 'Золотой амулет', icon: '📿', rarity: 'rare', type: 'amulet', defense: 2, luck: 3, price: 75 },
      { name: 'Зачарованный шлем', icon: '🪖', rarity: 'epic', type: 'helmet', defense: 3, attack: 1, luck: 1, price: 100 },
      { name: 'Посох мага', icon: '⚔️', rarity: 'rare', type: 'weapon', attack: 4, defense: 1, price: 100 }
    ],
    minGold: 5,
    maxGold: 12
  },
  {
    id: 'mountain',
    name: 'Туманные горы',
    icon: '🗻',
    description: 'Опасные горные тропы с редкими ресурсами и сильными противниками.',
    difficulty: 4,
    rewards: [
      { name: 'Драконья чешуя', icon: '🐉', price: 20, type: 'resource' },
      { name: 'Мифриловая руда', icon: '💠', price: 25, type: 'resource' },
      { name: 'Драконье сердце', icon: '❤️', price: 50, type: 'food', healing: 100 },
      { name: 'Кольцо власти', icon: '👑', rarity: 'legendary', type: 'ring', attack: 3, defense: 2, luck: 2, price: 300 },
      { name: 'Мифриловый меч', icon: '⚔️', rarity: 'rare', type: 'weapon', attack: 5, price: 150 },
      { name: 'Амулет дракона', icon: '🔮', rarity: 'legendary', type: 'amulet', defense: 3, attack: 3, luck: 2, price: 300 }
    ],
    minGold: 8,
    maxGold: 15
  }
];

function App() {
  const [isHikeOpen, setIsHikeOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isHiking, setIsHiking] = useState(false);
  const [hikeEndTime, setHikeEndTime] = useState(null);
  const [equipment, setEquipment] = useState({
    helmet: null,
    amulet: null,
    chest: null,
    ring: null,
    weapon: null,
    shield: null,
    legs: null,
    boots: null
  });
  const [gold, setGold] = useState(0);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [hikeResults, setHikeResults] = useState(null);
  const [isLocationSelectOpen, setIsLocationSelectOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('forest');
  const [autoHikeTime, setAutoHikeTime] = useState(null);
  const [health, setHealth] = useState(100);
  const [maxHealth, setMaxHealth] = useState(100);
  const baseHealthRegen = 0.2; // Базовое восстановление здоровья в секунду
  const [isGameOver, setIsGameOver] = useState(false);
  const [showFoundSave, setShowFoundSave] = useState(false);

  // Рассчитываем общий бонус к восстановлению здоровья от экипировки
  const totalHealthRegen = useMemo(() => {
    return Object.values(equipment)
      .filter(item => item && item.healthRegen)
      .reduce((sum, item) => sum + item.healthRegen, baseHealthRegen);
  }, [equipment]);

  // Добавляем эффект для восстановления здоровья
  useEffect(() => {
    if (health < maxHealth) {
      const healingInterval = setInterval(() => {
        setHealth(prevHealth => {
          const newHealth = Math.min(maxHealth, prevHealth + totalHealthRegen);
          return Number(newHealth.toFixed(1));
        });
      }, 1000);

      return () => clearInterval(healingInterval);
    }
  }, [health, maxHealth, totalHealthRegen]);

  const shopItems = useMemo(() => [
    // Предметы, доступные в магазине
    { name: "Медный амулет", icon: "📿", type: "amulet", defense: 1, luck: 1, rarity: "common", price: 15 },
    { name: "Серебряный амулет", icon: "📿", type: "amulet", defense: 2, luck: 2, rarity: "uncommon", price: 35 },
    { name: "Золотой амулет", icon: "📿", type: "amulet", defense: 2, luck: 3, rarity: "rare", price: 75 },
    { name: "Амулет мудрости", icon: "📿", type: "amulet", defense: 3, attack: 1, luck: 2, rarity: "epic", price: 150 },
    { name: "Амулет дракона", icon: "🔮", type: "amulet", defense: 3, attack: 3, luck: 2, rarity: "legendary", price: 300 },
    { name: "Медное кольцо", icon: "💍", type: "ring", attack: 1, rarity: "common", price: 15 },
    { name: "Серебряное кольцо", icon: "💍", type: "ring", attack: 2, luck: 1, rarity: "uncommon", price: 35 },
    { name: "Золотое кольцо", icon: "💍", type: "ring", attack: 2, luck: 2, rarity: "rare", price: 75 },
    { name: "Кольцо силы", icon: "💍", type: "ring", attack: 4, defense: -1, rarity: "epic", price: 150 },
    { name: "Кольцо власти", icon: "👑", type: "ring", attack: 3, defense: 2, luck: 2, rarity: "legendary", price: 300 },
    { name: 'Кольцо вампира', icon: '💍', type: 'ring', rarity: 'epic', healthRegen: 0.3, price: 200 },
    { name: 'Проклятый амулет', icon: '📿', type: 'amulet', rarity: 'rare', healthRegen: -0.1, attack: 5, price: 150 }
  ], []);

  // Функция перезапуска игры
  const handleRestart = () => {
    setHealth(100);
    setGold(0);
    setItems([]);
    setEquipment({});
    setIsHiking(false);
    setHikeEndTime(null);
    setAutoHikeTime(null);
    setHikeResults(null);
    setIsGameOver(false);
  };

  const completeHike = () => {
    setIsHiking(false);
    
    const timeInMinutes = Math.abs(Math.floor((new Date() - hikeEndTime) / 60000));
    
    const location = locations.find(loc => loc.id === currentLocation);
    const baseDamage = Math.random() * 10 + 5;
    const timeDamage = timeInMinutes * 2;
    const locationDamage = location.difficulty * 2;
    const totalDamage = baseDamage + timeDamage + locationDamage;

    // Применяем урон и проверяем окончание игры
    setHealth(prevHealth => {
      const newHealth = Math.max(0, prevHealth - totalDamage);
      if (newHealth <= 0) {
        setIsGameOver(true);
        setAutoHikeTime(null);
        setHikeEndTime(null);
        return 0;
      }
      return Number(newHealth.toFixed(1));
    });

    // Если игра окончена, прерываем функцию
    if (health - totalDamage <= 0) {
      return;
    }

    // Генерируем золото и предметы
    const baseGold = Math.floor(Math.random() * (location.maxGold - location.minGold + 1)) + location.minGold;
    const timeBonus = Math.floor(timeInMinutes * 2);
    const totalGold = baseGold + timeBonus;
    
    setGold(prevGold => prevGold + totalGold);

    // Генерируем предметы
    const newItems = [];
    const itemCount = Math.floor(Math.random() * 3) + 1; // 1-3 предмета

    for (let i = 0; i < itemCount; i++) {
      const item = { ...location.rewards[Math.floor(Math.random() * location.rewards.length)] };
      if (Math.random() < 0.3) { // 30% шанс получить несколько предметов
        item.quantity = Math.floor(Math.random() * 3) + 2; // 2-4 предмета
      } else {
        item.quantity = 1;
      }
      newItems.push(item);
    }

    // Добавляем предметы в инвентарь
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      newItems.forEach(newItem => {
        const existingItem = updatedItems.find(item => 
          item.name === newItem.name && 
          item.type === newItem.type &&
          item.healing === newItem.healing &&
          item.healthRegen === newItem.healthRegen
        );
        
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          updatedItems.push(newItem);
        }
      });
      return updatedItems;
    });

    // Показываем результаты похода
    setHikeResults({
      items: newItems,
      gold: totalGold
    });

    // Сбрасываем время окончания похода
    setHikeEndTime(null);

    // Проверяем автопоход
    if (autoHikeTime !== null && health - totalDamage > 0) {
      startHike(autoHikeTime, true);
    } else {
      setHikeEndTime(null);
      setIsHiking(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isHiking && hikeEndTime && new Date() >= hikeEndTime) {
        completeHike();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isHiking, hikeEndTime, completeHike]);

  const handleHikeClick = () => {
    if (isHiking) return;
    setIsHikeOpen(true);
  };

  const startHike = (time, autoHike) => {
    if (health <= 0) return;
    
    setIsHiking(true);
    const endTime = new Date(new Date().getTime() + time * 60000);
    setHikeEndTime(endTime);
    if (autoHike) {
      setAutoHikeTime(time);
    }
  };

  const cancelHike = () => {
    setIsHiking(false);
    setHikeEndTime(null);
    setAutoHikeTime(null);
  };

  const handleEquipItem = (item) => {
    if (item.type === 'resource') return;

    // Сохраняем текущий предмет из слота
    const currentItem = equipment[item.type];

    // Обновляем экипировку
    setEquipment(prev => ({
      ...prev,
      [item.type]: { ...item, quantity: undefined } // Убираем quantity у надетого предмета
    }));

    // Удаляем новый предмет из инвентаря или уменьшаем quantity
    setItems(prev => {
      const newItems = prev.map(i => {
        if (i === item) {
          if (i.quantity > 1) {
            return { ...i, quantity: i.quantity - 1 };
          }
          return null;
        }
        return i;
      }).filter(Boolean);

      // Если в слоте был предмет, добавляем его в инвентарь
      if (currentItem) {
        // Проверяем, есть ли такой же предмет в инвентаре
        const existingItem = newItems.find(i =>
          i.name === currentItem.name &&
          i.type === currentItem.type &&
          i.defense === currentItem.defense &&
          i.attack === currentItem.attack &&
          i.luck === currentItem.luck
        );

        if (existingItem) {
          // Если есть, увеличиваем количество
          existingItem.quantity = (existingItem.quantity || 1) + 1;
          return newItems;
        } else {
          // Если нет, добавляем новый предмет с quantity = 1
          return [...newItems, { ...currentItem, quantity: 1 }];
        }
      }
      return newItems;
    });
  };

  const handleUnequipItem = (slotId, item) => {
    // Сначала снимаем предмет
    setEquipment(prev => ({
      ...prev,
      [slotId]: null
    }));

    // Добавляем предмет в инвентарь
    setItems(prev => {
      // Ищем такой же предмет в инвентаре
      const existingItem = prev.find(i =>
        i.name === item.name &&
        i.type === item.type &&
        i.defense === item.defense &&
        i.attack === item.attack &&
        i.luck === item.luck
      );

      if (existingItem) {
        // Если нашли, увеличиваем количество
        return prev.map(i =>
          i === existingItem
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        // Если не нашли, добавляем новый предмет с quantity = 1
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleSellItem = (item, quantity) => {
    setGold(prev => prev + item.price * quantity);

    setItems(prev => {
      if (item.quantity > quantity) {
        return prev.map(i =>
          i === item
            ? { ...i, quantity: i.quantity - quantity }
            : i
        );
      } else {
        return prev.filter(i => i !== item);
      }
    });
  };

  const handleBuyItem = (item) => {
    if (gold >= item.price) {
      setGold(prevGold => prevGold - item.price);
      setItems(prevItems => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  // Добавляем эффект для обновления атрибута data-location
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.setAttribute('data-location', currentLocation);
    }
  }, [currentLocation]);

  const useItem = (item) => {
    if (item.type === 'food' && health < maxHealth) {
      const newHealth = Math.min(maxHealth, health + item.healing);
      setHealth(newHealth);
      
      // Удаляем использованный предмет
      setItems(prevItems => {
        const itemIndex = prevItems.findIndex(i => 
          i.name === item.name && 
          i.type === item.type && 
          i.healing === item.healing
        );
        
        if (itemIndex === -1) return prevItems;
        
        const newItems = [...prevItems];
        if (newItems[itemIndex].quantity > 1) {
          newItems[itemIndex] = {
            ...newItems[itemIndex],
            quantity: newItems[itemIndex].quantity - 1
          };
        } else {
          newItems.splice(itemIndex, 1);
        }
        
        return newItems;
      });
    }
  };

  useEffect(() => {
    if (hikeResults) {
      const timer = setTimeout(() => {
        setHikeResults(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hikeResults]);

  // Проверяем сохранение при запуске
  useEffect(() => {
    console.log('Инициализация приложения');
    const savedState = localStorage.getItem('gameState');
    
    if (!savedState) {
      console.log('Сохранение не найдено, начинаем новую игру');
      return;
    }

    try {
      const parsed = JSON.parse(savedState);
      console.log('Найдено сохранение:', parsed);
      
      // Проверяем, есть ли в сохранении какой-то прогресс
      const hasProgress = 
        parsed.gold > 0 || 
        (parsed.items && parsed.items.length > 0) || 
        (parsed.equipment && Object.keys(parsed.equipment).length > 0) || 
        parsed.health !== 100;

      if (hasProgress) {
        console.log('Найден прогресс, показываем диалог');
        setShowFoundSave(true);
      } else {
        console.log('Прогресс не найден, начинаем новую игру');
        startNewGame();
      }
    } catch (error) {
      console.error('Ошибка при проверке сохранения:', error);
      startNewGame();
    }
  }, []);

  // Загрузка сохранения
  const loadGame = () => {
    console.log('Загружаем сохранение');
    const savedState = localStorage.getItem('gameState');
    
    if (!savedState) {
      console.error('Сохранение не найдено при загрузке');
      return;
    }

    try {
      const parsed = JSON.parse(savedState);
      console.log('Загружаем состояние:', parsed);

      // Загружаем все состояния
      setHealth(parsed.health ?? 100);
      setMaxHealth(parsed.maxHealth ?? 100);
      setGold(parsed.gold ?? 0);
      setItems(parsed.items ?? []);
      setEquipment(parsed.equipment ?? {});
      setCurrentLocation(parsed.currentLocation ?? 'forest');
      setIsHiking(false); // Всегда начинаем не в походе
      setHikeEndTime(null);
      setAutoHikeTime(null);
      setIsGameOver(false);

      // Закрываем диалог сохранения
      setShowFoundSave(false);

      console.log('Сохранение успешно загружено');
    } catch (error) {
      console.error('Ошибка при загрузке сохранения:', error);
      startNewGame();
    }
  };

  // Новая игра
  const startNewGame = () => {
    console.log('Начинаем новую игру');
    localStorage.removeItem('gameState');
    
    setHealth(100);
    setMaxHealth(100);
    setGold(0);
    setItems([]);
    setEquipment({});
    setCurrentLocation('forest');
    setIsHiking(false);
    setHikeEndTime(null);
    setAutoHikeTime(null);
    setIsGameOver(false);
    setShowFoundSave(false);
  };

  // Сохранение игры
  const saveGame = useCallback(() => {
    if (showFoundSave) {
      console.log('Пропускаем сохранение во время показа диалога');
      return;
    }

    const gameState = {
      health,
      maxHealth,
      gold,
      items,
      equipment,
      currentLocation,
      isHiking,
      hikeEndTime: hikeEndTime?.getTime(),
      autoHikeTime
    };

    try {
      localStorage.setItem('gameState', JSON.stringify(gameState));
      console.log('Игра сохранена');
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  }, [health, maxHealth, gold, items, equipment, currentLocation, isHiking, hikeEndTime, autoHikeTime, showFoundSave]);

  // Автосохранение
  useEffect(() => {
    if (!showFoundSave && health > 0) {
      const timer = setTimeout(saveGame, 1000); // Сохраняем с небольшой задержкой
      return () => clearTimeout(timer);
    }
  }, [saveGame, showFoundSave, health]);

  return (
    <div className="app-container">
      <div className="interface-container">
        <Character
          onHikeClick={() => setIsHikeOpen(true)}
          equipment={equipment}
          isHiking={isHiking}
          onCancelHike={cancelHike}
          onUnequipItem={handleUnequipItem}
          gold={gold}
          onShopClick={() => setIsShopOpen(true)}
          onLocationClick={() => setIsLocationSelectOpen(true)}
          health={health}
          maxHealth={maxHealth}
          healthRegen={totalHealthRegen}
        />
        <Hike
          isOpen={isHikeOpen}
          onClose={() => setIsHikeOpen(false)}
          onStartHike={startHike}
          isHiking={isHiking}
        />
        {isHiking && <HikeStatus endTime={hikeEndTime} />}
        <Items
          items={items}
          onEquipItem={handleEquipItem}
          onSellItem={handleSellItem}
          onUseItem={useItem}
        />
      </div>
      {isShopOpen && (
        <Shop
          items={shopItems}
          gold={gold}
          onBuyItem={handleBuyItem}
          onClose={() => setIsShopOpen(false)}
        />
      )}
      {hikeResults && (
        <HikeResults
          items={hikeResults.items}
          gold={hikeResults.gold}
          onClose={() => setHikeResults(null)}
        />
      )}
      <ChooseLocation
        isOpen={isLocationSelectOpen}
        onClose={() => setIsLocationSelectOpen(false)}
        onSelectLocation={setCurrentLocation}
        currentLocation={currentLocation}
        locations={locations}
      />
      {isGameOver && <GameOver onRestart={handleRestart} />}
      {showFoundSave && (
        <FoundSave
          onContinue={() => {
            console.log('Нажата кнопка продолжить');
            loadGame();
          }}
          onNewGame={() => {
            console.log('Нажата кнопка новой игры');
            startNewGame();
          }}
        />
      )}
    </div>
  );
}

export default App;
