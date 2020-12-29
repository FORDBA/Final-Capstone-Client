import React from "react"
import { Route } from "react-router-dom"
import { WorkflowProvider } from "./workflows/WorkflowProvider.js"
import { UserWorkflowList } from "./workflows/UserWorkflowList"



export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>

        <WorkflowProvider>
            <Route exact path="/">
             <UserWorkflowList userId={parseInt(localStorage.getItem("workflow_user_id"))}/>

            </Route>
        </WorkflowProvider>

        </main>
    </>
}