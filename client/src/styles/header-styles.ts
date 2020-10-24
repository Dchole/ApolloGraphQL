import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fffe",

      "& img": {
        borderRadius: "50%",
        marginRight: theme.spacing(2)
      }
    },
    toolbar: {
      padding: theme.spacing(1)
    }
  })
);

export default useHeaderStyles;
