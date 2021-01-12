import React, { Component } from "react";

class NotFound extends Component {
  render() {
    const { url } = this.props.match || {};
    return <div>{url} 페이지를 찾을 수 없습니다.</div>;
  }
}

export default NotFound;
