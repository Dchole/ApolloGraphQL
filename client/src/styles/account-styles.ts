import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useAccountStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.dark
    },
    username: {
      textTransform: "capitalize"
    }
  })
);

export default useAccountStyles;
