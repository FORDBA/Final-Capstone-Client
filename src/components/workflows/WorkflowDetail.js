import React, { useContext, useState, useEffect } from "react";
import { Image, Badge, Row, Col, Button, Container } from "react-bootstrap";
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton";
import { WorkflowContext } from "./WorkflowProvider";
import {  FullEdit, PartialEdit } from "./EditWorkflowButton";
import "./WorkflowDetail.css";
import { useHistory } from "react-router-dom";
import { NoteForm } from "../notes/NoteForm"
import { NoteList } from "../notes/NoteList"

export const WorkflowDetail = (props) => {
  const { getWorkflowById, deleteWorkflow, getWorkflows } = useContext(WorkflowContext);
  const [workflow, setWorkflow] = useState({ state: {}, company: {}, user: {}, preparer: {}, reviewer: {}, processor: {}, status: {}});
  const userIsAdmin = localStorage.getItem("is_admin") ? true : false
  const history = useHistory()
  const handleDeleteButtonClick = () => {
      deleteWorkflow(workflow.id)
      .then(() => {
          getWorkflows();
        })
        .then(() => {
            props.history.goBack();
        });
    };
    
    
    
    useEffect(() => {
        const workflowId = parseInt(props.match.params.workflowId);
        getWorkflowById(workflowId).then(setWorkflow);
    }, []);
    
    const readableDueDate = (new Date(workflow.due_date + 'T00:00:00')).toLocaleDateString('en-US')
    const readableCompletionDate = () => {
          if (workflow.completion_date === null) {
              return "N/A"
          }
          else{
              return (new Date(workflow.completion_date + 'T00:00:00')).toLocaleDateString('en-US')
              }
          }
  return (
    <Container>
      <Row>
        <Col xl="8" lg="7" sm="12">
          <h2 className="workflowDetail__state font-weight-bold">State: {workflow.state.name}</h2>
          <h2 className="workflowDetail__Company font-weight-bold">Company: {workflow.company.name}</h2>
        </Col>
        <Col xl="4" lg="5" sm="12">
          {(userIsAdmin) && (
            <Row className="justify-content-end">
              <ConfirmableDeleteButton onDelete={handleDeleteButtonClick} />
              <FullEdit workflowId={workflow.id} />
              
            </Row>
          )}
        </Col>
      </Row>

      <Row className="justify-content-between">
        <Col>
          <p className="workflowDetail__dueDate">Due Date: {readableDueDate}</p>
        </Col>
        <Col>
          <p className="workflowDetail__completionDate">Completion Date: {readableCompletionDate()}</p>
        </Col>
        <Col>
          <p className="workflowDetail__preparer">Preparer: {workflow.preparer.first_name} {workflow.preparer.last_name}</p>
        </Col>
        <Col>
          <p className="workflowDetail__reviewer">Reviewer: {workflow.reviewer.first_name} {workflow.reviewer.last_name}</p>
        </Col>
        <Col>
          <p className="workflowDetail__processor">Processor: {workflow.processor.first_name} {workflow.processor.last_name}</p>
        </Col>
        <Col>
          <p className="workflowDetail__processor">Status: {workflow.status.name}</p>
        </Col>
        
      </Row>
      <Row className="align-items-center justify-content-end my-4">
      <PartialEdit workflowId={workflow.id} />
      </Row>
      <NoteForm {...props} />
      <NoteList {...props} />
     
    </Container>
  );
};
