import React, { Component } from 'react';

import SubHead from '../SubHead/SubHead';

class AuthorPage extends Component {

render() {
  return (
    <div>
      <SubHead tblabel="Authors" tb="authors" text="Introduction" />

      <div className="container">
          Here you will soon find some more information about coptic Authors!
      </div>
    </div>
  );
  }
}

export default AuthorPage;
