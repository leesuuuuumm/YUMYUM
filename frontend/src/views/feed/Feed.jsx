import ReactStars from "react-rating-stars-component";
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded';
import "./CSS/Feed.css"

function Feed(props) {
  const { feed } = props
  const feedUser = feed.user
  const feedDate = feed.createdDate
  const feedURL = feed.filePath.split('/')
  const myVideo = feedURL[6]
  const videoURL = "http://i4b101.p.ssafy.io:8080/single/" + `${myVideo}`

  return (
    <div id="videobox">
      <video
        id="background-video"
        className="videoTag"
        src={ videoURL }
        type="video/mp4"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
      />
      <div id="textbox">
        {/* <FastfoodRoundedIcon /> */}
        <h1> <FastfoodRoundedIcon id="foodIcon"/> {feed.title} </h1>
        <a href="">
          <h6> By. {feedUser.nickname} </h6>
        </a>
        <br/>
        <div className="stars">
          <ReactStars size={15} edit={false} value={feed.score} />
        </div>
        <hr />
        <LocalDiningRoundedIcon id="nameIcon" fontSize="small"/> 
        <h4> {feed.place.placeName} </h4>
        <div>
          <StorefrontRoundedIcon id="storeIcon" fontSize="small" />
          <h5> {feed.place.addressName} </h5>
          <h5> {feedDate.year}.{feedDate.month.slice(0,3)}.{feedDate.dayOfMonth} / {feedDate.dayOfWeek.slice(0,3)}  </h5>
        </div>
        <hr id="second_line"/>
        <br />
        <TextsmsRoundedIcon id="commentIcon"/>
        <h3> " {feed.content} " </h3>
      </div>
     </div>
  );
}

export default Feed;
