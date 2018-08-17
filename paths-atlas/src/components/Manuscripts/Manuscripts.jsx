import React, { Component } from 'react';

import SubHead from '../SubHead/SubHead';

class ManuscriptPage extends Component {

render() {
  return (
    <div>
      <SubHead tblabel="Manuscripts" tb="manuscripts" text="Introduction" />

      <div className="container">
          Here you will soon find some more information about coptic manuscripts!
      </div>
    </div>
  );
  }
}

export default ManuscriptPage;
