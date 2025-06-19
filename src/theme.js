import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#131a3c", // Deep navy blue (keep as is)
      light: "#3a4a7c", // Lighter blue for hover, backgrounds
      dark: "#0d1228", // Even deeper blue for emphasis
      contrastText: "#fff", // White text on primary
    },
    secondary: {
      main: "#4f6bed", // Bright blue for highlights, active states
      light: "#7187f1", // Lighter blue for secondary actions
      dark: "#254edb", // Darker blue for secondary emphasis
      contrastText: "#fff",
    },
    error: {
      main: "#ff1744", // Standard MUI error red
    },
    warning: {
      main: "#ffb300", // Amber for warnings
    },
    info: {
      main: "#2196f3", // Standard info blue
    },
    success: {
      main: "#43a047", // Green for success
    },
    background: {
      default: "#f4f6fb", // Very light blue/gray for app background
      paper: "#fff", // Card/paper background
    },
    text: {
      primary: "#131a3c", // Main text color
      secondary: "#4f6bed", // Secondary text color
      default: "#5f7381",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "#e0e3e7", // light gray-blue for disabled
            color: "#b0b8c1", // muted text color
            borderColor: "#e0e3e7", // for outlined variant
            opacity: 1, // keep full opacity for clarity
          },
        },
      },
    },
  },
});

export default theme;
