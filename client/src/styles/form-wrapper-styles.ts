import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useFormWrapperStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      placeItems: "center",
      width: "100%",
      height: "100vh"
    },
    paper: {
      padding: theme.spacing(2)
    },
    title: {
      marginBottom: theme.spacing(1)
    },
    link: {
      margin: theme.spacing(2, 0, 0),

      "& p": {
        textDecoration: "underline",

        "&:hover, &:focus": {
          textDecoration: "none"
        }
      }
    }
  })
);

export default useFormWrapperStyles;
