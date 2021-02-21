![header](https://capsule-render.vercel.app/api?type=wave&color=auto&height=300&section=header&text=Ahyeon%20Gil&fontSize=90&animation=fadeIn&fontAlignY=38)

<h2 align='center'>👋 안녕하세요? 저는 옴뇸뇸팀의 CTO입니다.👋</h2>
<h3 align='center'>🛠 Tech Stack 🛠</h3>
<p align='center'>
  <img src="https://img.shields.io/badge/Javascript-ffb13b?style=flat-square&logo=javascript&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/></a>&nbsp

> 프로젝트를 진행하면서 개인 공부 후 자료를 남기기 위한 목적으로 작성했습니다.



### Debounce

유레카 기능에서 버튼을 누를 때마다 물결을 지우는 함수가 너무 빨리, 너무 많이 호출되는 것을 막고자 공부하게 되었습니다. `onClick`, `onMouseDown`이나 `onScroll`과 같은 이벤트 핸들러를 사용할 때 콜백 함수가 실행되는 속도를 다음의 방법으로 제어할 수 있습니다.

- `throttling` : 시간 기반 빈도에 따른 변경 샘플링(함수가 주어진 시간 동안에 한 번 이상 호출되는 것을 막습니다.)
- `debouncing` : 비활성 주기 이후에 변경 적용(함수가 마지막으로 호출된 후 특정 시간까지 실행되지 않도록 해줍니다.)

물결이 퍼지는 애니메이션을 지우는 함수를 일정 시간 막기위해 debouncing을 적용했습니다. 다음 프로젝트 때에는 API요청과 같은 비싼 계산을 수행할 때 응용해 보면 좋을 것 같습니다.

```js
const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounce = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);
      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 2);
    }
    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

const ShoutPage = () => {
  useDebouncedRippleCleanUp(ripples.length, 1000, () => {
    setRipples([]);
    setMyNeighbor([]);
  });
    
    ...
    
```
여기에서 `setTimeout`은 일정 시간이 지난 후에 함수가 실행되도록 처리하는 역할을 하며, `clearTimeout`은 setTimeout을 취소하는 역할을 합니다.

- 참고 : [React 공식 문서 : 컴포넌트에 함수 전달하기](https://ko.reactjs.org/docs/faq-functions.html)

## Geohash

유레카에서 내 주변 위치의 유저들과 소통하기 위해 Geohash를 사용했습니다.

지오해시를 십진 경위도로 아래와 같은 문자맵을 사용하여 32진법으로 해시값을 해석할 수 있습니다.

| Decimal | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   | 11   | 12   | 13   | 14   | 15   |
| :-----: | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Base 32 | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | b    | c    | d    | e    | f    | g    |
|         |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Decimal | 16   | 17   | 18   | 19   | 20   | 21   | 22   | 23   | 24   | 25   | 26   | 27   | 28   | 29   | 30   | 31   |
| Base 32 | h    | j    | k    | m    | n    | p    | q    | r    | s    | t    | u    | v    | w    | x    | y    | z    |

ezs42라는 Geohash 값이 있다고 하면 아래 표에 의해서 "**01101 11111 11000 00100 00010**"로 표현이 됩니다.  

그럼 가장 왼쪽에 있는 0부터 시작해서 두칸씩 오른쪽 이동하면서 concat하면 011...이 나오고 이 값은 경도, 가장 왼쪽에 있는 0에서 한칸 옆에 있는 1부터 시작해서 두칸씩 오른쪽 이동하면서 concat하면 101...이 나오고 이 값은 위도가 됩니다.  

경도는 0111110000000, 위도는 101111001001입니다. 

bit|min|mid|max|val|err1
-|-|-|-|-|-
1|90.000 |0.000|90.000|45.000|45.000
0|0.000 |45.000|90.000|22.500|22.500
1|0.000 |22.500|45.000|33.750|11.250
1|22.500 |33.750|45.000|39.375|5.625
...|... |...|...|...|...

출처: https://www.internetmap.kr/entry/geohash [공간정보와 인터넷지도]

이것을 왼쪽에서 오른쪽으로 읽어가면서 범위를 좁혀가는 과정을 진행합니다. 위도를 예를 들어보면 1이면 오른쪽, 0이면 왼쪽을 선택해서 범위를 좁혀갑니다. 위도는 처음 시작할땐 -90 ~ +90입니다. 비트값이 0이면 -90 ~ 0, 1이면 0 ~ +90이 됩니다.



참고: [조급하지말고 천천히](https://dol9.tistory.com/234 )

참고 : [공간정보와 인터넷지도](https://www.internetmap.kr/entry/geohash)



```js
const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';
/**
 * 주어진 방향(direction)으로 인접한 cell 반환
 * geohash - 중심이 되는 cell
 * direction - geohash에서의 방향 (N/S/E/W).
 * @returns {string} Geocode of adjacent cell.
 */
function adjacent(geohash, direction) {
    geohash = geohash.toLowerCase();
    direction = direction.toLowerCase();

    if (geohash.length == 0) throw new Error('Invalid geohash');
    if ('nsew'.indexOf(direction) == -1) throw new Error('Invalid direction');

    const neighbour = {
        n: [ 'p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx' ],
        s: [ '14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp' ],
        e: [ 'bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy' ],
        w: [ '238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb' ],
    };
    
    const border = {
        n: [ 'prxz',     'bcfguvyz' ],
        s: [ '028b',     '0145hjnp' ],
        e: [ 'bcfguvyz', 'prxz'     ],
        w: [ '0145hjnp', '028b'     ],
    };

    const lastCh = geohash.slice(-1);    // last character of hash
    let parent = geohash.slice(0, -1); // hash without last character

    const type = geohash.length % 2;

    // check for edge-cases which don't share common prefix
    if (border[direction][type].indexOf(lastCh) != -1 && parent != '') {
        parent = adjacent(parent, direction);
    }

    // append letter for direction to parent
    return parent + base32.charAt(neighbour[direction][type].indexOf(lastCh));
}


/*
 @returns {{n,ne,e,se,s,sw,w,nw: string}}
 */
export function neighbours(geohash) {
    return [
        geohash,
        adjacent(geohash, 'n'),
        adjacent(adjacent(geohash, 'n'), 'e'),
        adjacent(geohash, 'e'),
        adjacent(adjacent(geohash, 's'), 'e'),
        adjacent(geohash, 's'),
        adjacent(adjacent(geohash, 's'), 'w'),
        adjacent(geohash, 'w'),
        adjacent(adjacent(geohash, 'n'), 'w'),
    ];
}
```

- 참고 : [movable type](https://www.movable-type.co.uk/scripts/geohash.html)



## Firestore

Cloud Firestore는 클라우드에 호스팅되는 NoSQL 데이터베이스 서비스입니다. 간편하게 사용할 수 있는 표현형 쿼리를 지원하고, 실시간 리스너를 추가하면 업데이트가 발생할 때마다 앱 데이터를 최신 상태로 유지할 수 있습니다. 따라서 유저간의 상호작용이 필요한 유사 채팅 서비스인 유레카를 구현하기 위해 사용했습니다.

#### 초기화

프로젝트에 다음 코드를 추가하여 firestore 인스턴스를 초기화 해줍니다.

```js
import firebase from "firebase/app";
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

var db = firebase.firestore();
```

#### 데이터추가

- 단일 문서를 만들거나 덮어쓰려면 `set()`을 사용합니다. `set()`은 문서가 없으면 새로 만들고 있으면 새로 제공한 내용을 덮어씁니다. `set()`을 사용해서 문서를 만들 때는 만들 문서의 ID를 지정해야 합니다. 아래 예시에선 Email을 ID로 사용했습니다.
- 그러나 문서에 유의미한 ID를 두지 않고 자동으로 생성되도록 할 때에는 `add()`를 호출하면 됩니다. 

```js
const data = {
  nickname: Nickname,
  avatar: avatarId,
  lat: lat, //y
  lng: lng, //x
  geohash: geofire.geohashForLocation([lat, lng]).substring(0, 5),
};
firestore.collection("users").doc(Email).set(data);
```

- 전체 문서를 덮어쓰지 않고 문서의 일부 필드를 업데이트하려면 `update()`를 사용합니다.

```js
const data = {
  nickname: nickname,
  avatar: avatarId,
};
firestore.collection("users").doc(userEmail).update(data);
```

- 문서가 작성되는 시간을 타임스탬프로 설정할 수 있습니다.

```js
const data = {
    geohash: pos,
    message: {
        content: myMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    },
};
firestore.collection("users").doc(userEmail).update(data);
```

- 문서의 특정 필드를 삭제하려면 문서를 업데이트할 때 `FieldValue.delete()`를 사용합니다.

```js
var userRef = firestore.collection("users").doc(userEmail);
userRef.update({
    message: firebase.firestore.FieldValue.delete(),
});
```



- 참고 : [Firebase 공식문서](https://firebase.google.com/docs/firestore?hl=ko)