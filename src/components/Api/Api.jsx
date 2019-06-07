import React from "react";


export default class Api extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      text: false
    }
  }

  render(){
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>PAThs API & data export</h1>
          </div>
        </div>
        <div className="container">
          <div className="my-5 px-5">
            <p>“PAThs” makes available freely the contents of its database in different formats and for different purposes.
              All files are available for download in our Github documentation and data repository.</p>
            <p>Data can also be exported directly from our database by using the database API.</p>


            <h3>Pelagios</h3>
            Dump files for Pelagios are freely available for download on Github.
            <dl>
              <dt>VoID</dt>
              <dd>
                <a href="https://raw.githubusercontent.com/paths-erc/docs/master/data/paths-pelagios-void.rdf" target="_blank" rel="noopener noreferrer">
                  https://raw.githubusercontent.com/paths-erc/docs/master/data/paths-pelagios-void.rdf
                </a>
              </dd>

              <dt>Places</dt>
              <dd>
                <a href="https://raw.githubusercontent.com/paths-erc/docs/master/data/paths.places.ttl" target="_blank" rel="noopener noreferrer">
                  https://raw.githubusercontent.com/paths-erc/docs/master/data/paths.places.ttl
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
