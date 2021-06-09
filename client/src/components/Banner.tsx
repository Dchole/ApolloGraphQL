import Box from "@material-ui/core/Box"
import Slide from "@material-ui/core/Slide"
import Typography from "@material-ui/core/Typography"
import WifiOnIcon from "@material-ui/icons/Wifi"
import WifiOffIcon from "@material-ui/icons/WifiOff"

export type TSeverity = "error" | "success" | "warning" | "info"

interface IBannerProps {
  show: boolean
  message: string
  severity: TSeverity
  handleEnter: () => void
  handleExited: () => void
}

const Banner: React.FC<IBannerProps> = ({
  show,
  message,
  severity,
  handleEnter,
  handleExited
}) => {
  return (
    <Slide
      direction="down"
      in={show}
      onEnter={handleEnter}
      onExited={handleExited}
      unmountOnExit
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        bgcolor={`${severity}.main`}
        zIndex="snackbar"
        display="flex"
        gridGap={4}
        alignItems="center"
        justifyContent="center"
      >
        {severity === "error" ? (
          <WifiOffIcon fontSize="small" color="action" />
        ) : (
          <WifiOnIcon fontSize="small" color="action" />
        )}
        <Typography variant="caption">{message}</Typography>
      </Box>
    </Slide>
  )
}

export default Banner
