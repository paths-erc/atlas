import React, { Component } from 'react';

import SubHead from '../SubHead/SubHead';

class WorkPage extends Component {

render() {
  return (
    <div>
      <SubHead tblabel="Works" tb="works" text="Introduction" />

      <div className="container">
          Here you will soon find some more information about coptic works!
      </div>
    </div>
  );
  }
}

export default WorkPage;
