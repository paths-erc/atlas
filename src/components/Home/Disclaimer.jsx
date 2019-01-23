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
          <p>This is an early development version of the PAThs Archaeological Atlas of Coptic Literature.
          As such, many features might non be yet available or work as expected.
          We are working hard to enhance both the user experience and
          the data quality and your help in this process is highly appreciated.</p>
          <p>Please, feel free to report any malfunction, breakdown or issue you might encounter
          during your work session, by writing a detailed email at  <a href="mailto:paola.buzi@uniroma1.it">paola.buzi@uniroma1.it</a>.</p>
        <p>Our datasets are growing on a daily basis, and will continue to grow in the next years.
          If you cannot find any item that, on the basis of our mission statement, should be present in our database,
          or if you find any inaccuracies or errors in the descriptive protocol or in the linking system,
          please report them by providing a thorough description at <a href="mailto:paola.buzi@uniroma1.it">paola.buzi@uniroma1.it</a>.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" block onClick={this.toggle.bind(this)}>I do understand</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
