import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import { BsGearFill } from "react-icons/bs"
import { MdAdd } from "react-icons/md"

export const FullEdit = (props) => {
    const history = useHistory()
   
    return (
        <Button className="border-0 bg-white text-dark"
          onClick={evt => {
            evt.preventDefault()
            history.push(`/workflows/edit/${props.workflowId}`)   
        }}>
            <BsGearFill style={{ fontSize: '36px' }} />
        </Button>
    )
}

export const PartialEdit = (props) => {
    const history = useHistory()
   
    return (
        
            <Button variant="light" 
              className="d-flex align-items-center"
              onClick={() => history.push(`/workflows/statusupdate/${props.workflowId}`)}>
              Update Status <MdAdd style={{ fontSize: '48px' }} />
            </Button>
          
    )
}