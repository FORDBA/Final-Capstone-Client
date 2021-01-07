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
import { WorkflowDetail } from "./workflows/WorkflowDetail"
import { WorkflowStatusForm } from "./workflows/WorkflowStatusForm"
import { UserList } from "./users/UserList"
import { CompletedWorkflowList } from "./workflows/AllCompletedList"
import { CompanyList } from "./companies/CompanyList"
import { NoteProvider } from "./notes/NoteProvider"



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
             <Route
                    exact
                    path="/workflows/user/:userId"
                    render={(props) => (
                      <UserWorkflowList
                        userId={parseInt(props.match.params.userId)}
                      />
                    )}
                  />
        </WorkflowProvider>
        <WorkflowProvider>
            <StateProvider>
                <CompanyProvider>
                    <UserProvider>
                        <StatusProvider>
                            <NoteProvider>

                            <Route  exact path="/workflows">
                            <WorkflowList />
                            </Route>
                            <Route  exact path="/workflows/completed">
                            <CompletedWorkflowList />
                            </Route>
                            <Route path="/workflows/create" component={WorkflowForm} />
                                
                            <Route path="/workflows/edit/:workflowId" component={WorkflowForm} />
                            <Route path="/workflows/statusupdate/:workflowId" component={WorkflowStatusForm} />
                            <Route exact path="/workflows/:workflowId(\d+)" render={(props) => <WorkflowDetail {...props} />} />
                            <Route
                                exact
                                path="/workflows/companies/:companyId(\d+)"
                                render={(props) => 
                                <WorkflowList companyId={parseInt(props.match.params.companyId)}/> }
                            />
                            </NoteProvider>
                        </StatusProvider>
                    </UserProvider>
                </CompanyProvider>
            </StateProvider>            
        </WorkflowProvider>
        <UserProvider>
            <Route  exact path="/users">
                <UserList />
            </Route>
        </UserProvider>
        <CompanyProvider>
            <Route exact path="/companies">
            <CompanyList />
            </Route>
        </CompanyProvider>
        

        </main>
    </>
}