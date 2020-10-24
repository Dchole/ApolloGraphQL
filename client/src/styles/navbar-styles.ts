import { createStyles, makeStyles } from "@material-ui/core/styles";

const useNavbarStyles = makeStyles(
  createStyles({
    root: {
      width: "100%",
      height: "fit-content",

      "&.MuiAppBar-positionFixed": {
        top: "auto",
        bottom: 0
      }
    },
    toolbar: {
      padding: 0
    },
    bottomNav: {
      width: "100%"
    }
  })
);

export default useNavbarStyles;
