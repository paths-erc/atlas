import React from 'react';
import { Row, Col } from 'reactstrap';

import packageJson from '../../../package.json';

import Erc from './img/erc.jpg';
import Sapienza from './img/sapienza.jpg';

export default function Footer () {

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

        <Row className="my-3">
          <Col xs={{ size: 6 }} md={{size: 3, offset: 3}}><img src={Sapienza} alt="Sapienza Università di Roma" className="img-fluid" /></Col>
          <Col xs={{ size: 6 }} md={{size: 3}}><img src={Erc} alt="European Research Council" className="img-fluid" /></Col>
        </Row>

        <div className="text-center">
          <p className="">
            Copyright © PAThs team, Sapienza Università di Roma.<br />
            <small>
              <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                Use, sharing and remixing permitted under terms of the<br />
                Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License<br />
                <img alt="Creative Commons License" style={{borderWidth:0}}
                      src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
              </a>
            </small>
          </p>

          <p>
            Version { packageJson.version }<br />
            <a href="https://github.com/paths-erc/atlas/commits/master" target="_blank" rel="noopener noreferrer">Changelog</a>
          </p>

        </div>

      </div>
    </footer>
  );
}
