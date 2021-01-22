const {kakao} = window
// 현재위치에 마커를 달아준다.
export const displayMarkerNow = (locPosition, map, message) => {
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
    
  // 인포윈도우를 마커위에 표시합니다 
  infowindow.open(map, marker);

  marker.setMap(map)
  map.panTo(locPosition)
  map.setLevel(3)
}