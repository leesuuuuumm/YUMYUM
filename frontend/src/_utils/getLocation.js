export function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
  })
  .then((res) => {
    let pa = {
      Ma : res.coords.latitude,
      La : res.coords.longitude
    }
    return pa
  })
  .catch(() =>{
    alert("위치 정보를 불러올 수 없는 브라우저입니다. ")
  })
}
