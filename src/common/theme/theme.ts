import { createTheme } from "@mui/material"
import { ThemeModeType } from "../../app/app-reducer"

export const getTheme = (themeMode: ThemeModeType) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        light: "#93e3a9",
        main: "#1bcf68",
        dark: "#00a234",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#f1d05b",
        main: "#ecae2c",
        dark: "#e6721f",
        contrastText: "#2e3d34",
      },
    },
  })
}
