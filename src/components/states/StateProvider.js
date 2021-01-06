import React, { createContext, useState } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [states, setStates] = useState([]);

  const getStates = () => {
    return fetch(`http://localhost:8000/states`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setStates);
  }

  return (
    <StateContext.Provider
      value={{
        getStates,
        states
        
      }}
    >
      {props.children}
    </StateContext.Provider>
  )
}