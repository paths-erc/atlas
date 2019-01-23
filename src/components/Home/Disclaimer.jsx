import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Disclaimer extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      modal: true,
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(){
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} className={this.props.className}>
        <ModalHeader>Disclaimer</ModalHeader>
        <ModalBody>
          <p>The Archaeological Atlas of Coptic Literature is still in progress, therefore many features might not be yet available or work as expected. Our datasets are growing on a daily basis, and will continue to grow in the next years.</p>
          <p>Please, feel free to report any malfunction, breakdown, omission, error you might encounter during your work session, by writing to <a href="mailto:paola.buzi@uniroma1.it">paola.buzi@uniroma1.it</a>.</p>
          <p><strong>The Atlas is meant to become a tool useful for the whole scholarly community, and its completeness and correctness also depends on the contribution of users.</strong></p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" block onClick={this.toggle.bind(this)}>I do understand</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
