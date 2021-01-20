import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import "../../App.css"
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";

function Camera() {
  const [source, setSource] = useState("");
  const [selectedFile, setSelectedFile] = useState()
  
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        setSelectedFile(target.files)
        console.log(selectedFile)
        const newUrl = URL.createObjectURL(file);
        console.log(newUrl)
        setSource(newUrl);
        console.log(source)
      }
    }
  };

  const stateCheck = (e) => {
    console.log(setSelectedFile)
    console.log(source)
  }

  return (
    <section className="login">
      <div className="userContainer">
        <h2 className="userAppTitle">오늘의 맛일기</h2>
        <h4 className="userAppTitle">영상 남기기</h4>
      { source ? (
        <div>
          <video 
            controls width="90%"
            src={source} 
            type="video/mp4/"
            alt={"snap"}
          />
          <button>
            <Link to="/feed/createarticle" className="userLink"> 이어서 </Link>
          </button>
        </div>
      ) : (
        <div>
          <label htmlFor="icon-button-file" component="span">
            <PhotoCameraRoundedIcon id="cameraIcon" fontSize="large" color="primary" />
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
    </section>
  );
}

export default withRouter(Camera);