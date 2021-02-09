import React from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { DOMAIN } from "../../_utils/axios";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    gridList: {
      width: 100 + "%",
      height: 100 + "%",
      padding: 0,
    },
    tileBox: {
      width: 100 + "%",
      height: 100 + "%",
      overflow: "hidden",
      margin: "0px auto",
      position: "relative",
    },
    feedVideo: {
      width: 100 + "%",
    },
    textBox: {
      position: "absolute",
      top: "30%",
      width: "100%",
      margin: "1rem",
    },
    text: {
      color: "white",
      fontWeight: "500",
      fontSize: "2rem",
    },
  })
);

export default function FeedList(props) {
  const classes = useStyles();
  const { tileData } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={100} className={classes.gridList} cols={1}>
        {tileData &&
          tileData.map((tile) => (
            <GridListTile
              key={tile.id}
              cols={1}
              style={{ height: 5.8 + "rem" }}
            >
              <div className={classes.tileBox}>
                <video
                  id="background-video"
                  className={classes.feedVideo}
                  // src={`${DOMAIN}/single/${tile.filePath.split("/")[6]}`}
                  src={ tile.videoPath }
                  type="video/mp4"
                  width="100%"
                  loop
                  muted
                  // onMouseOver={(event) => event.target.play()}
                  onTouchStart={(event) => event.target.play()}
                  // onMouseOut={(event) => event.target.pause()}
                  onTouchEnd={(event) => event.target.pause()}
                />
                <div className={classes.textBox}>
                  <span className={classes.text}>{tile.title}</span>
                </div>
              </div>
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
FeedList.propTypes = {
  title: PropTypes.string,
  tileData: PropTypes.arrayOf(PropTypes.object),
};
FeedList.defaultProps = {
  tileData: {},
};
