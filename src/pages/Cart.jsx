import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useMemo } from "react";
import { BookContext } from "../contexts/BookContext";

// Utility: Generate mock price
const getPriceFromKey = (key) => {
  const base = key.charCodeAt(0) + key.length;
  return (base % 50) + 150; // ₹150–₹199
};

const Cart = () => {
  const { state, dispatch } = useContext(BookContext);
  const { cart } = state;

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, book) => sum + getPriceFromKey(book.key), 0).toFixed(2),
    [cart]
  );

  const handleRemove = (book) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: book });
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <Box alignItems="center" sx={{ p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", mb: 4, color: "primary.main" }}
      >
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography
          variant="h6"
          mt={4}
          sx={{ textAlign: "center", color: "text.default" }}
        >
          Your cart is empty. Start adding some books!
        </Typography>
      ) : (
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: "1200px", mx: "auto" }}
        >
          {/* Left - Cart Items */}
          <Grid item xs={12} md={8}>
            <Box display="flex" flexDirection="column" gap={2}>
              {cart.map((book) => {
                const price = getPriceFromKey(book.key);
                return (
                  <Card
                    key={book.key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 1.5,
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                          : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                      }
                      alt={book.title}
                      sx={{
                        width: 80,
                        height: 100,
                        objectFit: "contain",
                        borderRadius: 1,
                        mr: 2,
                      }}
                    />
                    <CardContent sx={{ flex: 1, p: 0 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        noWrap
                        title={book.title}
                      >
                        {book.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {book.author_name?.[0] || "Unknown Author"}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 0.5, fontWeight: 500 }}
                      >
                        ₹{price}
                      </Typography>
                    </CardContent>
                    <Button
                      color="error"
                      onClick={() => handleRemove(book)}
                      startIcon={<DeleteIcon />}
                    >
                      Remove
                    </Button>
                  </Card>
                );
              })}
            </Box>
          </Grid>

          {/* Right - Summary */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
                position: "sticky",
                top: 100,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                Items: <strong>{cart.length}</strong>
              </Typography>
              <Typography variant="body1" mb={2}>
                Subtotal: <strong>₹{subtotal}</strong>
              </Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
                Proceed to Checkout
              </Button>
              <Button variant="outlined" color="error" fullWidth onClick={handleClearCart}>
                Clear Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
