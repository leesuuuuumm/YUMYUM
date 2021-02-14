import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    palette: {
        primary: {
          main: "#8d6e63"
        },
        secondary: {
          main: "#ffffff"
        },
        third: {
            main: "000000"
        }
    },
    overrides: {
      MuiTabs: {
        indicator: {
          backgroundColor: "black",
          height: "1px",
        },
      },
      MuiTab: {
          root: {
            '&$selected': {
                color: "black",
                fontWeight: 800,
            },
          },
          selected: {},
      },
      MuiAppBar: {
          root: {
            backgroundColor: 'white',
            boxShadow: "none"
          }
      },
      MuiAvatar: {
          root: {
            border: "2px solid #F4D503",

          },
          img: {
            objectFit: "scale-down",
            backgroundColor: "white",
          }
      },

    }
  });
