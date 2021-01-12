# React

`create-react-app`설치
```shell
yarn global add create-react-app
```
리액트 앱 생성
```shell
create-react-app <react-app-name>
```

### 컴포넌트 단축키
| 키워드 | 설명                                               |
| ------ | -------------------------------------------------- |
| RCC    | 기본리액트 컴포넌트 코드를 생성합니다              |
| RCCP   | 리액트 컴포넌트를 프로퍼티 타입과 함께 생성합니다. |
| RCFC   | 리액트 컴포넌트를 생명주기 함수와 함께 생성합니다. |
| RPC    | 리액트 퓨어 컴포넌트를 생성합니다                  |
| RSC    | 함수형 컴포넌트를 생성합니다                       |
| RSCP   | 함수형 컴포넌트를 프로퍼티 타입과 함께 생성합니다  |

### 컴포넌트 구성 요소
| 데이터 구성 요소 | 특징                                                         |
| ---------------- | ------------------------------------------------------------ |
| 프로퍼티         | 상위 컴포넌트에서 하위 컴포넌트로 전달되는 읽기 전용 데이터입니다. |
| state            | 컴포넌트의 상태를 저장하고 변경할 수 있는 데이터입니다.      |
| 컨텍스트         | 부모 컴포넌트에서 생성하여 모든 자식 컴포넌트에 전달하는 데이터입니다. |

### 프로퍼티

#### 프로퍼티 활용

`./src/PropsComponent.jsx`
```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PropsComponent extends Component {
  render() {
    return <div className="message-container">{this.props.name}</div>;
  }
}

PropsComponent.propTypes = {
  name: PropTypes.string,
};

export default PropsComponent;

```
`./src/App.jsx`
```js
import React, { Component } from 'react';
import PropsComponent from './PropsComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="body">
        <PropsComponent 
          name="안녕하세요?"
        />
      </div>
    );
  }

}
export default App;
```
#### 다양한 프로퍼티 사용하기

```js
import React, { Component } from "react";
import PropTypes from "prop-types";

class ChildComponent extends Component {
  render() {
    // 객체 구조 분해 할당식으로 render()함수 내의 지역 변수로 재 정의
    const {
      boolValue,
      numValue,
      arrayValue,
      objValue,
      nodeValue,
      funcValue,
    } = this.props;
    return (
      <div>
        <span>불리언값: {boolValue}</span>
        <span>숫자값: {numValue}</span>
        <span>배열값: {arrayValue}</span>
        <span>객체값: {objValue}</span>
        <span>노드값: {nodeValue}</span>
        <span>함수값: {funcValue}</span>
      </div>
    );
  }
}
// 객체 형태로 프로퍼티의 자료형 정의
ChildComponent.propTypes = {
  boolValue: PropTypes.bool,
  numValue: PropTypes.number,
  arrayValue: PropTypes.arrayOf(PropTypes.number),
  objValue: PropTypes.object,
  nodeValue: PropTypes.node,
  funcValue: PropTypes.func,
};

export default ChildComponent;
```
`App.jsx`
```jsx
import React, { Component } from 'react';
import PropsComponent from './PropsComponent';
import './App.css';

class App extends Component {
  render() {
    const array = [1, 2, 3];
    return (
      <div className="body">
        <ChildComponent 
          boolValue={true}
    	  numValue={1}
		  // 실수를 줄이기 위해 변수에 객체를 담는 방식을 선호함
          arrayValue={array}
          objValue={{ name: '제목', age: 30 }}
          nodeValue={<h1>노드</h1>}
          funcValue={() => { console.log('메시지'); }}
        />
      </div>
    );
  }

}
export default App;
```



#### 불리언 프로퍼티 사용하기

프로퍼티에 true 전달

```jsx
<ChildComponent boolValue />
```

프로퍼티에 false 전달

```jsx
<ChildComponent />
```

#### 객체형 프로퍼티 사용하기

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";

class ChildComponent2 extends Component {
  render() {
    const { objValue } = this.props;
    return (
      <div>
        // 객체를 문자열로 변환하여 출력
        <span>객체값: {String(Object.entries(objValue))}</span>
      </div>
    );
  }
}
// 객체 프로퍼티 자료형 정의
ChildComponent2.propTypes = {
  objValue: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
};

export default ChildComponent2;
```

#### 필수 프로퍼티 사용하기

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";

class ChildComponent2 extends Component {
  render() {
    const { 
        objValue,
        requiredStringValue,
    } = this.props;
    return (
      <div>
        <span>객체값: {String(Object.entries(objValue))}</span>
        <span>필수값: {requiredStringValue}</span>
      </div>
    );
  }
}
ChildComponent2.propTypes = {
  objValue: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
  // PropTypes에 정의된 변수 안의 특수 변수 isRequired를 이용하여 필수 프로퍼티로 지정
  requiredStringValue: PropTypes.string.isRequired,
};

export default ChildComponent2;
```

#### 프로퍼티에 기본값 지정하기

```jsx
ChildComponent2.propTypes = {
    boolValue: PropTypes.bool,
};
ChildComponent2.defaultProps = {
    voolValue: false,
};
```

#### 자식 프로퍼티 사용하기

`App.jsx`

```jsx
<ChildProperty>
	<div><span>자식 노드</span></div>
</ChildProperty>
```

`childProperty.jsx`

```jsx
class ChildProperty extends Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}
ChildProperty.propTypes = {
    children: PropTypes.node,
}
```

### state

state를 사용할 때 주의 점

1. 생성자(constructor)에서 반드시 초기화해야 한다.
2. state값을 변경할 때는 setState() 함수를 반드시 사용해야 한다.
3. setState() 함수는 비동기로 처리되며, setState() 코드 이후로 연결된 함수들의 실행이 완료된 시점에 화면 동기화 과정을 거친다.

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StateExample extends Component {
  constructor(props) {
    super(props);
    // 컴포넌트에서 관리하려는 변수 state 정의
    this.state = {
      loading: true,
      formData: 'no data',
    };
    // 함수로 넘어갈 this는 반드시 bind로 묶어주어야 함
    this.handleData = this.handleData.bind(this);
    // 4초 뒤 handleData() 함수 호출
    setTimeout(this.handleData, 4000);
  }
  handleData() {
    const data = 'new data';
    // 컴포넌트 특수 변수 this.state를 사용하여 state 값에 접근
    const { formData } = this.state;
    // 컴포넌트의 내장함수 this.setState()를 사용하여 state 변경
    this.setState({
      loading: false,
      formData: data + formData,
    });
    // this.state.loading은 현재 true입니다.
    console.log('loading값', this.state.loading);
  }

  render() {
    return (
      <div>
        {/* 컴포넌트 특수 변수 this.state를 사용하여 state값에 접근한다. */}
        <span>로딩중: {String(this.state.loading)}</span>
      </div>
    );
  }
}

StateExample.propTypes = {};

export default StateExample;

```



### 리액트 라우터

| 라우터 컴포넌트 종류 | 설명                                                         |
| -------------------- | ------------------------------------------------------------ |
| BrowswerRouter       | HTML5를 지원하는 브라우저의 주소를 감지합니다.               |
| HashRouter           | 해시 주소(http://localhost#login)를 감지합니다.              |
| MemoryRouter         | 메모리에 저장된 이전, 이후 주소로 이동시키는 라우터입니다.   |
| NativeRouter         | 리액트 네이티브를 지원하는 라우터입니다.                     |
| StaticRouter         | 브라우저의 주소가 아닌 프로퍼티로 전달된 주소를 사용하는 라우터입니다. |