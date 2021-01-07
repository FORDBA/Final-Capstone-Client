import React, { createContext, useState } from "react";

export const NoteContext = createContext()

export const NoteProvider = (props) => {
  const [notes, setNotes] = useState([]);


  const getNotesByWorkflowId = (workflow_id) => {
    return fetch(`http://localhost:8000/notes?workflow_id=${workflow_id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("workflow_user_token")}`
        }
    })
        .then(response => response.json())
        .then(setNotes)
}

  const createNote = (newNote) => {
    return fetch(`http://localhost:8000/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("workflow_user_token")}`
      },
      body: JSON.stringify(newNote),
    }).then(() => {
        
      getNotesByWorkflowId(newNote.workflow);
    });
  };

  const deleteNote = (note_id, workflow_id) => {
    return fetch(`http://localhost:8000/notes/${note_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("workflow_user_token")}`
      }
    }).then(() => getNotesByWorkflowId(workflow_id));
  };

  const updateNote = (note, workflowId) => {
    return fetch(`http://localhost:8000/notes/${note.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    }).then(() => getNotesByWorkflowId(workflowId))
  }

  return (
    <NoteContext.Provider
      value={{ 
          notes,
          getNotesByWorkflowId, 
          createNote, 
          deleteNote, 
          updateNote 
        }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
