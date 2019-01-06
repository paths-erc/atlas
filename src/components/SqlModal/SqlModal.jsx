import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SqlModal extends Component {

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
      <span>
        <Button color="danger" size="sm" onClick={this.toggle}><FontAwesomeIcon icon="code" /></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Executed SQL</ModalHeader>
          <ModalBody>
            <pre style={{ height: '200px', whiteSpace: 'pre-wrap' }}>{this.props.sql}</pre>  
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

export default SqlModal;
