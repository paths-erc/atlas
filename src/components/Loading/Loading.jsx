import React from 'react';
import Ripple from './Ripple-1.7s-200px.svg';



export default function Loading(props) {

  const style = {
    width: props.width ? props.width : '100px'
  };
  return (
    <span>
      <img src={Ripple} style={style} alt="Loading..."/>
      {
        props.children !== '' ? props.children : <span>Loading...</span>
      }
    </span>
  );
}
