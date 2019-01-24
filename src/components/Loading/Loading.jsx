import React, { Component } from 'react';
import Ripple from './Ripple-1.7s-200px.svg';



export default class Loading extends Component {

  render() {
    const style = {
      width: this.props.width ? this.props.width : '100px'
    };
    return (
      <span>
        <img src={Ripple} style={style} alt="Loading..."/>
        {
          this.props.children !== '' ? this.props.children : <span>Loading...</span>
        }
      </span>
    );
  }
}
