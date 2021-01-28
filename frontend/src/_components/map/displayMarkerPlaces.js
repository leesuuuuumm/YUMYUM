const {kakao} = window
let infowindow = new kakao.maps.InfoWindow({zIndex:1});
// 위치와 map을 기본적으로 넣어주어야한다.
export function displayMarkerPlaces(place, map) {
  // 마커를 생성하고 지도에 표시합니다
  let imageSrc = 'https://icons-for-free.com/iconfiles/png/512/best+bookmark+premium+rating+select+star+icon-1320168257340660520.png',
      imageSize = new kakao.maps.Size(30,30),
      imageOption = {offset: new kakao.maps.Point(27, 69)};
  
  let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
      image : markerImage
  });



  kakao.maps.event.addListener(marker, 'click', function() {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
    infowindow.open(map, marker);

    var moveLatLng = new kakao.maps.LatLng(place.y, place.x);  
    map.setCenter(moveLatLng);
    map.setLevel(4);
    // TODO 나중에 클릭한 장소의 경도와 위도를 서버에 묶어서 보내줘야한다. 
    map.getCenter()
  });
}