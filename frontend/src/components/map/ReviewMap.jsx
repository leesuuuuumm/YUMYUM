import React, { useEffect, useState } from 'react';


const {kakao} = window

const ReviewMap = () => {
  const [searchContent, setSerchContent] = useState('')
  const [map, setMap] = useState(null)

  const searchContenthandeler = (e) => {
    setSerchContent(e.target.value)
  }
  // 맴을 생성하는 함수
  const createMap = () => {
    let container = document.getElementById('Mymap')
    let options = {
        center: new kakao.maps.LatLng(37.506502, 127.053617),
        level: 7,
        };
    let myMap = new kakao.maps.Map(container, options)
    
    let mapTypeControl = new kakao.maps.MapTypeControl();
    
    myMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    setMap(myMap)
  }

  useEffect(() => {
    createMap();
  }, []);

  const searchLocation = () => {
    let ps = new kakao.maps.services.Places(); 
    ps.keywordSearch(searchContent, placesSearchCB);
  };

  const placesSearchCB = (data,status,pagination) => {
      if (status === kakao.maps.services.Status.OK) {

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      let bounds = new kakao.maps.LatLngBounds();
      for (let i=0; i<data.length; i++) {
          displayMarkerPlaces(data[i]);    
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }       
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
  } 
  }
  function displayMarkerPlaces(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

  }

  return (
    <div>
      <input 
      type="text"
      placeholder = "Search"
      value = {searchContent}
      onChange = {searchContenthandeler}
      />
      <span><button onClick={searchLocation}>검색</button></span>
      <button>현재위치</button>
      <div id="Mymap" style={{ width: '80vw', height: '80vh' }}></div>
    </div>
  );
};

export default ReviewMap;