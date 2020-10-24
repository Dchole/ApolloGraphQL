import { pink } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    buttonSecondary: Palette["primary"];
  }
  interface PaletteOptions {
    buttonSecondary: PaletteOptions["primary"];
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#15CBC4"
    },
    secondary: {
      main: "#F7E5CE"
    },
    background: {
      default: "#FBF2E7"
    },
    buttonSecondary: {
      main: pink.A200,
      light: pink[300],
      dark: pink[600]
    }
  }
});

export default theme;
