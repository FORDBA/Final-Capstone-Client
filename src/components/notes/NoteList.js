import React, { useEffect, useContext, useState } from "react";
import { ListGroup, Row } from "react-bootstrap";
import { NoteContext } from "./NoteProvider";
import { ConfirmableDeleteButton } from "../workflows/ConfirmableDeleteButton";
import { ConfirmableEditNoteButton } from "./ConfirmableEditNoteButton";

export const NoteList = (props) => {
  const { notes, getNotesByWorkflowId, deleteNote } = useContext(NoteContext);

  useEffect(() => {
    const workflowId = parseInt(props.match.params.workflowId);
    getNotesByWorkflowId(workflowId);
  }, []);

  const confirmDelete = (noteId, props) => {
    const workflowId = parseInt(props.match.params.workflowId);
    deleteNote(noteId, workflowId);
  };

  return (
    <div>
      <div
        className="noteList"
        style={{ maxHeight: "250px", overflowY: "scroll" }}
      >
        <ListGroup>
          {notes.map((n) => {
            const isOwnNote = n.author.id === parseInt(localStorage.getItem("workflow_user_id"))
            
            const canEdit = isOwnNote
            const canDelete = isOwnNote

            return (
              <div>
                <ListGroup.Item key={n.id}>
                  <Row className="justify-content-between">
                    <div className="d-flex">
                      { canEdit && 
                        <ConfirmableEditNoteButton
                          note={n}
                          workflowId={parseInt(props.match.params.workflowId)}
                        />
                      }

                      { canDelete &&
                        <ConfirmableDeleteButton
                          prompt="Are you sure you want to delete this note?"
                          onDelete={() => confirmDelete(n.id, props)}
                        />
                      }
                    </div>
                  </Row>
                  <h3>{n.content}</h3>
                  
                  <h4>{n.author.fullname}</h4>
                </ListGroup.Item>
              </div>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
};
