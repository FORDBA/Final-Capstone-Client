import React, { useContext, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { UserContext } from "./UserProvider";

export default (props) => {
  const { userId, isActive } = props;
  const { updateActive } = useContext(UserContext)
  const [show, setShow] = useState(false);

  const handleProfileToggle = () => {
    if (isActive) {
      // The user is selecting to de-activate a profile. 
      // Show a modal to confirm de-activation
      setShow(true)
    }
    else {
      // The user is activating an inactive profile. 
      updateActive(userId, { is_active: "true" })
    }
  }

  const deactivateAndClose = () => {
    updateActive(userId, { is_active: "false" })
    setShow(false)
  }

  return (
    <>
      <label htmlFor="Active" style={{ paddingLeft: '10px', paddingRight: '5px'}}>Active</label>
      <input
        label="Active"
        id={`makeActive-${userId}`}
        name={`toggle_user_${userId}_role`}
        type="checkbox"
        checked={isActive}
        onChange={handleProfileToggle}
      />
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Dialog>
          <Col>
            <Modal.Title>Confirm Status Change</Modal.Title>
            <Modal.Body>
              <Row>
                <p>
                  Warning: This action will de-activate this user. Do you want to continue?
                </p>
              </Row>
              <Row>
                <Button
                  className="mr-1"
                  variant="secondary"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </Button>

                <Button variant="danger" onClick={deactivateAndClose}>
                  De-activate User
                </Button>
              </Row>
            </Modal.Body>
          </Col>
        </Modal.Dialog>
      </Modal>
    </>
  );
};
