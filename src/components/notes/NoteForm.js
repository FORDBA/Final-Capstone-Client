import React, { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { NoteContext} from "./NoteProvider"

// export const NoteForm = () => {
    export const NoteForm = (props) => {
        const [note, setNote] = useState({ content: "" })
        const  { createNote } = useContext(NoteContext)
    
        const handleTextareaChange = (e) => {
            const stateNote = Object.assign({}, note)
            stateNote[e.target.name] = e.target.value
            setNote(stateNote)
        }

        const handleSubmitNoteClick = (e) => {
            e.preventDefault()
            if (note.content.trim().length) {
               
                const newNote = {
             
                    content: note.content,
                    workflow: parseInt(props.match.params.workflowId),
                    author: parseInt(localStorage.getItem("workflow_user_id"))
                }
                createNote(newNote)
                const clearedNote = Object.assign({}, note)
                clearedNote.content = ""
                setNote(clearedNote)
            }
            else alert('Please enter a Note')
        }

        return (
            <Form>
                           
                
                <Form.Control as="textarea" onChange={handleTextareaChange} value={note.content} name='content' placeholder="Enter Note Here..."/>

            
               
        
                <Button className="d-block ml-auto my-2" type="submit" onClick={handleSubmitNoteClick}>Create Note</Button>
            </Form>
        )
    }
