import React, { useContext, useEffect, useRef, useState } from "react"
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import Button from 'react-bootstrap/Button'
import { StatusContext } from "../statuses/StatusProvider"
import { WorkflowContext } from "./WorkflowProvider"
import CancelEditButton from "./CancelEditButton"
import { Row } from "react-bootstrap";


export const WorkflowStatusForm = (props) => {
    const { updateWorkflowStatus, getWorkflowById} = useContext(WorkflowContext)
    const {statuses, getStatuses} = useContext(StatusContext)
    


    

    
    const statusRef = useRef("")
    
    

    const isEditMode = props.match.params.hasOwnProperty("workflowId")

    useEffect(()=>{
        getStatuses()
        .then(() => {
            getWorkflowById(props.match.params.workflowId)
                .then(populateFormValues)

        })
          
    },[])

    const populateFormValues = workflow => {
      
      statusRef.current.value = workflow.status.id
         

      
    }

    

    const constructNewWorkflow = () => {
        if(statusRef.current.value === '0') {
            window.alert("Please select a status")
        
        } else {
          // validation success - create a new object from the form inputs and then either save or update it
          const newWorkflowObject = {
            
            status: statusRef.current.value
            
            
            
          }

          
            updateWorkflowStatus(props.match.params.workflowId, newWorkflowObject)
              .then(() => props.history.push(`/workflows/${props.match.params.workflowId}`))
          
        }
        
    }

    return (
        <Form>
            <h1 className="text-center my-4">
              Update Status
            </h1>
            
            
            <FormGroup controlId="statusSelect">
            <Form.Label>Status</Form.Label>
                <Form.Control as="select" ref={statusRef}>
                <option value ="0">Select a status</option>
                {statuses.map(s => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
                </Form.Control>
            </FormGroup>
            
            
            <Row className="justify-content-end">
                {isEditMode && <CancelEditButton action={props}/>}
                <Button variant="success" 
                    type="submit" 
                    className="ml-2"
                    onClick={e=> {
                        e.preventDefault()
                        constructNewWorkflow()
                    }}>Update Status</Button>
            </Row>
        </Form>    
    )

}