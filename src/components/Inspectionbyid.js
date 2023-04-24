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
            <th>{question.question}</th>
        )
    });

    const mappedResponses = inspections.questions?.map((response) => {
        return (
            <td>
                <p>{response.response}</p>
                {response.image ? <img src={response.image} alt="" /> : ""}
            </td>
        )
    })


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

                    <tbody>
                        <tr>
                            {mappedResponses}
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Inspectionsbyid;