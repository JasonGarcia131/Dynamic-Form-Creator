import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Inspections = (props) => {

    const [inspections, setInspections] = useState([]);

    useEffect(() => {
        getInspections();
    }, []);

    const getInspections = async () => {
        try {
            const response = await axios.get("http://localhost:5000/inspection/all");
            console.log("response", response.data);
            setInspections(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    const mappedInspections = inspections.map((inspection) => {
        return (
            <tr>
                <td>{inspection.questions[0].response}</td>
                <Link to={`/admin-page/inspections/${inspection.submittedBy}`}>{inspection.submittedBy}</Link >
            </tr>

        )
    });

    return (
        <div>
            <p>total inspections:{inspections.length}</p>
            <div className="table-container">
                 <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Inspection done by:</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {mappedInspections}
            </tbody>
            </div>
           
        </div>
    )
}

export default Inspections;