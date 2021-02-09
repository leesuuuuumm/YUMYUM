import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
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
      // paddingTop: "160.8px",
      paddingBottom: "71.438px",
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

function FeedSquareGrid(props) {
  const classes = useStyles();
  const { title, tileData, navheight } = props;
  const goDetail = (tile, index) => {
    if (props.match.path === "/food/feed") {
      const { id, placeName, addressName } = props.location.state;
      props.history.push({
        pathname: "/feed/singlefeed",
        state: {
          id: id,
          placeName: placeName,
          feed: tile,
          addressName: addressName,
        },
      });
    } else {
      props.history.push({
        pathname: "/feed/flippagesUser",
        state: {
          index: index,
          email: tile.user.email,
        },
      });
    }
  };

  return (
    <div className={classes.root} style={{ paddingTop: navheight }}>
      <GridList cellHeight={100} className={classes.gridList} cols={3}>
        <GridListTile key="Subheader" cols={3} style={{ height: 3 + "rem" }}>
          <ListSubheader component="div">{title}</ListSubheader>
        </GridListTile>
        {tileData &&
          tileData.map((tile, index) => (
            <GridListTile
              key={tile.id}
              className={classes.gridtile}
              onClick={() => goDetail(tile, index)}
            >
              <video
                id="background-video"
                className="feedVideo"
                // src={`${DOMAIN}/single/${tile.filePath.split("/")[6]}`}
                src={tile.filePath}
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
  tileData: [],
};

export default withRouter(FeedSquareGrid);
