import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import {USERS} from "../data"

const Admin = () => {

    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate("");

    console.log("users", USERS)
    const mappedUserOptions = USERS.map((user, index)=>{
        return(
            <option value={user} key={index}>
                {user}
            </option>
        )
    });

    const handleSubmit = () => {

        if(!user || user.length === 0) return setMessage("No user selected");

        navigate(`/admin-page/inspections/${user}`)
    }

    return (
        <div>
            {/* Side Nav Bar */}

            {/* Header with search ?*/}
            <header>Header with search</header>
            <main>
                <h1>Dashboard</h1>
                <p>Total inspections</p>
                <p>Red flags</p>
            </main>
            
            <Link to="/admin-page/inspections">See all inspections</Link>
            <label>Select inspections by user</label>
            <select value={user} onChange={(e)=>setUser(e.target.value)}>
                <option>Select By User</option>
                {mappedUserOptions}
            </select>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
    )
}

export default Admin;