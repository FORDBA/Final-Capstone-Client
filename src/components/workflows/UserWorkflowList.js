import React, { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom"
import ListGroup from "react-bootstrap/ListGroup"
import { WorkflowContext } from "./WorkflowProvider.js"
import { UserWorkflowListItem } from "./UserWorkflowListItem.js"

export const UserWorkflowList = props => {
  const { userId } = props

  const { workflows, getWorkflowsByUserId } = useContext(WorkflowContext)

  // state variable keeping track of if call to API has resolved yet
  const [ isLoaded, setIsLoaded ] = useState(false)

  const isCurrentUser = userId === parseInt(localStorage.getItem('workflow_user_id'))
  workflows.sort((a,b) => b.id - a.id)

  useEffect(() => {
      debugger
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
      <h1 className="text-center my-4">{getHeader()}</h1>
      <ListGroup>
        { workflows.map(workflow => (
          <ListGroup.Item action key={workflow.id} as={Link} to={`/workflows/${workflow.id}`}>
            <UserWorkflowListItem workflow={workflow} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}