import React, { Component } from "react";

class NotFound extends Component {
  render() {
    const { url } = this.props.match || {};
    return (
      <section className="login">
        <div className="errormessage">
          <h3>{url}</h3>
          <h2>PageNotFound</h2>
        </div>
      </section>
    );
  }
}

export default NotFound;
