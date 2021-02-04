import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import "./MapBottomSheet.css";

const MapBottomSheet = (props) => {
  const { id, placeName, addressName} = props.placeInfo;

  const goMapFeed = () => {
    props.history.push({
      pathname: "/food/feed",
      state : {
        id : id,
        placeName : placeName,
        addressName : addressName
      },
    });
  }

  MapBottomSheet.propTypes = {
    id : PropTypes.any.isRequired,
    placeName : PropTypes.any.isRequired,
    addressName : PropTypes.any.isRequired,
  };

  return (  
    <div className="bottomsheet">
      <div>{placeName}</div>
      <div>{addressName}</div>
      <button onClick={goMapFeed}>리뷰보기</button>
    </div>
  );
}


export default withRouter(MapBottomSheet);