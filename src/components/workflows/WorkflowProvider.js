import React, { createContext, useState } from "react";
export const WorkflowContext = createContext();

export const WorkflowProvider = (props) => {
  const [workflows, setWorkflows] = useState([]);

  const getWorkflows = () => {
    return fetch(`http://localhost:8000/workflows`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setWorkflows);
  };

  const createWorkflow = (workflow) => {
    return fetch(`http://localhost:8000/workflows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("workflow_user_token")}`
      },
      body: JSON.stringify(workflow),
    })
      .then((res) => res.json())
      .then((newWorkflow) => {
        getWorkflows();
        return newWorkflow;
      });
  };

  const getWorkflowById = (workflowId) => {
    return fetch(`http://localhost:8000/workflows/${workflowId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) =>
        res.json()
      );
  };

  const getWorkflowsByUserId = (userId) => {
    return fetch(`http://localhost:8000/workflows?preparer_id=${userId}&reviewer_id=${userId}&processor_id=${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      }
    }
    )
      .then((res) => res.json())
      .then(setWorkflows);
  };

  const updateWorkflow = (workflowId, workflowUpdate) => {
    return fetch(`http://localhost:8000/workflows/${workflowId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workflowUpdate),
    }).then(getWorkflows);
  };

  return (
    <WorkflowContext.Provider
      value={{
        getWorkflows,
        workflows,
        updateWorkflow,
        getWorkflowById,
        getWorkflowsByUserId,
        createWorkflow
      }}
    >
      {props.children}
    </WorkflowContext.Provider>
  );
};