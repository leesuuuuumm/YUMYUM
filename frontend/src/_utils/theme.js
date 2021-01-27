import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    palette: {
        primary: {
          main: "#F4D503"
        },
        secondary: {
          main: "#ffffff"
        }
    },
    overrides: {
      MuiTabs: {
        indicator: {
          backgroundColor: "white"
        }
      },
      MuiAppBar: {
          root: {
            backgroundColor: '#F4D503',
            boxShadow: "none"
          }
      },
      MuiAvatar: {
          root: {
            border: "2px solid white"
          }
      }
    }
  });