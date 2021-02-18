# 1. 팀 내 나의 역할

- 프론트엔드 PL(Proejct Leader)
  - 프론트엔드 파트 를 리드하고 백엔드와의 협업을 위한 소통을 담당
  - 프론트엔드 파트의 업무 조율

- 프론트 개발자
  - 프론트엔드 파트 구현
  - UI/UX 고안 후 구현



# 2. 주요 구현 기능

## 1. Feed CRUD

> 우리 서비스 "YUMYUM" 의 가장 큰 특징은 각 피드를 짧은 동영상으로 제공한다는 것이다. 이를 위해 `Video` type의 데이터를 입력하고, 서버에 저장 그 후 불러와 출력하는 기능이 모두 구현되어야 한다. 



### 1-1. Feed Create

> 가장 먼저 완성된 기능이지만 , 가장 어려웠던 기능 중 하나이기도 하다.  `file`타입의 데이터를 전송하는 것도 처음이었고, 이를 위해  `Formdata()` 를 처음 사용하는 것도 처음이었기 때문이다. `백엔드` 파트도 마찬가지여서 요청에 대한 결과를 같이 살펴가며 작업을 진행하였다.  결국 `Formdata()`를 활용해야 한다는 것을 알았지만, 이를 마지막 파트에서 구성해서 만들면 정보는 잘 담기지만 백엔드에서 제대로 불러와지지 않았다. 그래서 가장 처음단계인 동영상 촬영 단계에서 formdata를 만든 후, 이 자체를 넘겨주는 형태로 설계하니 제대로 작동하였다.



#### 1-1-1. 동영상을 사용한 Feed 작성

- `YUMYUM`의 경우, `모바일 디바이스`를 위한 서비스이다. 그렇기 때문에 모바일 기기에서 작동 시, 기기의 카메라를 작동시켜 동영상을 입력할 수 있도록 하였다. 위 기능을 구현하기 위해서 PWA를 도입하였는데, 이는 `3장. PWA`에서 더욱 자세하게 다룰 예정이다.

```jsx
/// 동영상 INPUT
<input
    accept="video/*"
    id="icon-button-file"
    type="file"
    name="file"
    capture="environment"
    onChange={(e) => handleCapture(e.target)}
/>
```

> - `capture="environment"`는 모바일 디바이스 이용 시,  `후면카메라(environment)`로 촬영하도록 설정해놓은 값이다. 전면 카메라 사용시, `user`로 설정한다.



- `WEB`에서 작성하는 경우, File를 넣을 수 있는 `열기`창이 나타나고 원하는 파일을 선택하면 해당 영상이 바로 재생된다. 

```jsx
/// handleCapture(e.target) 로직
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        const formData = new FormData();
        formData.append('file', file);
        setSource(newUrl);     
        setFormData(formData);
      }
    }
  };

/// 바로 출력하기
 { source ? (
        <div className="catchVideo">
          <video 
            id="background-video" 
            className='videoTag' 
            src={source} 
            type='video/*'
            height="100%"
            width="100%"
            autoPlay 
            loop 
            muted 
          />
    ) : (
   기존 화면
     ...
 }
```

> - File을 `file`이란 변수에 담아주고,  그 파일을 바로 보여주기 위해 Object에 관한 URL을 만들어 변수에 담아준다. URL 을 담아준 `source`가 있으면, 기존 화면대신 Video를 재생시켜서 영상을 확인할 수 있도록 하였다.
> - 여기서 `FormData()`를 만들어 file에 대한 정보를 담아주었는데, 이는 이후 서버에 파일을 업로드 하기 위해서는 `FormData`의 형태를 요구하기 때문이다. 



#### 1-1-2. kakao Map API를 활용한 식당정보 입력

- 음식을 먹은 식당정보를 담기 위해서, `Kakao Map API`를 활용하였다.  우선 화면구성부터 살펴보면

```jsx
/// 화면 표현 return 
<div className="feedmap">
    // 화면에 오버레이 되는 버튼 출력 조건문
    { isList ? <></> :  detailPlaceInfo ? 
        <ArrowForwardRoundedIcon className="arrowcircle" onClick={sendPlaceInfo} fontSize="large" /> : 
        <div className="skip" onClick={sendPlaceInfo}> 집에서 먹었어요! </div>
    }
    <div className="map_wrap">
        // 이 부분이 Map 출력
        <div id="map" style={{ width: "100vw", height: "83.5vh" }}></div>
        {isList && (
            <div id="menu_wrap" className="bg_white">
                <div className="option"></div>
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
        )}
    </div>
</div>
```

