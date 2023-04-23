import { Link } from "react-router-dom"

const Admin = () => {

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
            
            {/* <Link to="/admin-page/inspections">See all inspections</Link>
            <label>Select inspections by user</label>
            <select>
                <option><Link to="/admin-page/inspections/Jason">Jason</Link></option>
                <option><Link to="/admin-page/inspections/Arturo">Arturo</Link></option>
                <option><Link to="/admin-page/inspections/John">John</Link></option>
            </select> */}
        </div>
    )
}

export default Admin;