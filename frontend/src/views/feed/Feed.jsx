import ReactStars from "react-rating-stars-component";
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
        <h1> {feed.title} </h1>
        <a href="">
          <h6> By. {feedUser.nickname} </h6>
        </a>
        <br/>
        <div className="stars">
          <ReactStars size={15} edit={false} value={feed.score} />
        </div>
        <hr />
        <h4> {feed.place.placeName} </h4>
        <h5> {feed.place.addressName} </h5>
        <h5> {feedDate.dayOfWeek} / {feedDate.month} {feedDate.dayOfMonth} / {feedDate.year} </h5>
        <hr id="second_line"/>
        <br />
        <h3> {feed.content} </h3>
      </div>
     </div>
  );
}

export default Feed;
