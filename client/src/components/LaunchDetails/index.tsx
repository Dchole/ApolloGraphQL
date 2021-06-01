import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import useDesktopView from "../../hooks/useDesktopView"
import useDetailStyles from "../../styles/detail-styles"
import { Launch } from "../../generated/graphql"

type TLaunchDetails = Pick<Launch, "name" | "rocket" | "details" | "links">

const LaunchDetails: React.FC<TLaunchDetails> = ({
  name,
  rocket,
  details,
  links
}) => {
  const classes = useDetailStyles()
  const desktopView = useDesktopView()

  return (
    <section className={classes.details}>
      <div className="name">
        <Typography component="h1" variant={desktopView ? "h3" : "h4"}>
          {name}
        </Typography>
        <br />
        <Typography component="h2" variant="h5">
          <span role="img" aria-label="rocket emoji">
            🚀
          </span>{" "}
          {rocket.name}({rocket.type})
        </Typography>
      </div>
      <div className="details">
        <Typography variant="body2">{details}</Typography>
      </div>
      <div className={classes.links}>
        {links.article && <Link href={links.article}>Read Article</Link>}
        {links.video && <Link href={links.video}>Watch Video</Link>}
      </div>
    </section>
  )
}

export default LaunchDetails
