import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import PaginateNav from "./PaginateNav";

let limit = 1;

const Inspections = (props) => {

    const [inspections, setInspections] = useState([]);
        //State variable for the pagination results
        const [page, setPage] = useState({
            next: {
                page: 0,
                limit: 0
            },
            previous: {
                page: 0,
                limit: 0
            },
        });
    
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        getInspections(1);
    }, []);


    const getInspections = async (page) => {
        try {
            const response = await axiosPrivate.get(`http://localhost:5000/inspection/all/paginate?page=${page}&limit=${limit}`);
            console.log("response", response.data);
            setPage(response.data);
        } catch (e) {
            console.log(e);
        }
    }


    console.log("inspection", inspections)
    const mappedInspections = page.results?.map((inspection) => {
        return (
            <tr>
                <td>{inspection.questions[0].response}</td>
                <td><Link to={`/admin-page/inspections/${inspection.submittedBy}`}>{inspection.submittedBy}</Link ></td>
            </tr>

        )
    });

    return (
        <div>
            {/* <p>total inspections:{inspections.length}</p> */}
            <PaginateNav page={page} getApi={getInspections} />
            <table className="center">
                <thead>
                    <tr>
                        <th>Date Submitted:</th>
                        <th>Inspection done by:</th>
                    </tr>
                </thead>

                <tbody>
                    {mappedInspections}
                </tbody>
            </table>
        </div>
    )
}

export default Inspections;