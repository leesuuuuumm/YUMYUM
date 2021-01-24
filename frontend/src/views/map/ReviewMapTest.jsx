import React, {useEffect, useState} from 'react';
import "./ReviewMap.css";
// import { displayMarkerNow } from '../../_components/map/displayMarkerNow'

const { kakao } = window;

const ReviewMapTest = () => {
  const [map, setCreateMap] = useState(null)
  let [markers, setMarkers]  = useState([]); //marker들을 저장하는 배열
  const [searchContent, setSerchContent] = useState("");
  const [infowindow, setInfowindow] = useState(null); //검색 결과 목록이나 마커를 클릭 했을때 장소명을 표출할 인포 윈도우
  const [ps, setPs] = useState(null); // 장소 저장 검색 객체
  const [nowMarker, setNowMarker] = useState(null);

  useEffect(()=>{
    createMap();
  },[])

  const createMap = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 7,
    };
    let map = new kakao.maps.Map(container, options);

    let mapTypeControl = new kakao.maps.MapTypeControl();

    setPs(new kakao.maps.services.Places());
    setInfowindow(new kakao.maps.InfoWindow({zIndex:1}));
    setCreateMap(map);

  };
  // 검색을 제어하는 함수
  const searchContenthandeler = (e) => {
    setSerchContent(e.target.value);
  };
  // 장소 검색 함수
  function searchPlaces() {
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다.
    ps.keywordSearch(searchContent, placesSearchCB);
    setSerchContent("");
  }
  // 검색이 성공했을때 아래 콜백함수가 호출된다.
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
  
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        // displayPagination(pagination)

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
  }
  
  function displayPlaces(places) {
    let bounds = new kakao.maps.LatLngBounds();
    // 지도에 표시되는 마커를 제거한다.
    removeMarker();
    // 검색했을때 현재위치를 제거하는 함수
    if (nowMarker) {
      removeNowMarker();
    }
    for( let i = 0 ; i<places.length; i++) {
      let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(places[i] , i) 
          bounds.extend(placePosition);
    }
    map.setBounds(bounds)
  }
 // map에 마커를 찍는 함수
  function addMarker(position, idx, title) {
    let placePosition = new kakao.maps.LatLng(position.y, position.x)

    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)
    let marker = new kakao.maps.Marker({
        position: placePosition, // 마커의 위치
        image: markerImage 
    });

    kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + position.place_name + '</div>');
      infowindow.open(map, marker);

      map.setLevel(3);
      
      map.panTo(placePosition);
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker) // 배열에 생성된 마커를 추가합니다

    return marker;
  }
  // map에 있는 marker를 지우는 함수 
  function removeMarker() {
    console.log(markers.length)
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null)
    }
  }

  function removeNowMarker(){
    nowMarker.setMap(null);
    infowindow.close();
  }


  //현재 위치로 이동하는 함수
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
        displayMarkerNow(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      alert("이 브라우저에서는 GeoLocations을 사용할 수 없어요.");
      displayMarkerNow(locPosition);
    }
  };
  
  const displayMarkerNow = (locPosition, message) => {
    let marker = new kakao.maps.Marker({
      map: map,
      position : locPosition
    })
    let iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;
  
    var infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
    });

    setNowMarker(marker);
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);
    marker.setMap(map)
    map.panTo(locPosition)
    map.setLevel(3)
  }

  return (
    <div className="reviewmap">
    <input
      type="text"
      placeholder="Search"
      value={searchContent}
      onChange={searchContenthandeler}
    />
    <span>
      <button onClick={searchPlaces}>검색</button>
      <button onClick={nowLocation}>현재위치</button>
    </span>
    <div className="map_wrap">
        <div id="map" style={{ width: "80vw", height: "85vh" }}></div>
        <div id="menu_wrap" class="bg_white">
        <div className="option">
            <div>
                <form onSubmit={searchPlaces} return false>
                    키워드 : <input 
                    id="keyword" 
                    type="text" 
                    value={searchContent}
                    onChange={searchContenthandeler}
                    size="15"
                    /> 
                    <button type="submit">검색하기</button> 
                </form>
            </div>
        </div>
        <hr/>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
    </div>
    </div>
    </div>
  )
};

export default ReviewMapTest;