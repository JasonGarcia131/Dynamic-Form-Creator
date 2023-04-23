import axios from "axios";
import { useState, useEffect } from "react";

const Inspectionsbyid = (props) => {

    const [inspections, setInspections] = useState([]);

    const path = window.location.pathname;
    const _id =  path.split('/').pop();

    useEffect(() => {
        getInspections();
    }, []);

    const getInspections = async () => {
        try {
            console.log("id", _id)
            const response = await axios.get(`http://localhost:5000/inspection/inspectionById/${_id}`);
            console.log("response", response.data);
            setInspections(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    const mappedQuestions = inspections.questions?.map((question) => {
        return (
                <th>{question.question}</th>    
        )
    });
    
    const mappedResponses = inspections.questions?.map((response)=> {
        return(
            <td>
                <p>{response.response}</p>
                {response.image ? <img src={response.image} alt=""/> : ""}
            </td>
        )
    })

console.log("inspections", inspections)
    return (
        <div>
            <p>total inspections:{inspections.length}</p>
            <div className="table-container">
                 <table>
                <thead>
                    <tr>
                         {mappedQuestions}
                    </tr>
                </thead>
            </table>
            <tbody>
                <tr>
                    {mappedResponses}
                </tr>
                
            </tbody>
            </div>
           
        </div>
    )
}

export default Inspectionsbyid;