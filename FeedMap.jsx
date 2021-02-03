import React, { useEffect, useState } from "react";
import "./CSS/FeedMap.css";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import SearchBar from "../../_components/map/SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "0px auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  iconButtonBefore: {
    padding: 10,
  },
}));

const { kakao } = window;

const FeedMap = (props) => {
  const classes = useStyles();
  const [map, setCreateMap] = useState(null);
  let [markers, setMarkers] = useState([]); //marker들을 저장하는 배열
  const [searchContent, setSerchContent] = useState("");
  const [infowindow, setInfowindow] = useState(null); //검색 결과 목록이나 마커를 클릭 했을때 장소명을 표출할 인포 객체
  const [ps, setPs] = useState(null); // 장소 저장 검색 객체
  const [nowMarker, setNowMarker] = useState(null); //현재위치마커 객체 변수
  const [nowInfoWindow, setNowInfoWindow] = useState(null); //현재 위치 인포 객체 변수
  const [isList, setIsList] = useState(false);
  const [center, setCenter] = useState(null); //현재 위치의 경도,위도가 저장된 변수
  const [detailPlaceInfo, setDetailPlaceInfo] = useState(null); // 선택한 장소의 정보를 담아두는 변수
  const [formData, setFormData] = useState(null);
  // TODO : sampleMarkers지워줘야한다. 꼭 잊지말것 !
  const [sampleMarkers, setSampleMarkers] = useState([
    {
      address_name: "대전 유성구 장대동 370-13",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식 > 양꼬치",
      distance: "511",
      id: "599595383",
      phone: "042-483-8800",
      place_name: "칭다오 양갈비",
      place_url: "http://place.map.kakao.com/599595383",
      road_address_name: "대전 유성구 유성대로730번길 109",
      x: "127.33875034509",
      y: "36.3579779491602",
    },
    {
      address_name: "대전 서구 도안동 855",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식 > 양꼬치",
      distance: "2399",
      id: "1137180164",
      phone: "042-825-8008",
      place_name: "양꽃이피는밤 대전도안점",
      place_url: "http://place.map.kakao.com/1137180164",
      road_address_name: "대전 서구 동서대로 700",
      x: "127.340570531643",
      y: "36.3318098051336",
    },
    {
      address_name: "대전 서구 괴정동 86-26",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식",
      distance: "4296",
      id: "827024232",
      phone: "",
      place_name: "마이램",
      place_url: "http://place.map.kakao.com/827024232",
      road_address_name: "대전 서구 도솔로 317",
      x: "127.382753131395",
      y: "36.3367395704602",
    },
    {
      address_name: "대전 중구 태평동 339-90",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 한식 > 육류,고기 > 갈비",
      distance: "6041",
      id: "475824149",
      phone: "042-521-9288",
      place_name: "갈비포차 태평점",
      place_url: "http://place.map.kakao.com/475824149",
      road_address_name: "대전 중구 수침로 95-1",
      x: "127.399041655857",
      y: "36.3279484822162",
    },
    {
      address_name: "대전 유성구 관평동 1116",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식 > 양꼬치",
      distance: "9231",
      id: "24123345",
      phone: "",
      place_name: "미미",
      place_url: "http://place.map.kakao.com/24123345",
      road_address_name: "대전 유성구 관들2길 53",
      x: "127.392435655647",
      y: "36.4247813166264" ,
    },
    {
      address_name: "대전 동구 가오동 592",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식 > 양꼬치",
      distance: "11570",
      id: "1882486572",
      phone: "042-286-2695",
      place_name: "송화강양꼬치",
      place_url: "http://place.map.kakao.com/1882486572",
      road_address_name: "대전 동구 대전로448번길 52-12",
      x: "127.454854079576",
      y: "36.3068237797023",
    },
    {
      address_name: "충북 청주시 서원구 산남동 891",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식 > 양꼬치",
      distance: "30748",
      id: "360135381",
      phone: "043-287-5988",
      place_name: "칭따오양꼬치",
      place_url: "http://place.map.kakao.com/360135381",
      road_address_name: "충북 청주시 서원구 두꺼비로20번길 43",
      x: "127.46751370065",
      y: "36.6105184665906",
    },
    {
      address_name: "충북 청주시 흥덕구 복대동 3022",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 한식 > 육류,고기",
      distance: "32090",
      id: "1859710242",
      phone: "043-237-2415",
      place_name: "유우진",
      place_url: "http://place.map.kakao.com/1859710242",
      road_address_name: "충북 청주시 흥덕구 진재로 24",
      x: "127.429913174624",
      y: "36.633249635917",
    },
    {
      address_name: "충북 청주시 흥덕구 복대동 3236",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 한식 > 육류,고기",
      distance: "32847",
      id: "27607724",
      phone: "043-231-1191",
      place_name: "상하이양갈비 청주점",
      place_url: "http://place.map.kakao.com/27607724",
      road_address_name: "충북 청주시 흥덕구 진재로 101",
      x: "127.43020691006454",
      y: "36.64023053235445",
    },
    {
      address_name: "충북 청주시 청원구 오창읍 양청리 780-4",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식 > 양꼬치",
      distance: "41363",
      id: "14808840",
      phone: "043-211-9592",
      place_name: "초원양꼬치",
      place_url: "http://place.map.kakao.com/14808840",
      road_address_name: "충북 청주시 청원구 오창읍 양청2안길 59",
      x: "127.427781912418",
      y: "36.7192966570142",
    },
    {
      address_name: "전북 익산시 부송동 1082-2",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 한식 > 육류,고기",
      distance: "53716",
      id: "1888649680",
      phone: "063-835-5959",
      place_name: "양누리 익산점",
      place_url: "http://place.map.kakao.com/1888649680",
      road_address_name: "전북 익산시 무왕로23길 29-1",
      x: "126.988005329523",
      y: "35.9621704323557",
    },
    {
      address_name: "전북 익산시 영등동 842-6",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 한식 > 육류,고기",
      distance: "54480",
      id: "2052873486",
      phone: "070-8286-8828",
      place_name: "미스터램스 영등점",
      place_url: "http://place.map.kakao.com/2052873486",
      road_address_name: "전북 익산시 하나로11길 32-5",
      x: "126.977940266005",
      y: "35.9596383233852",
    },
    {
      address_name: "충북 음성군 맹동면 두성리 1366",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식 > 양꼬치",
      distance: "64255",
      id: "298582150",
      phone: "",
      place_name: "양다리양갈비",
      place_url: "http://place.map.kakao.com/298582150",
      road_address_name: "충북 음성군 맹동면 산학로 35",
      x: "127.544683126605",
      y: "36.9083338001481",
    },
    {
      address_name: "충북 음성군 음성읍 읍내리 437-1",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식 > 양꼬치",
      distance: "71282",
      id: "1340748168",
      phone: "043-873-9598",
      place_name: "양갈비또꼬치또",
      place_url: "http://place.map.kakao.com/1340748168",
      road_address_name: "충북 음성군 음성읍 설성로 80",
      x: "127.690858406427",
      y: "36.9300077950104",
    },
    {
      address_name: "경기 안성시 공도읍 만정리 815-4",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 중식 > 양꼬치",
      distance: "73367",
      id: "1623422158",
      phone: "031-653-5178",
      place_name: "호호양꼬치양갈비",
      place_url: "http://place.map.kakao.com/1623422158",
      road_address_name: "경기 안성시 공도읍 공도3로 7",
      x: "127.170400840825",
      y: "37.0003520569692",
    }
  ]); 

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    setFormData(props.location.state.formData);
  },[])

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
  // 검색을 제어하는 함수
  const searchContenthandeler = (e) => {
    e.preventDefault();
    setSerchContent(e.currentTarget.value);
  };
  // 장소 검색 함수
  function searchPlaces(e) {
    e.preventDefault();
    let keyword = document.getElementById("keyword").value;
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("찾을 장소를 입력해주세요!");
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다.
    ps.keywordSearch(searchContent, placesSearchCB, {
      location: center,
      sort: kakao.maps.services.SortBy.DISTANCE,
    });
    setSerchContent("");
    setIsList(true);
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
      displayPlaces(sampleMarkers) //TODO: 이부분 수정해야함 나중에 꼭 지울것
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
          console.log(places[i]);
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

  function getListItem(index, places) { //TODO : places로 바꿔줘야한다. 
    var el = document.createElement("li"),
      itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        places.place_name +
        "</h5>";

    if (places.road_address_name) {
      itemStr +=
        "    <span>" +
        places.road_address_name +
        "</span>" +
        '   <span class="jibun gray">' +
        places.address_name +
        "</span>";
    } else {
      itemStr += "    <span>" + places.address_name + "</span>";
    }

    itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

    el.innerHTML = itemStr;
    el.className = "item";

    return el;
  }
  // map에 마커를 찍는 함수
  function addMarker(position, idx, title) {
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
    let marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });
    let iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    let infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
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
        props.history.push({
          pathname: "/feed/createfeed",
          state: {
            detailPlace: detailPlaceInfo,
            formData: formData,
          },
        });
    } else {
      alert("식당을 알려주세요!")
    }

  }

  // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomIn() {
    map.setLevel(map.getLevel() - 1);
  }

  // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomOut() {
    map.setLevel(map.getLevel() + 1);
  }

  return (
    <div className="feedmap">
      <Paper component="form" className={classes.root}>
        <Link to="/feed/camera">
          <IconButton className={classes.iconButtonBefore} aria-label="menu">
            <CameraAltIcon />
          </IconButton>
        </Link>
        <InputBase
          className={classes.input}
          placeholder="음식점 이름은?"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={searchContenthandeler}
          size="15"
          id="keyword"
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={searchPlaces} //TODO : 시연 끝나고 이주석으로 다시 변경
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <SearchBar />
      { isList || <ArrowForwardRoundedIcon className="arrowcircle" onClick={sendPlaceInfo} fontSize="large" />}
      <div className="map_wrap">
        <div id="map" style={{ width: "100vw", height: "83.5vh" }}></div>
        {isList && (
          <div id="menu_wrap" className="bg_white">
            <div className="option"></div>
            <hr />
            <ul id="placesList"></ul>
            <div id="pagination"></div>
          </div>
        )}
        <div className="custom_zoomcontrol radius_border">
          <span onClick={zoomIn}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </span>
          <span onClick={zoomOut}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FeedMap);
// 컴포넌트에서 props.location.state.detailPlace 로 받으면됨.
