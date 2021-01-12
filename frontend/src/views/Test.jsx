import React, { Component } from "react";
import PropTypes from "prop-types";

class Test extends Component {
  // 맨 처음 생성될 때 한번만 호출
  // 상태(state 또는 객체 변수)를 선언할 때 사용
  constructor(props) {
    super(props);
  }
  //
  componentWillMount() {
    console.log("componentWillMount");
  }
  // render() 함수가 JSX를 화면에 그린 이후에 호출되는 함수
  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
  }
  // 프로퍼티를 변경하거나 setState() 함수를 호출하여 state값을 변경하면 화면을 새로 출력해야 하는지 판단
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate");
  }
  // DOM정보를 변경할 때 사용
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }
  // 컴포넌트가 소멸되기 직전에 호출되는 함수
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  // 데이터가 변경되어 새 화면을 그려야 할 때 자동으로 호출되는 함수
  render() {
    return <div></div>;
  }
}

Test.propTypes = {};

export default Test;
