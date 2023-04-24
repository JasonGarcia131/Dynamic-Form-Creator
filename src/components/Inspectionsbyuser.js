import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const Inspectionsbyuser = (props) => {

    const [inspections, setInspections] = useState([]);

    const path = window.location.pathname;
    const submittedBy = path.split('/').pop();

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        getInspections();
    }, []);

    const getInspections = async () => {
        try {
            console.log("submmitedBy", submittedBy)
            const response = await axiosPrivate.get(`http://localhost:5000/inspection/user/${submittedBy}`);
            console.log("response", response.data);
            setInspections(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    const mappedResponses = inspections.map((question) => {
        return (
            <tr>
                <td>{question.questions[0].response}</td>
                <td><Link to={`http://localhost:3000/admin-page/inspections/${submittedBy}/${question._id}`}>{question._id}</Link></td>
            </tr>

        )
    });

    console.log("inspections", inspections)
    return (
        <div>
            <p>total inspections:{inspections.length}</p>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Submitted On</th>
                            <th>Inspection id</th>
                        </tr>
                    </thead>
                
                <tbody>
                    {mappedResponses}
                </tbody>
                </table>
            </div>

        </div>
    )
}

export default Inspectionsbyuser;