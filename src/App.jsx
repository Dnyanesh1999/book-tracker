import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookProvider } from "./contexts/BookContext.jsx";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Appbar.jsx";
import BookDetail from "./components/BookDetail";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BookProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/book/*" element={<BookDetail />} />
          </Routes>
        </Router>
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;
