import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { USERS } from "../data"
import { FaUserPlus, FaClipboardCheck, FaUsers, FaUser } from "react-icons/fa";

const style= { fontSize: "2.5rem"}

const Admin = () => {

    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate("");

    console.log("users", USERS)
    const mappedUserOptions = USERS.map((user, index) => {
        return (
            <option value={user} key={index}>
                {user}
            </option>
        )
    });

    const handleSubmit = () => {

        if (!user || user.length === 0) return setMessage("No user selected");

        navigate(`/admin-page/inspections/${user}`)
    }

    return (
        <div>
            {/* Side Nav Bar */}

            {/* Header with search ?*/}

            <div className="mobile-dashboard-container column">
                <img className="icon-logo" src='tree-service-logo.png' alt="logo" />
                <br/>
                <h1>Dashboard</h1>
                <div className="row" >
                    <section className="dashboard-section">
                        <div className="icon-container">
                            <FaUserPlus style={style}/>
                        </div>
                        <Link>Create User</Link>

                    </section>
                    <section className="dashboard-section">
                        <div className="icon-container">
                            <FaUsers style={style}/>
                            <FaClipboardCheck style={style} />
                        </div>
                        <Link to="/admin-page/inspections">All inspections</Link>
                    </section>
                </div>

                <div className="row ">
                    <section className="dashboard-section select">
                        <div className="icon-container">
                            <FaUser style={style}/>
                            <FaClipboardCheck style={style}/>
                        </div>

                        <label>Select inspections by user</label>
                        <select value={user} onChange={(e) => setUser(e.target.value)}>
                            <option>Select By User</option>
                            {mappedUserOptions}
                        </select>
                        <br />
                        <button onClick={() => handleSubmit()}>Submit</button>

                    </section>

                </div>


            </div>
        </div>
    )
}

export default Admin;