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

// 중요! 외부에서 부를때 아래처럼 불러줘야 다른 컴포넌트에서 위치정보를 받을 수가 있습니다.
// getPosition().then((res) => {
//   console.log(res)
// })