> - 기본적으로 Map이 출력되고 식당을 검색했을 때, 거리순으로 식당정보가 불러와지고 이를 `isList`로 판단한 후 `Overlay`형태로 지도 위에 띄워줍니다.
> - 상단 버튼부분은 `검색한 식당(isList)` 과 `선택한식당(detailPlaceInfo)` 이 없다면, `Skip`버튼으로 장소정보 입력을 넘어갈수 있도록 했습니다. 그리고  `검색한 식당(isList)` 만 있다면, 버튼을 제거해 UX적으로 더 편한하도록 구성했습니다.



- 지도 불러오기

```jsx
/// 지도 생성하기
  const [map, setCreateMap] = useState(null);

  useEffect(() => {
    createMap();
  }, []);

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
```

> - `level`을 통해 처음 불러왔을 때, 지도의 축척 정도를 조절할 수 있고, `draggable`를 통해 화면을 이동할 수 있도록 합니다.



- 장소 검색하기

```jsx
function searchPlaces() {
    if (searchContent) {
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다.
    ps.keywordSearch(searchContent, placesSearchCB, {
      location: center,
      sort: kakao.maps.services.SortBy.DISTANCE,
    });
    setIsList(true);
    }
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
      console.log('검색에러1')
    }
  }
```

> - `SearchBar`의 검색어를 통해 API에 정보를 요청하고, `현재화면 위치(location)`를 기준으로 `sort: kakao.maps.services.SortBy.DISTANCE,` 가까운 거리순으로 정보를 불러온다. 
> - 정상적으로 검색이 완료되면, 지도에 마커를 추가해준다.



#### 1-1-3. Feed 정보 서버에 전달하기

- 앞에 `동영상입력`, `위치정보입력`  2가지 과정에서 얻은 data와 마지막 `CreateFeed.jsx`에서 입력되는 정보를 모두 합쳐 서버와 Axios 요청을 통해 데이터를 보내주어야 한다.

```jsx
/// 위치정보 입력하는 곳에서 보내준 데이터 형태

function sendPlaceInfo() {
    if (detailPlaceInfo) {
        if (createFormData){
            props.history.push({
              pathname: "/feed/createfeed",
              state: {
                detailPlace: detailPlaceInfo,
                formData: createFormData,
              },
            })
        } else {
          props.history.push({
            pathname: "/feed/createfeed",
            state: {
              detailPlace: detailPlaceInfo,
              formData: formData,
            },
          })
        };
    } else {
      const detailPlace = {
        address_name : "아늑한 우리집",
        id : -1,
        phone : "프라이버시입니다.",
        place_name : "우리집",
        x : -1,
        y : -1
      }
      props.history.push({
        pathname: "/feed/createfeed",
        state: {
          detailPlace: detailPlace,
          formData: formData,
        },
      })
    }

  }

/// 이를 불러와서 사용한다.
const placeInfo = props.location.state.detailPlace;
const formData = props.location.state.formData;
```

> 앞에서 얻은 정보들은 `props.history.push`  다음과 같이 history를 사용하여 입력해주었고, 이를 불러와서 사용하였다.



- 모든 데이터 합쳐서 Axios 통신

```jsx
const [place, setPlace] = useState({});

const onSubmitHandler = (e) => {
    e.preventDefault();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("score", score);
    formData.append("userEmail", getEmail());
    formData.append("placeId", placeInfo.id);
    place.addressName = placeInfo.address_name;
    place.id = placeInfo.id;
    place.phone = placeInfo.phone;
    place.placeName = placeInfo.place_name;
    place.x = placeInfo.x;
    place.y = placeInfo.y;

    if (title && content && score) {
      dispatch(registerPlace(place))
        .then((res) => {
          dispatch(createFeed(formData))
            .then((res) => {
              if (res.payload.status) {
                props.history.push("/feed/flippages");
              } else {
                alert("피드 생성 실패");
              }
            })
            .catch((err) => {
              console.log("피드 실패 에러");
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("장소 실패 에러");
          console.log(err);
        });
    } else {
      alert("에러 발생");
    }
  };
```

> - 서버쪽에서 `장소정보`와 `피드정보`를 분리해서 사용하기 위해서  먼저 장소정보를 보내주고, 이후 피드정보를 보내주는 형태로 구성하였다.
> - `place`는 우리 서비스에서 필요한 정보만 담아서 보내기 위해, 재가공하는 과정을 거쳤다.
> - `formdata`는 앞에서 넘어온 동영상 데이터와 함께 음식명, 한줄평, 별점 등을 담아서 가공했다.



### 1-2. Feed Read

> 서버스에서 가장 중요한 파트였다. 결국 서비스의 최종 목표는 음식영상을 깔끔하고, 한눈에 보기쉽게 보여주는 것이기 때문이다. 그래서 목업설계부터, 프레임워크까지 신중하게 진행하였다. 디자인적으로는 맘에 들도록 구성했지만, 이를 코드로 구현하는 과정이 더 어려운 것이라는 걸 깨닫기까지 오래 걸리지 않았다. ~~가장 깔끔한 것이 가장 어려운 것이다~~



