import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

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
  })
);

export default function FeedList(props) {
  const classes = useStyles();
  const { tileData } = props;
  useEffect(() => {
    console.log(tileData, "tileData?");
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={1}>
        {tileData.map((tile) => (
          <GridListTile key={tile.id} cols={1} style={{ height: 3 + "rem" }}>
            {/* <img src={tile.filePath} alt={tile.title} />
             */}
            <video
              id="background-video"
              className="videoTag"
              src={`http://i4b101.p.ssafy.io:8080/single/${
                tile.filePath.split("/")[6]
              }`}
              type="video/mp4"
              width="100%"
              loop
              muted
            />
            {tile.id}
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
