import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = () => {
    onSearch(searchTerm, 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        mb: 6,
        alignItems: "center",
      }}
    >
      <TextField
        label="Search for books"
        variant="outlined"
        color="primary"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "60%",
          height: "56px",
          "& .MuiInputBase-input": {
            color: "primary.main",
          },
          "& label": {
            color: "text.default",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "primary.main",
            },
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          ml: 2,
          fontSize: "18px",
          padding: "0 20px",
          "&:hover": {
            backgroundColor: "primary.light",
          },
          height: "56px",
        }}
        onClick={handleClick}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
