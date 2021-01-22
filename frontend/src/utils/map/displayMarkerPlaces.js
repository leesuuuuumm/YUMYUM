const {kakao} = window
let infowindow = new kakao.maps.InfoWindow({zIndex:1});
// 위치와 map을 기본적으로 넣어주어야한다.
export function displayMarkerPlaces(place, map) {
  // 마커를 생성하고 지도에 표시합니다
  let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x) 
  });

  kakao.maps.event.addListener(marker, 'click', function() {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
    infowindow.open(map, marker);

    var moveLatLng = new kakao.maps.LatLng(place.y, place.x);  
    map.setCenter(moveLatLng);
    map.setLevel(4) 
  });
}