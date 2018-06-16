import React, { Component } from 'react';

import SubHead from '../subHead/subHead';

class AuthorPage extends Component {

render() {
  return (
    <div>
      <SubHead tblabel="Authors" tb="authors" text="" />

      <div className="container">
          Here you will soon find some more information about coptic Authors!
      </div>
    </div>
  );
  }
}

export default AuthorPage;
