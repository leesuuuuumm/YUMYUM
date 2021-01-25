import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import "./CSS/Camera.css"
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';

function Camera() {
  const [source, setSource] = useState("");
  const [selectedFile, setSelectedFile] = useState()
  
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        setSelectedFile(target.files)
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
        console.log(selectedFile)
      }
    }
  };

  const sourceClear = () => {
    setSource("")
    setSelectedFile(null)
    console.log(source)
  }

  return (
    <div >
      { source ? (
        <div>
          <video 
            id="background-video" 
            className='videoTag' 
            src={source} 
            type='video/mp4'
            width= "100%"
            height= "100%"
            autoPlay 
            loop 
            muted 
          />
          <div id="button-wapper">
            <a id="retry" onClick={sourceClear}>
              <ReplayRoundedIcon id="retryIcon" color="disabled" fontSize="large"/>
            </a>
            <a id="next">
              <Link to="/feed/createfeed"> <NavigateNextIcon fontSize="large" color="disabled" /> </Link>
            </a>
          </div>
        </div>
      ) : (
        <div id="icon-wapper">
          <h4 className="userAppTitle">맛을 보여주세요</h4>
          <label htmlFor="icon-button-file" component="span">
            <PhotoCameraRoundedIcon id="cameraIcon" fontSize="small" color="primary" />
          </label> 
          <input
            accept="video/*"
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
          />
      </div>
      )}
    </div>
  );
}

export default withRouter(Camera);