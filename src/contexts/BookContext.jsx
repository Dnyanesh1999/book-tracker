import { createContext, useReducer, useEffect } from "react";
import { BookReducer, initialState } from "./BookReducer";

export const BookContext = createContext();

const initializer = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("bookState"));
    if (stored) {
      return {
        ...initialState,
        cart: stored.cart || [],
        favorites: stored.favorites || [],
      };
    }
  } catch (e) {
    console.error("Failed to parse bookState from localStorage", e);
  }
  return initialState;
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem(
      "bookState",
      JSON.stringify({ cart: state.cart, favorites: state.favorites })
    );
  }, [state.cart, state.favorites]);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
