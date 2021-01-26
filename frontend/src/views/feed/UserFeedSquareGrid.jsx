import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import wine from "../../_assets/wine.jpg";
import neon from "../../_assets/neon.jpg";
import yellowwine from "../../_assets/yellowwine.jpg";

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

export default function UserFeedSquareGrid(props) {
  const classes = useStyles();
  const { title, tileData } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={150} className={classes.gridList} cols={3}>
        <GridListTile key="Subheader" cols={3} style={{ height: 3 + "rem" }}>
          <ListSubheader component="div">{title}</ListSubheader>
        </GridListTile>

        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
