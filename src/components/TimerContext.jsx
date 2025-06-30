import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [finalTime, setFinalTime] = useState(null);
  const intervalRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const isOnLevel1 = location.pathname === '/Level1';

    if (isOnLevel1) {
      // Reset timer when on Level1 (refresh or direct visit)
      localStorage.removeItem('startTime');
      localStorage.removeItem('isRunning');
      setSeconds(0);
      setFinalTime(null);
      setRunning(true);
      localStorage.setItem('startTime', Date.now().toString());
      localStorage.setItem('isRunning', 'true');
    } else {
      // Rehydrate timer from localStorage
      const savedStart = localStorage.getItem('startTime');
      const isRunning = localStorage.getItem('isRunning');

      if (isRunning && savedStart) {
        const elapsed = Math.floor(
          (Date.now() - parseInt(savedStart, 10)) / 1000
        );
        setSeconds(elapsed);
        setRunning(true);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (running && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running]);

  const startTimer = () => {
    if (!running) {
      const existingStart = localStorage.getItem('startTime');
      if (!existingStart) {
        localStorage.setItem('startTime', Date.now().toString());
      }
      localStorage.setItem('isRunning', 'true');
      setRunning(true);
    }
  };

  const stopTimer = () => {
    setRunning(false);
    setFinalTime(seconds);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    localStorage.removeItem('startTime');
    localStorage.removeItem('isRunning');
  };

  const resetTimer = () => {
    setSeconds(0);
    setFinalTime(null);
    setRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    localStorage.removeItem('startTime');
    localStorage.removeItem('isRunning');
  };

  return (
    <TimerContext.Provider
      value={{ seconds, finalTime, startTimer, stopTimer, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
