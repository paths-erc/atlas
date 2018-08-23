import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Footer extends Component {

render() {

    return (
      <footer className="mt-5 bg-dark text-white p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p>Tracking Papyrus and Parchment Paths<br />
              <span  className="lead" style={{ color: '#ffab00'}}>An Archaeological Atlas of Coptic Literature</span><br />
              <small>Literary Texts in their Geographical Context:<br />
              Production, Copying, Usage, Dissemination and Preservation</small></p>
            </div>
            <div className="col text-right">
              <p>An <a href="https://erc.europa.eu/" target="_blank" rel="noopener noreferrer" title="European Research Council">ERC</a> funded project hosted at the <a href="https://www.uniroma1.it" target="_blank" rel="noopener noreferrer" title="Sapienza University of Rome">Sapienza University of Rome</a></p>
              <p>Principal Investigator <a href="http://www.lettere.uniroma1.it/users/paola-buzi" title="Paola Buzi" target="_blank" rel="noopener noreferrer">Paola Buzi</a> [<a href="mailto:paola.buzi@uniroma1.it" title="Email to Paola Buzi">paola.buzi(at)uniroma1.it</a>]</p>
              <p>
                <a href="http://paths.uniroma1.it/" target="_blank" rel="noopener noreferrer" title="PAThs’ web site">
                  paths.uniroma1.it
                </a>
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-secondary"><small>
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
              <img alt="Creative Commons License" style={{borderWidth:0}}
                    src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
            <br />
            This work is licensed under a Creative Commons Attribution 4.0 International License</a>.
            </small></p>

          <a href="https://github.com/paths-erc/atlas" title="Fork PAThs’ Atlas on Github" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'github']} size="2x" /> Fork on Github</a>
          </div>
        </div>
      </footer>
    );
  }
}
