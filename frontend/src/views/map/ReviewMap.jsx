import React, { useEffect, useState } from "react";
import { displayMarkerNow } from "../../_components/map/displayMarkerNow";
import { displayMarkerPlaces } from "../../_components/map/displayMarkerPlaces";
import "./ReviewMap.css";

const { kakao } = window;

let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const ReviewMap = () => {
  const [searchContent, setSerchContent] = useState("");
  const [map, setMap] = useState(null);
  const searchContenthandeler = (e) => {
    setSerchContent(e.target.value);
  };

  useEffect(() => {
    createMap();
  }, []);
  // 맴을 생성하는 함수
  const createMap = () => {
    let container = document.getElementById("Mymap");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 7,
    };
    let myMap = new kakao.maps.Map(container, options);

    let mapTypeControl = new kakao.maps.MapTypeControl();

    myMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    setMap(myMap);
  };
  // 검색어를 넣어주는 함수
  const searchLocation = () => {
    let ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchContent, placesSearchCB, { page: 1 });
    setSerchContent("");
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      let bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < data.length; i++) {
        displayMarkerPlaces(data[i], map);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  };
  
  const setMarkers = (markers, map) => {
    for (let i =0; i< markers.length; i++) {
      markers[i].setMap(null)
    }
  };

  const nowLocation = () => {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">현재 위치</div>';
        // 마커와 인포윈도우를 표시합니다
        displayMarkerNow(locPosition, map, message);

        console.log(locPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      alert("이 브라우저에서는 GeoLocations을 사용할 수 없어요.");
      displayMarkerNow(locPosition, map);
    }
  };

  return (
    <div className="reviewmap">
      <input
        type="text"
        placeholder="Search"
        value={searchContent}
        onChange={searchContenthandeler}
      />
      <span>
        <button onClick={searchLocation}>검색</button>
      </span>
      <button onClick={nowLocation}>현재위치</button>
      <div id="Mymap" style={{ width: "80vw", height: "80vh" }}></div>
    </div>
  );
};

export default ReviewMap;
