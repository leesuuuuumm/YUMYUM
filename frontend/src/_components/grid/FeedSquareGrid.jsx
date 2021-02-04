import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
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
    gridtile: {
      height: "calc(" + 100 + "vw*0.33) !important",
    },
  })
);

export default function FeedSquareGrid(props) {
  const classes = useStyles();
  const { title, tileData } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={100} className={classes.gridList} cols={3}>
        <GridListTile key="Subheader" cols={3} style={{ height: 3 + "rem" }}>
          <ListSubheader component="div">{title}</ListSubheader>
        </GridListTile>
        {tileData &&
          tileData.map((tile) => (
            <GridListTile key={tile.id} className={classes.gridtile}>
              {/* <img src={tile.filePath} alt={tile.title} />
               */}
              <video
                id="background-video"
                className="feedVideo"
                // src={`${DOMAIN}/single/${tile.filePath.split("/")[6]}`}
                src={ tile.filePath }
                type="video/mp4"
                width="100%"
                loop
                muted
                // onMouseOver={(event) => event.target.play()}
                onTouchStart={(event) => event.target.play()}
                // onMouseOut={(event) => event.target.pause()}
                onTouchEnd={(event) => event.target.pause()}
              />
              {tile.id}
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
FeedSquareGrid.propTypes = {
  title: PropTypes.string,
  tileData: PropTypes.arrayOf(PropTypes.object),
};

FeedSquareGrid.defaultProps = {
  tileData: {},
};
