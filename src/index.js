import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { WorkflowManager } from "./components/WorkflowManager.js"
import "bootstrap/dist/css/bootstrap.min.css"




ReactDOM.render(
    <React.StrictMode>
        <Router>
            <WorkflowManager />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
