import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import "./InfoMap.css";
import { getFeedByEmail } from "../../_actions/feedAction";
import MyLocationIcon from '@material-ui/icons/MyLocation';


const { kakao } = window;

const InfoMap = (props) => {
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [markers, setMarkers] = useState([
    {
      address_name: "대전 서구 둔산동 1362",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 일식 > 토끼정",
      distance: "3014",
      id: "1669995956",
      phone: "042-472-5585",
      place_name: "토끼정 대전둔산점",
      place_url: "http://place.map.kakao.com/1669995956",
      road_address_name: "대전 서구 대덕대로 226",
      x: "127.379863542692",
      y: "36.3527356488493",
      },
      {
        address_name: "대전 유성구 봉명동 552-5",
        category_group_code: "FD6",
        category_group_name: "음식점",
        category_name: "음식점 > 패스트푸드 > KFC",
        distance: "480",
        id: "238687706",
        phone: "042-824-9034",
        place_name: "KFC 유성온천점",
        place_url: "http://place.map.kakao.com/238687706",
        road_address_name: "대전 유성구 대학로 3",
        x: "127.34125234237348",
        y: "36.35431926756466",
      },
  ]);
  const [samples, setSamples] = useState([]);
  const [email, setEmail] = useState(null);
  const [isLocation, setIsLocation] = useState(false);
  const [isdisplayMarkers, setdisplayMarkers] = useState(false);
  const dispatch = useDispatch();

  //지도를 불러오는 로직
  const createMap = () => {
    let container = document.getElementById("allmap");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 7,
    };
    let myMap = new kakao.maps.Map(container, options);

    let mapTypeControl = new kakao.maps.MapTypeControl();
    setInfowindow(new kakao.maps.InfoWindow({ zIndex: 1 }));
    myMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    setMap(myMap);
    setdisplayMarkers(true);
  };

  const displayAllMarkers = React.useCallback(() => {
    let imageSrc = "https://cdn2.iconfinder.com/data/icons/default-1/100/.svg-4-512.png",
    imageSize = new kakao.maps.Size(36, 37),
    imageOption = {offset: new kakao.maps.Point(27, 69)};

    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    for (let i = 0; i < markers.length; i++) {
      let placePosition = new kakao.maps.LatLng(markers[i].y, markers[i].x),
        marker = new kakao.maps.Marker({
          map: map,
          position: placePosition,
          image : markerImage
        });
        kakao.maps.event.addListener(marker, "click", function () {
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              markers[i].place_name +
              "</div>"
          );
          infowindow.open(map, marker);
          map.setCenter(placePosition);
          map.setLevel(3);
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

  function getFeedLists() {
    setIsLocation(true)
    if (email) {
      dispatch(getFeedByEmail(email))
      .then((res) => {
        // console.log(JSON.parse(res.payload.data))
      })
    }
  }
  // 현재 위치로 이동해서 마커를 찍어주는 함
  useEffect(() => {
    createMap();
    setMarkers(markers.concat(samples));
  }, []);

  useEffect(() => {
      if(isdisplayMarkers){
        displayAllMarkers();
      }
  }, [isdisplayMarkers]);

  useEffect(() => {
    const loggedInfo = localStorage.getItem("loggedInfo");
    if (loggedInfo) {
      setEmail(JSON.parse(loggedInfo).email);
    }
    getFeedLists();
  },[])

  useEffect(() => {
    // isLoaction을 줘서 map이 랜더 되기전에 nowLocation이 출력되지 않게 해주었다.
    if (isLocation){
      nowLocation();
    }
  })

  return (
    <div className="infomap">
      <div id="allmap" style={{ width: "90vw", height: "90vh" }}></div>
      <div className="location_icon"><MyLocationIcon fontSize="large" onClick={nowLocation}/></div>
    </div>
  );
};

export default InfoMap;
