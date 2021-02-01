import React from 'react';
import PropTypes from "prop-types";
import "./MapBottomSheet.css";

const MapBottomSheet = ({placeInfo}) => {
  const { id, placeName, addressName} = placeInfo;
  console.log(placeInfo)
  return (
    <div className="bottomsheet">
      <div>{placeName}</div>
      <div>{addressName}</div>
      <button>리뷰보기</button>
    </div>
  );
}

MapBottomSheet.propTypes = {
  id : PropTypes.any.isRequired,
  placeName : PropTypes.any.isRequired,
  addressName : PropTypes.any.isRequired,
};

export default MapBottomSheet;