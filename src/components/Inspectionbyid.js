import axios from "axios";
import { axiosPrivate } from "../api/axios";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Inspectionsbyid = (props) => {

    const [inspections, setInspections] = useState([]);

    const path = window.location.pathname;
    const _id = path.split('/')[4];
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        getInspections();
    }, []);

    const getInspections = async () => {
        try {
            const response = await axiosPrivate.get(`http://localhost:5000/inspection/id/${_id}`);
            console.log("response", response.data);
            setInspections(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    const mappedQuestions = inspections.questions?.map((question) => {
        return (
            <tr>
                 <th>{question.question}</th>
                 <td>{question.response}</td>
                 <td>{question.image ? <img src={question.image} alt="" /> : ""}</td>
            </tr>
           
        )
    });

    // const mappedResponses = inspections.questions?.map((response) => {
    //     return (
    //         <td>
    //             <p></p>
    //             {response.image ? <img src={response.image} alt="" /> : ""}
    //         </td>
    //     )
    // })


    return (
        <div>
            <div className="table-container">
                <table>
                    <tr>
                         <th>Question</th>
                         <th>Response</th>
                         <th>Image</th>
                    </tr>
                       
                        {mappedQuestions}
                 
                  
                </table>
            </div>

        </div>
    )
}

export default Inspectionsbyid;