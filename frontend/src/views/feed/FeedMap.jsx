import React, { useEffect, useState } from "react";
import "./CSS/FeedMap.css";
import { withRouter } from "react-router-dom";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { getListItem } from "../../_components/map/getListItem";

const { kakao } = window;

const FeedMap = (props) => {
  const {searchContent} = props
  const [map, setCreateMap] = useState(null);
  let [markers, setMarkers] = useState([]); //marker들을 저장하는 배열
  const [infowindow, setInfowindow] = useState(null); //검색 결과 목록이나 마커를 클릭 했을때 장소명을 표출할 인포 객체
  const [ps, setPs] = useState(null); // 장소 저장 검색 객체
  const [nowMarker, setNowMarker] = useState(null); //현재위치마커 객체 변수
  const [nowInfoWindow, setNowInfoWindow] = useState(null); //현재 위치 인포 객체 변수
  const [isList, setIsList] = useState(false);
  const [center, setCenter] = useState(null); //현재 위치의 경도,위도가 저장된 변수
  const [detailPlaceInfo, setDetailPlaceInfo] = useState(null); // 선택한 장소의 정보를 담아두는 변수
  const [formData, setFormData] = useState(null);
  const [createFormData, setCreateFormData] = useState(null);

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    setFormData(props.location.state.formData);
  },[])

  useEffect(() =>{
    setCreateFormData(props.location.state.createFormData);
  },[])

  useEffect(() => {
    searchPlaces();
  },[searchContent])

  const createMap = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 7,
      draggable : true,
    };
    let map = new kakao.maps.Map(container, options);
    setPs(new kakao.maps.services.Places());
    setInfowindow(new kakao.maps.InfoWindow({ zIndex: 1 }));
    setCreateMap(map);
    nowLocation(map); // map을 nowLocation에 넘겨줘야 정상적으로 동작되게할 수 있다. 중요!! 잊지말것
  };
  // 장소 검색 함수
  function searchPlaces() {
    if (searchContent) {
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다.
    ps.keywordSearch(searchContent, placesSearchCB, {
      location: center,
      sort: kakao.maps.services.SortBy.DISTANCE,
    });
    setIsList(true);
    }
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
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    } else { 
      // displayPlaces(sampleMarkers) //TODO: 이부분 수정해야함 나중에 꼭 지울것
      console.log('검색에러1')
    }
    
  }

  //검색된 자
  function displayPlaces(places) { 

    let bounds = new kakao.maps.LatLngBounds(),
      listEl = document.getElementById("placesList"),
      menuEl = document.getElementById("menu_wrap"),
      fragment = document.createDocumentFragment(), // 가짜 document를 만들고 거기에 담아서 한번에 appendchild하면 메모리를 줄일수 있다.
      listStr = "";
    // 지도에 표시되는 마커를 제거한다.
    removeAllChildNods(listEl);

    removeMarker();
    // 검색했을때 현재위치를 제거하는 함수 마커가 있으면 제거해준다.
    if (nowMarker) {
      removeNowMarker();
    }

    for (let i = 0; i < places.length; i++) {
      let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(places[i], i),
        itemEl = getListItem(i, places[i]);

      bounds.extend(placePosition);

      (function (marker, title) {
        kakao.maps.event.addListener(marker, "mouseover", function () {
          displayInfowindow(marker, title);
        });

        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });

        itemEl.onclick = function () {
          setDetailPlaceInfo(places[i]);
          displayInfowindow(marker, title);
          map.setLevel(3);
          map.panTo(placePosition);
          setIsList(false);
        };

        itemEl.onmouseout = function () {
          infowindow.close();
        };
      })(marker, places[i].place_name);

      fragment.appendChild(itemEl);
    }
    //  검색 결과 항복을 결과목록의 Elemnet에 추가 한다.
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
    // 검색된 장소 위치를 기준으로 지도 범위 재설정
    map.setBounds(bounds);
  }
  // map에 마커를 찍는 함수
  function addMarker(position, idx) {
    let placePosition = new kakao.maps.LatLng(position.y, position.x);

    var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    let marker = new kakao.maps.Marker({
      position: placePosition, // 마커의 위치
      image: markerImage,
    });

    kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          position.place_name +
          "</div>"
      );
      setDetailPlaceInfo(position);
      setIsList(false);
      infowindow.open(map, marker);
      map.setLevel(3);
      map.panTo(placePosition);
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }
  // map에 있는 marker를 지우는 함수
  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
  // 현재 위치에 찍혀 있는 마커를 지우는 함수
  function removeNowMarker() {
    nowMarker.setMap(null);
    nowInfoWindow.close();
  }
  //현재 위치로 이동하는 함수
  function nowLocation(map) {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (nowMarker) {
      removeNowMarker();
    }
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">현재 위치</div>';
        // 마커와 인포윈도우를 표시합니다
        displayMarkerNow(map, locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      alert("이 브라우저에서는 GeoLocations을 사용할 수 없어요.");
      displayMarkerNow(locPosition);
    }
  }
  // 현재위치에 마커를 찍는 함수
  function displayMarkerNow(map, locPosition, message) {
    var imageSrc = 'https://cdn.icon-icons.com/icons2/2073/PNG/128/location_map_twitter_icon_127126.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 50)};

    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    let marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
      image : markerImage
    });
    let iwContent = message; // 인포윈도우에 표시할 내용

    let infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
    });

    setNowMarker(marker);
    setNowInfoWindow(infowindow); //현재 객체로 저장된 infowindow를 현재 위치 인포 윈도 변수에 새팅하고 그거로 제어함! 중요
    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);
    marker.setMap(map);
    map.panTo(locPosition);
    map.setLevel(2);
    setCenter(locPosition);
  }

  function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

    infowindow.setContent(content);
    infowindow.open(map, marker);
  }
  // 검색결과 목록에서 자식 Element를 제거한다.
  function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }
  // 리뷰작성 페이지로 넘기고 장소 정보를 함께 담아서 보내는 함수.
  function sendPlaceInfo() {
    if (detailPlaceInfo) {
        if (createFormData){
            props.history.push({
              pathname: "/feed/createfeed",
              state: {
                detailPlace: detailPlaceInfo,
                formData: createFormData,
              },
            })
        } else {
          props.history.push({
            pathname: "/feed/createfeed",
            state: {
              detailPlace: detailPlaceInfo,
              formData: formData,
            },
          })
        };
    } else {
      const detailPlace = {
        address_name : "아늑한 우리집",
        id : -1,
        phone : "프라이버시입니다.",
        place_name : "우리집",
        x : -1,
        y : -1
      }
      props.history.push({
        pathname: "/feed/createfeed",
        state: {
          detailPlace: detailPlace,
          formData: formData,
        },
      })
    }
  }
  return (
    <div className="feedmap">
      { isList ? <></> :  detailPlaceInfo ? 
        <ArrowForwardRoundedIcon className="arrowcircle" onClick={sendPlaceInfo} fontSize="large" /> : 
        <div className="skip" onClick={sendPlaceInfo}> 집에서 먹었어요! </div>
      }
      <div className="map_wrap">
        <div id="map" style={{ width: "100vw", height: "83.5vh" }}></div>
        {isList && (
          <div id="menu_wrap" className="bg_white">
            <div className="option"></div>
            <ul id="placesList"></ul>
            <div id="pagination"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(FeedMap);
// 컴포넌트에서 props.location.state.detailPlace 로 받으면됨.
