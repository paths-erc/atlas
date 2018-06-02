import React, { Component } from 'react';

import SubHead from '../subHead/subHead';

class TitlePage extends Component {

  render() {
    return (
    	<div>
        <SubHead tblabel="Titles" tb="titles" text="" />

        <div className="container">
            Here you will (hopefully) soon find some more information about coptic titles!
        </div>
  		</div>
    );
  }
}

export default TitlePage;
