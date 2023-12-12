import React, { useState } from 'react';

const Slider = ({ min, max, value1, value2, onChange1, onChange2 }) => {
  const [thumbPosition1, setThumbPosition1] = useState({
    left: value1 / (max - min) * 100,
  });
  const [thumbPosition2, setThumbPosition2] = useState({
    right: (max - value2) / (max - min) * 100,
  });

  const handleDragStart1 = (event) => {
    event.preventDefault();
    const touch = event.touches ? event.touches[0] : event;
    document.addEventListener('touchmove', handleDrag1, { passive: true });
    document.addEventListener('mouseup', handleDragEnd1);
    document.addEventListener('touchend', handleDragEnd1);
    handleDrag1({ clientX: touch.clientX });
  };

  const handleDrag1 = (event) => {
    const newLeft = Math.max(
      0,
      Math.min(100 - thumbPosition2.right, event.clientX / document.body.clientWidth * 100)
    );
    setThumbPosition1({ left: newLeft });
    onChange1(Math.round((newLeft * (max - min)) / 100));
  };

  const handleDragEnd1 = () => {
    document.removeEventListener('touchmove', handleDrag1);
    document.removeEventListener('mouseup', handleDragEnd1);
  };

  const handleDragStart2 = (event) => {
    event.preventDefault();
    const touch = event.touches ? event.touches[0] : event;
    document.addEventListener('touchmove', handleDrag2, { passive: true });
    document.addEventListener('mouseup', handleDragEnd2);
    document.addEventListener('touchend', handleDragEnd2);
    handleDrag2({ clientX: touch.clientX });
  };

  const handleDrag2 = (event) => {
    const newRight = Math.max(
      thumbPosition1.left,
      Math.min(100, 100 - event.clientX / document.body.clientWidth * 100)
    );
    setThumbPosition2({ right: newRight });
    onChange2(Math.round((max - newRight * (max - min)) / 100));
  };

  const handleDragEnd2 = () => {
    document.removeEventListener('touchmove', handleDrag2);
    document.removeEventListener('mouseup', handleDragEnd2);
  };

  const style = {
    width: '100%',
    height: '20px',
    backgroundColor: '#ddd',
    borderRadius: '5px',
    position: 'relative',
  };

  const thumbStyle = {
    position: 'absolute',
    top: 0,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#333',
    cursor: 'pointer',
  };

  return (
    <div style={style}>
      <div style={{ ...thumbStyle, left: `${thumbPosition1.left}%` }} onMouseDown={handleDragStart1} onTouchStart={handleDragStart1} />
      <div style={{ ...thumbStyle, right: `${thumbPosition2.right}%` }} onMouseDown={handleDragStart2} onTouchStart={handleDragStart2} />
    </div>
  );
};

export default function Sliders() {
  const [currentValue1, setCurrentValue1] = useState(50);
  const [currentValue2, setCurrentValue2] = useState(75);

  const handleChange1 = (newValue) => {
    setCurrentValue1(newValue);
  };

  const handleChange2 = (newValue) => {
    setCurrentValue2(newValue);
  };

  return (
    <div>
      <h2>Current Value 1: {Math.round(currentValue1)}</h2>
      <h2>Current Value 2: {Math.round(currentValue2)}</h2>
      <Slider
        min={0}
        max={100}
        value1={currentValue1}
        value2={currentValue2}
        onChange1={handleChange1}
        onChange2={handleChange2}
      />
    </div>
  );
}
