import React, { Component } from "react";

class NotFound extends Component {
  render() {
    const { url } = this.props.match || {};
    return (
      <div>
        <h1>{url} 페이지를 찾을 수 없습니다.</h1>
      </div>
    );
  }
}

export default NotFound;
