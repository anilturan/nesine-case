import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const BasketContext = createContext({
    basket: [],
    total: 0,
    addBasketItem: () => {}
  });

export function useBasket() {
  return useContext(BasketContext);
}

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (basket?.length === 0) {
      setTotal(0);
      return;
    }

    const grandTotal = basket?.reduce((prevValue, currentValue) => {
      return prevValue * currentValue.value;
    }, 1);
    setTotal(grandTotal);
  }, [basket]);

  const addBasketItem = useCallback(async (id, value, desc) => {
    const indexToDelete = basket?.findIndex((item) => item.id === id);
    if (indexToDelete !== -1) {
      setBasket((prevArray) => prevArray.filter((item) => item.id !== id));
    } else {
      setBasket((prevArray) => [...prevArray, { id, value, desc }]);
    }
  },[basket]);

  const context = useMemo(
    () => ({ basket, addBasketItem, total }),
    [basket, addBasketItem, total]
  );
  
  return (
    <BasketContext.Provider value={context}>{children}</BasketContext.Provider>
  );
}
