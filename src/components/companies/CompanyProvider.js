import React, { createContext, useState } from "react";
export const CompanyContext = createContext();

export const CompanyProvider = (props) => {
  const [companies, setCompanies] = useState([]);

  const getCompanies = () => {
    return fetch(`http://localhost:8000/companies`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("workflow_user_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setCompanies);
  }

  return (
    <CompanyContext.Provider
      value={{
        getCompanies,
        companies
        
      }}
    >
      {props.children}
    </CompanyContext.Provider>
  )
}