import React, { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch(`http://localhost:8000/users`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setUsers);
  }

  return (
    <UserContext.Provider
      value={{
        getUsers,
        users
        
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}