#### 1-2-1. Flip Page형태로 구성

- 하나의 한개의 피드만 보여줘 사용자의 집중력을 높이고자 했습니다. 또한 컴포넌트를 최소화해 화면을 단순화했습니다.

- [react-full-page](https://www.npmjs.com/package/react-full-page)라는 패키지를 사용해 구현하였습니다.
  - 해당 패키지 불러와서 사용중에 제대로 load가 되지 않아서 코드를 불러와 구현했습니다.

```jsx
import FullPage from "../../_components/pagecomponents/FullPage";
import Slide from "../../_components/pagecomponents/Slide";


/// 작성된 모든 피드를 불러오는 함수
const getFeedDatas = (e) => {
    dispatch(getAllFeed()).then((res) => {
        const reversedObjs = JSON.parse(res.payload.data);
        const objs = reversedObjs.reverse()
        const part = objs.slice(0, 5)
        setAllFeeds(objs)
        setFeeds(
            part.map((obj) => (
                <Slide key={obj.id}>
                    <Feed key={obj.id} feed={obj} />
                </Slide>
            ))
        );
    });
};

return (
    <FullPage>
        {feeds}
    </FullPage> 
)


```

> - 피드를 불러와 `map` 함수를 통해 key값과 value값을 넘겨주었고, FlipPage 구성을 위해 필요한 `Slide`로 해당 요소를 감쌌습니다.



#### 1-2-2. Infinity Scroll을 사용해 데이터 로드 최적화

- PWA로 구현하는 과정에서 한꺼번에 너무 많은 데이터를 불러오게 되면 로딩이 느려지고, 동영상이 버벅이는 현상을 발견했습니다. 이를 최소화하기 위해 마지막 load된 글중 마지막 feed를 볼 때, 추가적으로 데이터를 불러오는 방식을 구현했습니다.

```jsx
/// 피드를 추가적으로 더하는 함수

const fetchMoreFeeds = async () => {
    setFetching(true);
    const fetchedData = allFeeds.slice(nowPages, (nowPages+1))
    const addFeeds = (
      fetchedData.map((obj) => (
        <Slide>
          <Feed key={obj.id} feed={obj} />
        </Slide>
      ))
    );
    const mergedData = feeds.concat(...addFeeds);
    setFeeds(mergedData);
    setNowPages(nowPages + 1)
    setFetching(false);
  };
  
/// 마지막 피드인지 확인하는 로직
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight + clientHeight >= scrollHeight && fetching === false) {
      fetchMoreFeeds();
    }
   };

/// 스크롤 감지
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
```

> - 마지막 피드를 확인하는 방식은 현재 보고있는 화면의 위치를 기준으로 판단했습니다. `scrollHeight`는 전체 스크롤의 길이이고, `scrollTop`은 현재 화면 뒷부분, `clientHeight`은 현재 보고있는 화면의 높이이다. 현재화면 + 현재화면 윗부분 = 전체 스크롤의 길이가 나오는데, Navbar로 인한 오차가 있어서 현재화면 위치를 보정값으로 한번 더 더해주었습니다.
>
> - `Scroll` 이벤트가 발생할때마다 `handleScroll`을 발생시켜 파악했습니다.



#### 1-2-3. detail 정보

- 체험 유저들의 후기를 파악 중, 좀 더 영상에 집중할 수 있도록, 피드에 대한 자세한 설명은 가릴 수 있었으면 좋겠다는 의견이 있었습니다. 이를 반영하기 위해서 `Collapse` 형태를 구현하였습니다.
- [react-collapse](https://www.npmjs.com/package/react-collapse)라는 패키지를 사용하였습니다.

```jsx
import { Collapse } from 'react-collapse';
import { useEffect } from 'react';

  const openHandler = () => {
    setIsOpened(!isOpened)
  }
  
  /// 다른 Collapse가 켜지면 현재 켜져있는 건 숨기기
  useEffect(() => {
    if (isOpened) {
      setIsOpened(false)
    }
  },[isEdit])

  useEffect(() => {
    if (isEdit) {
      setIsEdit(false)
    }
  },[isOpened])

  ....
      <Collapse isOpened={isOpened}>
          <div className="inblock">
            <LocalDiningRoundedIcon id="nameIcon" fontSize="small"/> 
            <h4> {feed.place.placeName} </h4>
            <div>
              <StorefrontRoundedIcon id="storeIcon" fontSize="small" />
              <h5> {feed.place.addressName} </h5>
              <h5> {feedDate.year}.{feedDate.month.slice(0,3)}.{feedDate.dayOfMonth} / {feedDate.dayOfWeek.slice(0,3)}  </h5>
            </div>
            <hr id="second_line"/>
              <br />
            <TextsmsRoundedIcon id="commentIcon"/>
              <h3> " {feedContent} " </h3>
          </div>
        </Collapse>
        <Collapse isOpened={isEdit}>
          <div className="inblock" id="editform">
            <h3> 글 수정해염 </h3>
            <hr/>
            <form onSubmit={onSubmitHandler}>
              <ReactStars
                id="stars"
                count={5}
                value={feedscore}
                onChange={ratingChanged}
                size={35}
                activeColor="#ffd700"
              />
              <textarea
                rows="4" 
                value={content}
                onChange={onContentHandler}
                placeholder={feed.content}
              >
              </textarea>
              <button type="submit">
                <DoneOutlineIcon />
              </button>
            </form>
          </div>
        </Collapse>
   ....   
         
```

> - 2개의 Collapse를 동시에 사용했습니다. 이때 둘다 켜져있는 상황을 방지하기 위해서 하나가 켜지면 반대편은 꺼지도록 구성했습니다.
>
> - 각각의 Collapse는 `피드 디테일` 과 `피드수정`을 담당했습니다.



### 1-3. Feed Update

- feed 수정은 mypage를 통해서 들어갈 때만 해당 버튼이 나타나도록 구현했습니다.

```jsx
useEffect(() => {
    if (props.match.path ==="/feed/flippagesUser") {
        const loggedEmail = JSON.parse(localStorage.getItem("loggedInfo")).email;
        if (loggedEmail === feedUser.email) {
            setIsThreeDots(true)
        }
    }
})
```

> 이전 경로가 어디서 온지 파악하고, 해당 경로가 개인 feed 이고 그 개인이 로그인 된 유저일 때 `threedot`를 화면에 표시하였습니다.



### 1-4. Feed Delete

#### 1-4-1. delete 후 화면에 바로 반영

- 해당 피드가 삭제된 후, 화면에 바로 반영될 수 있도록 `display: none`을 적용하였습니다.
  - `full-page`라이브러리상 저절로 생성되는 div 태그가 있어서 그 상단에 접근하기 위해서 `getElementById`를 활용해 `parentNode`에 스타일을 지정하는 형태로 하였습니다.

```jsx
useEffect((e) => {
    if (isDeleted) {
        const videoBox = document.getElementById(videoId)
        const mother = videoBox.parentNode;
        mother.style.display="none";
    }  
}, [isDeleted])
```



## 2. Feed 좋아요

- 

## 3. PWA 

- 사실 PWA를 구현했다고 하기엔 부족한 부분이 너무 많고 이해하지 못한 내용도 수두룩합니다. 하지만 저희 서비스는 모바일을 목표로 하기 때문에 모바일 기기 뿐만 아니라 웹에서도 모바일같은 체험감을 주기위해 최소한의 조건만 충족시킨 형태로 서비스를 제공하게 되었습니다. 이후 기회가 된다면 PWA를 보다 완벽하게 구현해 서비스를 제공해보고싶습니다.
- [이근동님의 블로그](https://geundung.dev/85)와 [web.dev](https://web.dev/progressive-web-apps/)에서 가장 많은 도움을 받았습니다. 나중에 PWA관련 책을 구입해 전체적으로 한번 구현해 볼 예정입니다. 아래 내용은 PWA를 공부하면서 간단하게 개념만 정리해 놓은 것입니다.

### 3-1. PWA 개념

- Progressive Web App의 약자
- 웹의 장점과 앱의 장점을 결합한 것으로, 간단히 생각하면 브라우저에서 지원하는 앱이라고 생각할 수 있다.

### 3-2. PWA의 장점

1. Progressive : PWA에 이름에 쓰인 것처럼 점진적인 개선이 진행되며, 모든 브라우저 사용자에게 적합하다.
2. 앱과 유사하기 때문에 앱 스타일처럼 사용하거나 푸시 등의 기능을 구현할 수 있다.
3. 반응형으로 이루어져 있다.
4. 연결 독립적으로 오프라인이나 느린 네트워크에서도 작동하도록 구성된다.
5. 푸시 알람 등을 통해 재참여을 유도할 수 있다.
6. 홈화면에 앱처럼 등록할 수 있다.
7. HTTPS를 통해 제공되므로 안정성이 보장됩니다.

### 3-3. PWA의 Life Cycle

<img src="JAEYU.assets/sw-lifecycle.png" alt="img" style="zoom:67%;" />



### 3-2. PWA 구현 방식



# 3. 기타 구현 기능

#### 