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
            <Route exact path="/" render={props => <UserWorkflowList {...props} />} />
        </WorkflowProvider>

        </main>
    </>
}