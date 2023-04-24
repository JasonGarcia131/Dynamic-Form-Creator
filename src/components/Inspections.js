import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Inspections = (props) => {

    const [inspections, setInspections] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        getInspections();
    }, []);


    const getInspections = async () => {
        try {
            const response = await axiosPrivate.get("http://localhost:5000/inspection/all");
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
                <td><Link to={`/admin-page/inspections/${inspection._id}`}>{inspection.submittedBy}</Link ></td>
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
           
            <tbody>
                {mappedInspections}
            </tbody>
            </table>
            </div>
           
        </div>
    )
}

export default Inspections;