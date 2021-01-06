import React, { useEffect, useContext, useState } from "react"
import { Table } from "react-bootstrap"
import { WorkflowContext } from "./WorkflowProvider.js"


export const UserWorkflowList = props => {
  const { userId } = props

  const { workflows, getWorkflowsByUserId } = useContext(WorkflowContext)

  // state variable keeping track of if call to API has resolved yet
  const [ isLoaded, setIsLoaded ] = useState(false)

  const isCurrentUser = userId === parseInt(localStorage.getItem('workflow_user_id'))
  workflows.sort((a,b) => b.id - a.id)

  useEffect(() => {
    
    getWorkflowsByUserId(userId)
    .then(() => setIsLoaded(true))
    
  }, [])
  

  /**
   * Get the proper header for the list
   */
  const getHeader = () => {
    // List of user's own workflows - header should be "My Workflows"
    if(isCurrentUser) {
      return "My Tax Returns"
    }

    // Not the user's own workflows and the API call has returned with workflows - 
    // grab the username from the first workflow
  

    // The API call returned with no workflows, tell the user there are no workflows for this user
    else if(!workflows.length && isLoaded) {
      return "There are no tax returns this user :/"
    }
  }
 
  return (
    <div className="workflowList">
      

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
                 
                  <td>{state.name}</td>
                  <td>{company.name}</td>
                  <td>{preparer.first_name} {preparer.last_name}</td>
                  <td>{reviewer.first_name} {reviewer.last_name}</td>
                  <td>{processor.first_name} {processor.last_name}</td>
                  <td>{readableDueDate}</td>
                  <td>{readableCompletionDate()}</td>
                  <td>{status.name}</td>
                 
                  
                  
                </tr>
                
              )
            })
          }
        </tbody>
      </Table> 
    </div>
  )
}