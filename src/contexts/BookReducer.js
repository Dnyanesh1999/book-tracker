export const initialState = {
  books: [], // List of fetched books
  cart: [], // List of books in the cart
  favorites: [], // List of favorite books
  loading: false,
  error: null,
  totalBooks: 0,
  currentPage: 1,
  lastSearchTerm: "",
};

export const BookReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload.books,
        totalBooks: action.payload.totalBooks,
        currentPage: action.payload.currentPage,
        lastSearchTerm: action.payload.searchTerm || state.lastSearchTerm,
        loading: false,
        error: null,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.find((book) => book.key === action.payload.key)
          ? state.cart
          : [...state.cart, action.payload],
        loading: false,
        error: null,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((book) => book.key !== action.payload.key),
        loading: false,
        error: null,
      };

    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.find(
        (book) => book.key === action.payload.key
      );
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((book) => book.key !== action.payload.key)
          : [...state.favorites, action.payload],
      };
    }

    case "SET_LOADING":
      return { ...state, loading: true, error: null };

    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
};
