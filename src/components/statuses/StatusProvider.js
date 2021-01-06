import React, { createContext, useState } from "react";
export const StatusContext = createContext();

export const StatusProvider = (props) => {
  const [statuses, setStatuses] = useState([]);

  const getStatuses = () => {
    return fetch(`http://localhost:8000/statuses`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setStatuses);
  }

  return (
    <StatusContext.Provider
      value={{
        getStatuses,
        statuses
        
      }}
    >
      {props.children}
    </StatusContext.Provider>
  )
}