import { CompanyContext } from "./CompanyProvider";
import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom"


export const CompanyList = (props) => {
    const { companies, getCompanies } = useContext(CompanyContext);

    useEffect(() => {
        getCompanies()
    }, []);

    const alphabeticalCompanies = companies.sort((companyId1, companyId2) => {
        return companyId1.name.localeCompare(companyId2.name);
    })

   

    return (
        <Table striped bordered hover size="sm" className="userProfileContainer">
            <tbody>
                {alphabeticalCompanies.map((company) => {
                    
                    return (
                        <tr>
                            <td><Link to={`/workflows/companies/${company.id}`}>{company.name}</Link></td>
                           
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};