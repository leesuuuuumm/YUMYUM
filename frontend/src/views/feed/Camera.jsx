import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import "./CSS/Camera.css"
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';


function Camera() {
  const [source, setSource] = useState("");
  const [formData, setFormData] = useState({})
  
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        const formData = new FormData();
        formData.append('file', file);
        setSource(newUrl);     
        setFormData(formData)
      }
    }
  };

  const sourceClear = () => {
    setSource("")
    setFormData({})
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
            width= "99%"
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
                <ArrowForwardRoundedIcon fontSize="large" color="disabled"/>
              </Link>
            </a>
          </div>
        </div>
      ) : (
        <div id="icon-wapper">
          <h1 className="userAppTitle">맛을 보여주세요</h1>
          <label htmlFor="icon-button-file" component="span">
            <CameraAltOutlinedIcon id="cameraIcon" />
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