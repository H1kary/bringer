import { useEffect, useRef } from 'react';

export const usePopupClose = (isEnabled, onClose) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (!isEnabled) return;

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isEnabled, onClose]);

  return popupRef;
}; 