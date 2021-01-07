import React, { useContext, useRef, useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { BsGearFill } from "react-icons/bs";
import { NoteContext } from "./NoteProvider";

/**
 * ConfirmableEditNoteButton component - renders as an "Edit" button that, when clicked, renders a react-bootstrap Modal prompting the user to edit their note and then confirm that they truly want to edit that note.
 *
 * PROPS:
 *  note <Object> - the note object, itself. Has a label and id property.
 *  prompt (optional) <String> - The text to display as the confirmation text in the modal.
 *    default value (if nothing passed in props) is "Edit this Note"
 */
export const ConfirmableEditNoteButton = (props) => {
  const { updateNote } = useContext(NoteContext);
  const contentRef = useRef("");

  const confirmEditPrompt = props.prompt || "Edit this Note";

  const [isEditing, setIsEditing] = useState(false);

  const handleConfirmUpdate = () => {
    if (
      contentRef.current.value.trim().length
    ) {
      updateNote({
        id: props.note.id,
        content: contentRef.current.value,
      }, props.workflowId);
      setIsEditing(false);
    } else alert("please enter valid content for both fields");
  };

  return (
    <>
      <div onClick={(e) => e.preventDefault()}>
        <Button
          className="border-0 bg-white text-dark"
          onClick={() => setIsEditing(true)}
        >
          <BsGearFill style={{ fontSize: "36px" }} />
        </Button>
      </div>
      <Modal
        show={isEditing}
        onHide={() => setIsEditing(false)}
        className="confirmableEditModal"
      >
        <Modal.Dialog>
          <Modal.Title>Confirm Update</Modal.Title>
          <Modal.Body>
            <Row>
              <p>{confirmEditPrompt}</p>
            </Row>
            
            <Row>
              <input
                type="text"
                name="content"
                ref={contentRef}
                defaultValue={props.note.content}
              />
            </Row>
            <Row>
              <Button
                className="mr-1"
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>

              <Button variant="success" onClick={handleConfirmUpdate}>
                Confirm Update
              </Button>
            </Row>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};
