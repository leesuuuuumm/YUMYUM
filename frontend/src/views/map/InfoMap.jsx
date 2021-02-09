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
import { withRouter } from "react-router-dom";
import { getAllPlace } from "../../_actions/mapAction";
import MapBottomSheet from "../../_components/map/MapBottomSheet";
import { displayMarkerNow } from "../../_components/map/displayMarkerNow";
import acorn from "../../_assets/acorn.png";
import { getLikeFeeds } from "../../_actions/userAction";

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
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const [infowindows, setInfoWindows] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [place, setPlace] = useState(null);
  const [isLocation, setIsLocation] = useState(false);
  const [isdisplayMarkers, setdisplayMarkers] = useState(false);
  const [isgetPlaces, setIsGetPlaces] = useState(false);
  const [likeMarkers, setLikeMarkers] = useState([
    {
      address_name: "대전 유성구 봉명동 448-5",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 한식 > 육류,고기 > 곱창,막창",
      distance: "1108",
      id: "465516385",
      phone: "042-825-5792",
      place_name: "곱창고 봉명점",
      place_url: "http://place.map.kakao.com/465516385",
      road_address_name: "대전 유성구 계룡로74번길 20",
      x: "127.338283006941",
      y: "36.3537401441578",
      },
    {
      address_name: "대전 유성구 봉명동 553-2",
      category_group_code: "CE7",
      category_group_name: "카페",
      category_name: "음식점 > 카페 > 커피전문점 > 파스쿠찌",
      distance: "906",
      id: "1846009136",
      phone: "042-826-8498",
      place_name: "파스쿠찌 유성온천역점",
      place_url: "http://place.map.kakao.com/1846009136",
      road_address_name: "대전 유성구 계룡로 92",
      x: "127.340531131558",
      y: "36.3537175374167",
    }
  ])
  const [likeObject, setLikeObject] = useState([]);
  const [allObject, setAllObject] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const email = JSON.parse(localStorage.getItem("loggedInfo")).email;
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

    setBounds(new kakao.maps.LatLngBounds());
    // map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    setCreateMap(map);
    setdisplayMarkers(true);

    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      setPlace(null)
      for (let i =0; i < infowindows.length; i++) {
          infowindows[i].close()
      }
    });
  };
  //지도에 모든 마커를 뽑아주는 함수 
  const displayAllMarkers = React.useCallback(() => {
    removeMarker(map,likeObject)
    removeInfoWindow()
    setToggleBtn(true);
    let bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < markers.length; i++) {
        let placePosition = new kakao.maps.LatLng(markers[i].y, markers[i].x); 

        let marker = new kakao.maps.Marker({
          map: map,
          position: placePosition,
        });

        allObject.push(marker)

        bounds.extend(placePosition);

          kakao.maps.event.addListener(marker, "click", function () {
            setPlace(markers[i]);
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                markers[i].placeName +
                "</div>"
            );
            infowindows.push(infowindow)
            infowindow.open(map, marker);
            map.setCenter(placePosition);

            map.setLevel(4);
          });
      }
  })

  const displayLikeMarkers = React.useCallback(() => {
    removeMarker(map,allObject)
    removeInfoWindow()
    setToggleBtn(false);
    let bounds = new kakao.maps.LatLngBounds();
    for (let i = 0; i < likeMarkers.length; i++) {
        let placePosition = new kakao.maps.LatLng(likeMarkers[i].y, likeMarkers[i].x); 

        let marker = new kakao.maps.Marker({
          map: map,
          position: placePosition,
        });

        likeObject.push(marker)

        bounds.extend(placePosition);

          kakao.maps.event.addListener(marker, "click", function () {
            // removeNowmarker();

            setPlace(likeMarkers[i]);
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                likeMarkers[i].placeName +
                "</div>"
            );

            infowindow.open(map, marker);
            
            map.setCenter(placePosition);
            
            map.setLevel(4);
          });
      }
  })

  const removeMarker = (map, markers) => {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }           
  }

  const removeInfoWindow = () => {
    for (let i =0; i < infowindows.length; i++) {
      infowindows[i].close()
    } 
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
        let nowInfo=displayMarkerNow(locPosition, map ,message)
        infowindows.push(nowInfo[1])
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

    displayMarkerNow(locPosition, map, message);
     
    }
  };

  // function removeNowmarker() {
  //   nowMarker[0].setMap(null);
  //   nowMarker[1].close(map,nowMarker[0]);
  // }

  function getPlaces() {
    setIsLocation(true)
      dispatch(getAllPlace())
      .then((res) => {
        console.log(res)
        let addPlaces = JSON.parse(res.payload.data);
        setMarkers(markers => markers.concat(addPlaces));
        setIsGetPlaces(true);
        console.log(addPlaces)
      })
  }

  function getLikePlaces() {
    dispatch(getLikeFeeds(email))
    .then((res)=>{
      let likePlaces = JSON.parse(res.payload.data);
    })
  }
  
  // 현재 위치로 이동해서 마커를 찍어주는 함수
  useEffect(() => {
    createMap();
    getPlaces();
    getLikePlaces();
  },[]);

  // useEffect(() => {
  //     if(isgetPlaces){
  //       displayAllMarkers();
  //     }
  // }, [isgetPlaces]);

  // useEffect(() => {
  //   const loggedInfo = localStorage.getItem("loggedInfo");
  //   if (loggedInfo) {
  //     setEmail(JSON.parse(loggedInfo).email);
  //   }
  // }, []);

  useEffect(() => {
    // isLoaction을 줘서 map이 랜더 되기전에 nowLocation이 출력되지 않게 해주었다.
    if (isLocation){
      nowLocation();
    }
  },[isLocation])

  return (
    <>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            리뷰 보기
            {toggleBtn ? (
              <div className="wrap_Btn">
                <img className="img_acorn"src={acorn} alt="acorn"/>
                <button className="togglebtn" onClick={displayLikeMarkers}>좋아요한 리뷰 보기</button>
              </div>
              ):(
                <div>
                  <button className="togglebtn" onClick={displayAllMarkers}>모든 리뷰 보기 </button>
                </div>
              )
            }  
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    <div className="infomap">
      <div id="allmap" style={{ width: "100vw", height: "83vh" }}></div>
    </div>
      <MyLocationIcon  className="location_icon" fontSize="large" onClick={nowLocation} color = "primary" />
      {place && <MapBottomSheet placeInfo={place}/>}
    </>
  );
};

export default withRouter(InfoMap);
