import { UserContext } from "./UserProvider";
import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom"
import ProfileStatusToggle from "./UserStatusToggle";
import ProfileActiveToggle from "./UserActiveToggle";
import "./users.css"

export const UserList = (props) => {
    const { users, getUsers } = useContext(UserContext);

    useEffect(() => {
        getUsers()
    }, []);

    const alphabeticalUsers = users.sort((userId1, userId2) => {
        return userId1.last_name.localeCompare(userId2.last_name);
    })

    let counter = 0
    users.forEach(user => {
        if (user.is_staff) {
            counter++
        }
    });

    return (
        <Table striped bordered hover size="sm" className="userProfileContainer">
            <tbody>
                {alphabeticalUsers.map((user) => {
                    
                    return (
                        <tr>
                            <td><Link to={`/workflows/user/${user.id}`}>{user.first_name} {user.last_name}</Link></td>
                            {
                                localStorage.getItem("is_admin") &&
                                <>
                                    <td>
                                        <ProfileActiveToggle
                                            isActive={user.is_active}
                                            userId={user.id}
                                            key={user.id}
                                        />
                                    </td>
                                    <td>
                                        {localStorage.getItem("is_admin") &&
                                            <ProfileStatusToggle

                                                isStaff={user.is_staff}
                                                userId={user.id}
                                                canDeactivate={counter >= 2}
                                            />
                                        }
                                    </td>
                                </>
                            }
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};