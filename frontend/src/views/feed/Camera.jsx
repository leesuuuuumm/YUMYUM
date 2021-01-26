import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import "./CSS/Camera.css"
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';

function Camera() {
  const [source, setSource] = useState("");
  const [formData, setFormData] = useState({})
  
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
        console.log(newUrl)
        
        const formData = new FormData();
        formData.append('file', file);
        setFormData(formData)
      }
    }
  };

  const sourceClear = () => {
    setSource("")
    setFormData({})
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
            type='video/*'
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
              <Link to={{
                pathname: "/feed/feedmap",
                state: {
                  formData: formData,
                }
              }}> 
                <NavigateNextIcon fontSize="large" color="disabled" /> 
              </Link>
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
            name="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
          />
      </div>
      )}
    </div>
  );
}

export default withRouter(Camera);