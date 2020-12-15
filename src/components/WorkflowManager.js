import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const WorkflowManager = () => (
    <>
        <Route render={(props) => {
            if (localStorage.getItem("workflow_user_id")) {
                return <>
                    <NavBar {...props}/>
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("workflow_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={(props) => {
            if (localStorage.getItem("workflow_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Register {...props} />
            }
        }} />
    </>
)
