import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Row, Button, Table } from "react-bootstrap"
import { MdAdd } from "react-icons/md"
import { WorkflowContext } from "./WorkflowProvider"



export const CompletedWorkflowList = props => {
    const { workflows, getWorkflows } = useContext(WorkflowContext)

    

    // Initialization effect hook -> Go get workflow data
    useEffect(() => {
        getWorkflows()
        
      }, []);

    const history = useHistory()
    const isAdmin = localStorage.getItem('is_admin')
    console.log(workflows)
    
    return (
       
            <div className="workflowList">
        {
            isAdmin &&
          <Row className="align-items-center justify-content-end my-4">
            <Button variant="light" 
              className="d-flex align-items-center"
              onClick={() => history.push('/workflows/create')}>
              Add Workflow <MdAdd style={{ fontSize: '48px' }} />
            </Button>
          </Row>
          
        }
        
    
    

          <Table bordered hover responsive="md">
            <thead>
              <tr>
                
                <th>State</th>
                <th>Company</th>
                <th>Preparer</th>
                <th>Reviewer</th>
                <th>Processor</th>
                <th>Due Date</th>
                <th>Completion Date</th>
                <th>Status</th>
               
                
              </tr>
            </thead>
            <tbody>
              

                
               { workflows.map(workflow => {
                 if (workflow.status.id === 7) {
                  const { id, due_date, completion_date, preparer, reviewer, processor, status, state, company } = workflow
                  const readableDueDate = (new Date(due_date + 'T00:00:00')).toLocaleDateString('en-US')
                  const readableCompletionDate = () => {
                      if (completion_date === null) {
                          return "N/A"
                      }
                      else{
                          return (new Date(completion_date + 'T00:00:00')).toLocaleDateString('en-US')
                      }
                  } 

                  

                  return (
                    <tr key={id} className="position-relative">
                     
                      <td><Link to={`/workflows/${id}`}>{state.name}</Link></td>
                      <td>{company.name}</td>
                      <td>{preparer.first_name} {preparer.last_name}</td>
                      <td>{reviewer.first_name} {reviewer.last_name}</td>
                      <td>{processor.first_name} {processor.last_name}</td>
                      <td>{readableDueDate}</td>
                      <td>{readableCompletionDate()}</td>
                      <td>{status.name}</td>
                     
                      
                      
                    </tr>
                    
                  )
               }
                })
              }
            </tbody>
          </Table> 
        </div>
        
      )
    }