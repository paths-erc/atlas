import React, { Component } from 'react';
import { Card, CardImg, Modal, ModalFooter, ModalBody } from 'reactstrap';

import Database from '../Services/Database/Database';
import Caption from './Caption';

const { card: CARD, large: LARGE } = Database.IMAGE_PRESETS;

// Shows a right-sized derived image (preset) and falls back to the original file
// when the server has no such preset (older BraDypUS, preset not defined yet,
// or a format the server cannot convert, e.g. TIFF).
export default class PreviewModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      cardFailed: false,
      largeFailed: false
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
    const { cardFailed, largeFailed } = this.state;
    const cardSrc  = Database.getFileUrl(file, cardFailed ? null : CARD);
    const largeSrc = Database.getFileUrl(file, largeFailed ? null : LARGE);

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
                  src={largeSrc}
                  alt={ file.description || file.filename || '' }
                  onError={() => { if (!largeFailed) this.setState({ largeFailed: true }); }} />
            </div>
          </ModalBody>
          <ModalFooter><Caption text={file.description} attribution={file.attribution} /></ModalFooter>
        </Modal>
      </div>
    );
  }
}
