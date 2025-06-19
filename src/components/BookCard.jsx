import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useContext, useState } from "react";
import { BookContext } from "../contexts/BookContext.jsx";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const { title, author_name, cover_i, key } = book;
  const imgUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  const { state, dispatch } = useContext(BookContext);
  const isFavorite = state.favorites.some((fav) => fav.key === key);

  const isInCart = state.cart.some((item) => item.key === book.key);

  console.log("cart:", state.cart);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const handleToggleFavorite = () => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: book,
    });
    setSnackbarMsg(
      isFavorite ? "Removed from Favorites" : "Added to Favorites"
    );
    setSnackbarOpen(true);
  };

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: book });
    setSnackbarMsg("Book added to cart ✅");
    setSnackbarOpen(true);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: "100%",
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 1,
        position: "relative",
      }}
    >
      <IconButton
        onClick={handleToggleFavorite}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: "rgba(255,255,255,0.8)",
          "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
        }}
      >
        {isFavorite ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <FavoriteBorder sx={{ color: "grey" }} />
        )}
      </IconButton>
      <CardActionArea>
        <CardMedia
          component="img"
          height="260"
          image={imgUrl}
          alt={title}
          sx={{
            objectFit: "contain",
            borderRadius: 2,
            p: 1,
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
          }}
        />

        <CardContent sx={{ pt: 2 }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            fontWeight={600}
            sx={{ minHeight: 50 }}
          >
            {title.length > 60 ? title.slice(0, 60) + "..." : title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {author_name?.[0] || "Unknown Author"}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Button
          size="small"
          variant="outlined"
          fullWidth
          component={Link}
          to={`/book${book.key}`}
        >
          Learn More
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </Button>
      </CardActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Card>
  );
};

export default BookCard;
