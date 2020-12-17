import React, { useContext } from "react"
import { WorkflowContext } from "./WorkflowProvider"
import { Row, Col } from "react-bootstrap"

export const UserWorkflowListItem = props => {
  const { workflow } = props
  const { id, due_date, completion_date, preparer, reviewer, processor, status, state, company } = workflow
  const readableDate = (new Date(due_date + 'T00:00:00')).toLocaleDateString('en-Us')
  

  

  return (
    <div>
      <Row className="align-items-center">
        <Col sm="8">
          <h2 className="font-weight-bold">State:{state.name}</h2>
        </Col>
        <Col sm="8">
          <h2 className="font-weight-bold">Company: {company.name}</h2>
        </Col>
        <Col sm="4">
          <p className="text-right">Due Date: {due_date}</p>
        </Col><Col sm="4">
          <p className="text-right"> Date Completed: {completion_date}</p>
        </Col>
        <Col sm="3">
          <p>Preparer: {preparer.username}</p>
        </Col>
        <Col sm="3">
          <p>Reviewer: {reviewer.username}</p>
        </Col>
        <Col sm="3">
          <p>Processor: {processor.username}</p>
        </Col>
        <Col sm="3">
          <p>Status: {status.name}</p>
        </Col>
      </Row>

      
      
    </div>
  )
}