import React from "react"
import { Route, Redirect } from "react-router-dom"
import { WorkflowProvider } from "./workflows/WorkflowProvider.js"
import { UserWorkflowList } from "./workflows/UserWorkflowList"
import { WorkflowList } from "./workflows/AllWorkflowList"
import { StateProvider } from "./states/StateProvider"
import { CompanyProvider } from "./companies/CompanyProvider"
import { UserProvider } from "./users/UserProvider"
import { StatusProvider } from "./statuses/StatusProvider"
import { WorkflowForm } from "./workflows/WorkflowForm"



export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <Route
        path="/logout"
        render={() => {
          // Removes the user Id and Token from local storage and redirects the user back to log in
          localStorage.removeItem("workflow_user_id");
          localStorage.removeItem("workflow_user_token");
          localStorage.removeItem("is_admin");
          return <Redirect to="/login" />;
        }}
      />


        <WorkflowProvider>
            <Route exact path="/">
             <UserWorkflowList userId={parseInt(localStorage.getItem("workflow_user_id"))}/>

            </Route>
        </WorkflowProvider>
        <WorkflowProvider>
            <StateProvider>
                <CompanyProvider>
                    <UserProvider>
                        <StatusProvider>

                            <Route  exact path="/workflows">
                            <WorkflowList />
                            </Route>
                            
                        </StatusProvider>
                    </UserProvider>
                </CompanyProvider>
            </StateProvider>            
        </WorkflowProvider>

        <WorkflowProvider>
            <StateProvider>
                <CompanyProvider>
                    <UserProvider>
                        <StatusProvider>

                           
                            <Route path="/workflows/create" component={WorkflowForm} />
                                
                            <Route path="/workflows/edit/:workflowId" component={WorkflowForm} />
                        </StatusProvider>
                    </UserProvider>
                </CompanyProvider>
            </StateProvider>            
        </WorkflowProvider>

        </main>
    </>
}