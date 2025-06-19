import { Box, Pagination } from "@mui/material";

const PaginationControls = ({ currentPage, totalBooks, onPageChange }) => {
  const totalPages = Math.ceil(totalBooks / 100); // OpenLibrary returns 100 per page

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 5 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        color="primary"
      />
    </Box>
  );
};

export default PaginationControls;
