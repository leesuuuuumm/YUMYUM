const {kakao} = window
let infowindow = new kakao.maps.InfoWindow({zIndex:1});
// 현재위치에 마커를 달아준다.
export const displayMarkerNow = (locPosition, map, message) => {
    // 마커를 생성합니다<div className=""></div>
    var imageSrc = 'https://cdn.icon-icons.com/icons2/2073/PNG/128/location_map_twitter_icon_127126.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)};

    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    let bounds = new kakao.maps.LatLngBounds();

    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' +
        '현재 위치' +
        "</div>"
    );
    let marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
      image: markerImage
    });

    infowindow.open(map, marker)

    map.panTo(locPosition);
    map.setLevel(3);
    bounds.extend(locPosition);
    map.setBounds(bounds);
}