import React, {useState, useEffect} from 'react';

const APP_KEY = '22ebbd98989f2e523ef2e1054c461378'

const InfoMap = () => {
  const [map, setMap] = useState(null)

  const createMap = () => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    document.head.appendChild(script)
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
  }

  useEffect(() => {
    createMap()
  }, [])
  return (
    <div>
      <div id="Mymap" style={{ width: '100vw', height: '100vh' }}></div>
    </div>
  );
};

export default InfoMap;