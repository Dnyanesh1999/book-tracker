import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Snackbar,
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import { useContext, useState } from "react";
import { BookContext } from "../contexts/BookContext.jsx";
import BookCard from "../components/BookCard.jsx";
import PaginationControls from "../components/PaginationControls.jsx";

const Home = () => {
  const theme = useTheme();
  const { state, dispatch } = useContext(BookContext);
  const { books, loading, totalBooks, currentPage } = state;

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSearch = async (searchTerm, page = 1) => {
    if (!searchTerm.trim()) return;

    try {
      dispatch({ type: "SET_LOADING" });

      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchTerm
        )}&page=${page}`
      );
      const data = await res.json();

      if (!data.docs || data.docs.length === 0) {
        throw new Error("No books found");
      }

      dispatch({
        type: "SET_BOOKS",
        payload: {
          books: data.docs.slice(0, 12), // render 12 per page max
          totalBooks: data.numFound,
          currentPage: page,
          searchTerm, // pass this explicitly!
        },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      setSnackbarOpen(true);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          color: "primary.main",
          fontSize: "45px",
          fontWeight: 400,
          textAlign: "center",
          mt: 4,
        }}
      >
        FIND YOUR NEXT READ
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 4,
          color: theme.palette.text.default,
          fontSize: "24px",
        }}
      >
        Search for books by title or author. Add them to your favorites or cart.
      </Typography>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : books.length > 0 ? (
        <>
          <Grid container spacing={6} justifyContent="center">
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.key}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
          <PaginationControls
            currentPage={currentPage}
            totalBooks={totalBooks}
            onPageChange={(page) =>
              handleSearch(state.lastSearchTerm || "", page)
            }
          />
        </>
      ) : (
        <Typography
          align="center"
          mt={5}
          variant="h6"
          sx={{ color: "text.default" }}
        >
          Search for books to begin!
        </Typography>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Failed to fetch books"
      />
    </Box>
  );
};

export default Home;
