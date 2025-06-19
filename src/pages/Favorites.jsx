import { Box, Typography, Grid } from "@mui/material";
import { useContext } from "react";
import { BookContext } from "../contexts/BookContext";
import BookCard from "../components/BookCard";

const Favorites = () => {
  const { state } = useContext(BookContext);
  const { favorites } = state;

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={6}
        sx={{ color: "primary.main", fontWeight: 500 }}
      >
        Your Favorite Books ❤️
      </Typography>

      {favorites.length === 0 ? (
        <Typography
          variant="h6"
          textAlign="center"
          mt={5}
          sx={{ color: "text.default" }}
        >
          You haven’t added any favorites yet.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {favorites.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.key}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
