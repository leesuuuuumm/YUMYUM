import { Textfit } from 'react-textfit';
import "./CSS/Howto.css";


function Howto() {
  return (
    <div id="HowtoText">
      <Textfit max="20"> 나만의 미식일기 "YUMYUM"은 오직 음식만을 위한 SNS 서비스입니다. </Textfit>
      <Textfit max="20"> 당신이 먹은 음식을 하루하루 기록해보세요 </Textfit>
      <br/>
      <Textfit max="30"> - 맛 모아보기 </Textfit>
      <Textfit max="20"> 모든 유저가 작성한 기록이 최신순으로 나타납니다. </Textfit>
      <Textfit max="20"> 음식명을 클릭하면 더 자세한 내용이 나옵니다. </Textfit>
      <Textfit max="20"> 혹시 그 음식이 마음에 들었다면 도토리를 눌러보세요! 나중에 다시 찾아볼 수 있어요 </Textfit>
      <br/>
      <Textfit max="30"> - 유레카 </Textfit>
      <Textfit max="20"> "YUMYUM" 에서 유저간 소통하는 방법입니다. </Textfit>
      <Textfit max="20"> 주변유저와 실시간으로 소통가능하며, 음식에 관한 간단한 대화들을 주고 받을 수 있어요! </Textfit>
      <br/>
      <Textfit max="30"> - 주의사항 </Textfit>
      <Textfit max="20"> 모바일 디바이스를 위한 서비스입니다. WEB을 이용할 경우 주소장에 있는 "+"를 눌러서 사용하실 수 있어요.</Textfit>
      <Textfit max="20"> 음식영상에 집중할 수 있도록 "세로모드" 만 지원합니다. </Textfit>
      <Textfit max="20"> 일부 IOS 기기에서는 원활히 작동하지 않을 수 있습니다. </Textfit>
    </div>
  )
}

export default Howto;