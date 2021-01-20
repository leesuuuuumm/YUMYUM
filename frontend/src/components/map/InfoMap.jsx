import React, {useState, useEffect} from 'react';

const APP_KEY = ''

const InfoMap = () => {
  const [map, setMap] = useState(null)
  
  //지도를 불러오는 로직
  const createMap = () => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    document.body.appendChild(script)
    script.onload = () => {
      const { kakao } = window
      kakao.maps.load(() => {
        let container = document.getElementById('Mymap')
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7,
        }
        const createdMap = new kakao.maps.Map(container, options)
        setMap(createdMap)
      })
    }
  };
  useEffect(() => {
    createMap()
  }, []);

  const pressbutton = () =>{
    console.log(map)
  };

  return (
    <div>
      <div id="Mymap" style={{ width: '80vw', height: '80vh' }}></div>
      <div><button onClick={pressbutton}>현재위치</button></div>
    </div>
  );
};

export default InfoMap;