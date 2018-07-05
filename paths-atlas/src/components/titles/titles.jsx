import React, { Component } from 'react';

import SubHead from '../SubHead/SubHead';

class TitlePage extends Component {

  render() {
    return (
    	<div>
        <SubHead tblabel="Titles" tb="titles" text="Introduction" />

        <div className="container">
            Here you will soon find some more information about coptic titles!
        </div>
  		</div>
    );
  }
}

export default TitlePage;
