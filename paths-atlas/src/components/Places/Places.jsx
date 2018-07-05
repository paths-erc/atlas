import React, { Component } from 'react';

import SubHead from '../subHead/subHead';

class PlacePage extends Component {

render() {
  return (
    <div>
      <SubHead tblabel="Places" tb="places" text="Introduction" />

      <div className="container">
          Here you will soon find some more information about places!
      </div>
    </div>
  );
  }
}

export default PlacePage;
