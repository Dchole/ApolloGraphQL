import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useDesktopView = () => {
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up("md"));

  return desktopView;
};

export default useDesktopView;
