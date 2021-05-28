import { Link } from "react-router-dom"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography"
import useCardStyles from "../styles/card-styles"

interface ILaunchProps {
  id: string
  missionName: string
  missionPatch: string | undefined | null
  rocketName: string
}

const Launch: React.FC<ILaunchProps> = ({
  id,
  missionName,
  missionPatch,
  rocketName
}) => {
  const classes = useCardStyles()

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea
        component={Link}
        to={`/launches/${id}`}
        className={classes.actionArea}
        role={undefined}
      >
        <div>
          <Typography variant="h5" component="h3">
            {missionName}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {rocketName}
          </Typography>
        </div>
        {missionPatch && <img src={missionPatch} alt={missionName} />}
      </CardActionArea>
    </Card>
  )
}

export default Launch
