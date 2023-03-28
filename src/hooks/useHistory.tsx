import { useState, useEffect, useRef } from "react";

function useHistory<Type>(state: Type) {
  const [history, setHistory] = useState<Type[]>([]);
  const refPreviousValue = useRef<Type>();
  const PreviousValue = refPreviousValue.current;

  useEffect(() => {
    refPreviousValue.current = history.at(-1);
    if (state && state !== history.at(-1)) {
      setHistory([...history, state]);
    }
  }, [state]);

  const removeItem = (item: Type) => {
    const newHistory = [...history];
    const index = newHistory.findIndex((i) => i === item);
    if (index !== -1) {
      newHistory.splice(index, 1);
      setHistory(newHistory);
    }
  };
  const getPreviousValue = (n: number) => {
    return history.at(n);
  };

  const clear = () => {
    setHistory([]);
  };
  const length = history.length;
  return {
    getPreviousValue,
    PreviousValue,
    removeItem,
    length,
    history,
    clear
  };
}

export default useHistory;
