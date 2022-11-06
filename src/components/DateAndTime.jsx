import React, { useEffect, useState } from 'react'

export default function DateAndTime() {
  const[currentTime, setCurrentTime] = useState('');

  useEffect(()=> {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  },[]);

  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const tempMonth = date.getMonth() + 1;
    const tempDay = date.getDate();
    const month = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
    const day = tempDay < 10 ? `0${tempDay}` : tempDay;
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <span className="date-time">{getDate()}</span>
      <span className="date-time">{currentTime}</span>
    </div>
  );
}
