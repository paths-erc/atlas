import React, { Component } from 'react';
import { Card, CardImg, Modal, ModalFooter, ModalBody } from 'reactstrap';

import Database from '../Services/Database/Database';
import Caption from './Caption';

const { card: CARD } = Database.IMAGE_PRESETS;

// The card shows a right-sized derived image (preset) and falls back to the original
// file when the server has no such preset (older BraDypUS, preset not defined yet,
// or a format the server cannot convert, e.g. TIFF). The modal shows the original.
export default class PreviewModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      cardFailed: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(){
    const { file } = this.props;
    const { cardFailed } = this.state;
    const cardSrc  = Database.getFileUrl(file, cardFailed ? null : CARD);
    const originalSrc = Database.getFileUrl(file);

    return (
      <div>
        <Card className="mt-1">
          <CardImg top
              width="100%"
              src={cardSrc}
              alt={file.description || file.filename || ''}
              loading="lazy"
              style={{ cursor: 'zoom-in' }}
              onError={() => { if (!cardFailed) this.setState({ cardFailed: true }); }}
              onClick={this.toggle} />
          <Caption text={file.description} attribution={file.attribution} />
        </Card>

        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalBody>
            <div>
              <img style={ { width: "100%" } }
                  src={originalSrc}
                  alt={ file.description || file.filename || '' } />
            </div>
          </ModalBody>
          <ModalFooter><Caption text={file.description} attribution={file.attribution} /></ModalFooter>
        </Modal>
      </div>
    );
  }
}
