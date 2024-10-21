import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationDialog = ({ show, onHide, onConfirm, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;
