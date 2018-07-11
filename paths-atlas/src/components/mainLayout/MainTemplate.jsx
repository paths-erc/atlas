import React from "react";
import Header from "./Header"
import './MainTemplate.css';

export default class MainTemplate extends React.Component{

  render(){
    return (
      <div>
        <Header location={this.props.location} />
          <main role="main" className="maxHeight">
            { this.props.children }
          </main>
      </div>
    );
  }
}
