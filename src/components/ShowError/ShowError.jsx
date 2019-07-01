import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ShowError(props) {
  const [modal, toggleModal] = useState(false);

  return (
    <Modal isOpen={ !modal } toggle={ ()=>toggleModal(!modal) } className={props.className}>
      <ModalHeader>Error</ModalHeader>
      <ModalBody>
        { props.children }
      </ModalBody>
      <ModalFooter>
        <Button color="success" block onClick={ () => toggleModal(!modal) }>Close</Button>
      </ModalFooter>
    </Modal>
  );
};
