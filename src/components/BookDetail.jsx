import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  CardMedia,
  Button,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

const BookDetail = () => {
  const location = useLocation();
  const bookId = location.pathname.replace("/book/", "");

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/${bookId}.json`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Typography align="center" mt={6} color="error">
        Book not found
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto" }}>
      {/* === Section: Header === */}
      <Box textAlign="center" mb={4}>
        {book.covers && (
          <CardMedia
            component="img"
            image={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
            alt={book.title}
            sx={{
              maxWidth: 200,
              height: "auto",
              mx: "auto",
              borderRadius: 2,
              boxShadow: 3,
              mb: 2,
            }}
          />
        )}
        <Typography variant="h5" fontWeight={600}>
          {book.title}
        </Typography>
        {book.subtitle && (
          <Typography variant="subtitle1" color="text.secondary">
            {book.subtitle}
          </Typography>
        )}
      </Box>

      {/* === Section: Description === */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight={500} mb={1}>
          Description
        </Typography>
        <Typography variant="body1" color="text.default">
          {typeof book.description === "string"
            ? book.description
            : book.description?.value || "No description available."}
        </Typography>
      </Box>

      {/* === Section: Subjects === */}
      {book.subjects && (
        <Box mb={4}>
          <Typography variant="h6" fontWeight={500} mb={1}>
            Subjects
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {book.subjects.slice(0, 10).map((subj, index) => (
              <Chip key={index} label={subj} variant="outlined" />
            ))}
          </Stack>
        </Box>
      )}

      {/* === Section: Info === */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight={500} mb={1}>
          Details
        </Typography>
        <Typography variant="body2">
          First Published:{" "}
          <strong>{book.first_publish_date || "Unknown"}</strong>
        </Typography>
        <Typography variant="body2">
          Work ID: <strong>{book.key}</strong>
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box textAlign="center">
        <Button variant="contained" color="primary" href="/">
          ← Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default BookDetail;
