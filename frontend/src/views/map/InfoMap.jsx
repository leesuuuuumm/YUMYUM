import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import "./InfoMap.css";
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Link } from "react-router-dom";
import { getAllPlace } from "../../_actions/mapAction"

const { kakao } = window;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '0px auto',
    width: '100%',
    color : '#8d6e63'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color:'white',
    fontFamily: 'GmarketSansMedium',
  }
}));

const InfoMap = (props) => {
  const classes = useStyles();
  const [map, setCreateMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isLocation, setIsLocation] = useState(false);
  const [isdisplayMarkers, setdisplayMarkers] = useState(false);
  const [isgetPlaces, setIsGetPlaces] = useState(false);
  const dispatch = useDispatch();

  //지도를 불러오는 로직
  const createMap = () => {
    let container = document.getElementById("allmap");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 7,
    };
    let map = new kakao.maps.Map(container, options);

    let mapTypeControl = new kakao.maps.MapTypeControl();

    setInfowindow(new kakao.maps.InfoWindow({ zIndex: 1 }));
    setBounds(new kakao.maps.LatLngBounds());
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    setCreateMap(map);
    setdisplayMarkers(true);
  };
  //지도에 모든 마커를 뽑아주는 함수 
  const displayAllMarkers = React.useCallback(() => {
    let imageSrc = "https://cdn2.iconfinder.com/data/icons/default-1/100/.svg-4-512.png",
    imageSize = new kakao.maps.Size(36, 37),
    imageOption = {offset: new kakao.maps.Point(27, 69)},
    bounds = new kakao.maps.LatLngBounds();

    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      for (let i = 0; i < markers.length; i++) {
        let placePosition = new kakao.maps.LatLng(markers[i].y, markers[i].x),
        marker = new kakao.maps.Marker({
          map: map,
          position: placePosition,
          image : markerImage
        });

        bounds.extend(placePosition);

          kakao.maps.event.addListener(marker, "click", function () {
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                markers[i].placeName +
                "</div>"
            );
            infowindow.open(map, marker);
            map.setCenter(placePosition);
            map.setLevel(4);
          });
      }
  })
  //현재위치에 마커를 찍는 함수
  function displayMarkerNow(locPosition, message) {
    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });
    map.panTo(locPosition);
    map.setLevel(3);
    bounds.extend(locPosition);
    map.setBounds(bounds);
  }
  // 현재위치 버튼 클릭시 호출되는 메서드
  const nowLocation = () => {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarkerNow(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayMarkerNow(locPosition, message);
    }
  };

  function getPlaces() {
    setIsLocation(true)
      dispatch(getAllPlace())
      .then((res) => {
        let addPlaces = JSON.parse(res.payload.data);
        setMarkers(markers => markers.concat(addPlaces));
        setIsGetPlaces(true);
      })
  }
  
  // 현재 위치로 이동해서 마커를 찍어주는 함
  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
      if(isgetPlaces){
        displayAllMarkers();
      }
  }, [isgetPlaces]);

  useEffect(() => {
    getPlaces();
  },[])

  useEffect(() => {
    // isLoaction을 줘서 map이 랜더 되기전에 nowLocation이 출력되지 않게 해주었다.
    if (isLocation){
      nowLocation();
    }
  })

  return (
    <>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            내 근처 리뷰 
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    <div className="infomap">
      <div id="allmap" style={{ width: "100vw", height: "83vh" }}></div>
      <div className="location_icon"><MyLocationIcon fontSize="large" onClick={nowLocation} color = "primary" /></div>
    </div>
    </>
  );
};

export default InfoMap;
