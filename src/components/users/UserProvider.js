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

  const updateUserRole = (userId, isStaffUpdate) => {
    return fetch(`http://localhost:8000/users/${userId}/update_role`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isStaffUpdate),
    }).then(getUsers);
  };

  const updateActive = (userId, userUpdate) => {
    return fetch(`http://localhost:8000/users/${userId}/update_active`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userUpdate),
    }).then(getUsers);
  };

  return (
    <UserContext.Provider
      value={{
        getUsers,
        updateUserRole,
        updateActive,
        users
        
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}