import React, { Component } from 'react';
import { Card, CardImg, Modal, ModalFooter, ModalBody } from 'reactstrap';

import Caption from './Caption';


export default class PreviewModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }



  render(){

    return (
      <div>
        <Card className="mt-1">
          <CardImg top
              width="100%"
              src={this.props.file}
              onClick={this.toggle} />
            <Caption text={this.props.description} />
        </Card>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalBody>
            <div>
              <img style={ { width: "100%" } }
                  src={this.props.file}
                  alt={ this.props.description } />
            </div>
          </ModalBody>
          <ModalFooter><Caption text={this.props.description} /></ModalFooter>

        </Modal>
      </div>
    );
  }
}
