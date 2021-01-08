import React, { useContext, useEffect, useRef, useState } from "react"
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import Button from 'react-bootstrap/Button'
import { CompanyContext } from "../companies/CompanyProvider"
import { StateContext } from "../states/StateProvider"
import { StatusContext } from "../statuses/StatusProvider"
import { UserContext } from "../users/UserProvider"
import { WorkflowContext } from "./WorkflowProvider"
import CancelEditButton from "./CancelEditButton"
import { Row } from "react-bootstrap";


export const WorkflowForm = (props) => {
    const {createWorkflow, updateWorkflow, getWorkflowById} = useContext(WorkflowContext)
    const {states, getStates} = useContext(StateContext)
    const {companies, getCompanies} = useContext(CompanyContext)
    const {users, getUsers} = useContext(UserContext)
    const {statuses, getStatuses} = useContext(StatusContext)
    const [ date, setDate ] = useState({})

    const handleDateChange = (d) => {
       
        const newDate = Object.assign({}, date)          
        newDate[d.target && d.target.name] = dueDateRef.target && dueDateRef.target.value    
        setDate(newDate)                                 
    }


    

    const stateRef = useRef("")
    const companyRef = useRef("")
    const statusRef = useRef("")
    const preparerRef = useRef("")
    const reviewerRef = useRef("")
    const processorRef = useRef("")
    const dueDateRef = useRef("")

    

    const isEditMode = props.match.params.hasOwnProperty("workflowId")

    useEffect(()=>{
        getStates()
        getCompanies()
        getUsers()
        getStatuses()
        .then(() => {
          if(isEditMode) {
            getWorkflowById(props.match.params.workflowId)
              .then(populateFormValues)
          }
        })
    },[])

    const populateFormValues = workflow => {
      stateRef.current.value = workflow.state.id
      companyRef.current.value = workflow.company.id
      preparerRef.current.value = workflow.preparer.id
      reviewerRef.current.value = workflow.reviewer.id
      processorRef.current.value = workflow.processor.id
      statusRef.current.value = workflow.status.id
      dueDateRef.current.value = workflow.due_date
      

      
    }

    

    const constructNewWorkflow = () => {
        if (stateRef.current.value === '0') {
            window.alert("Please Select a State")
        } else if(companyRef.current.value === '0') {
            window.alert("Please select a company")
        
        } else if(preparerRef.current.value === '0') {
            window.alert("Please select a company")
        
        } else if(reviewerRef.current.value === '0') {
            window.alert("Please select a company")
        
        } else if(processorRef.current.value === '0') {
            window.alert("Please select a company")
        
        } else if (dueDateRef.current.value === "") {
            window.alert("Please fill out content")
        } else if(statusRef.current.value === '0') {
            window.alert("Please select a company")
        
        } else {
          // validation success - create a new object from the form inputs and then either save or update it
          const newWorkflowObject = {
            state: stateRef.current.value,
            company: companyRef.current.value,   
            preparer: preparerRef.current.value,
            reviewer: reviewerRef.current.value,
            processor: processorRef.current.value,
            due_date: dueDateRef.current.value,
            status: statusRef.current.value,
            
            
            
          }

          if(isEditMode) {
            updateWorkflow(props.match.params.workflowId, newWorkflowObject)
              .then(() => props.history.push(`/workflows/${props.match.params.workflowId}`))
          }
          else {
            createWorkflow(newWorkflowObject)
              .then(() => props.history.push(`/workflows`))
          }
        }
    }

    return (
        <Form>
            <h1 className="text-center my-4">
              { isEditMode ? "Edit Workflow" : "Create New Workflow" }
            </h1>
            
            <FormGroup controlId="stateSelect">
            <Form.Label>State</Form.Label>
                <Form.Control as="select" ref={stateRef}>
                <option value ="0">Select a state</option>
                {states.map(s => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
                </Form.Control>
            </FormGroup>
            <FormGroup controlId="companySelect">
            <Form.Label>Company</Form.Label>
                <Form.Control as="select" ref={companyRef}>
                <option value ="0">Select a company</option>
                {companies.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
                </Form.Control>
            </FormGroup>
            <FormGroup controlId="preparerSelect">
            <Form.Label>Preparer</Form.Label>
                <Form.Control as="select" ref={preparerRef}>
                <option value ="0">Select a preparer</option>
                {users.map(u => (
                    <option key={u.id} value={u.id}>
                        {u.first_name} {u.last_name}
                    </option>
                ))}
                </Form.Control>
            </FormGroup>
            <FormGroup controlId="reviewerSelect">
            <Form.Label>Reviewer</Form.Label>
                <Form.Control as="select" ref={reviewerRef}>
                <option value ="0">Select a reviewer</option>
                {users.map(u => (
                    <option key={u.id} value={u.id}>
                        {u.first_name} {u.last_name}
                    </option>
                ))}
                </Form.Control>
            </FormGroup>
            <FormGroup controlId="processorSelect">
            <Form.Label>Processor</Form.Label>
                <Form.Control as="select" ref={processorRef}>
                <option value ="0">Select a processor</option>
                {users.map(u => (
                    <option key={u.id} value={u.id}>
                        {u.first_name} {u.last_name}
                    </option>
                ))}
                </Form.Control>
            </FormGroup>
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
            <FormGroup controlId="processorSelect">
            <Form.Label>Due Date</Form.Label>
            <input ref={dueDateRef} type="date"
                        name="eventDate"
                        className="form-control"
                        required 
                        onChange={handleDateChange}
                        />
            </FormGroup>
            
            <Row className="justify-content-end">
                {isEditMode && <CancelEditButton action={props}/>}
                <Button variant="success" 
                    type="submit" 
                    className="ml-2"
                    onClick={e=> {
                        e.preventDefault()
                        constructNewWorkflow()
                    }}>Save Workflow</Button>
            </Row>
        </Form>    
    )

}