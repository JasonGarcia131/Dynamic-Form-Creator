import axios from "axios";
import { useState, useEffect } from "react";

const Inspections = () => {

    const [inspections, setInspections] = useState([]);

    useEffect(()=>{
        getInspections();
    },[]);

    const getInspections = async () =>{
        try{
            const response = await axios.get("http://localhost:5000/inspection/all");
            console.log("response", response.data);
            setInspections(response.data)
        }catch(e){
            console.log(e);
        }
    }

    const mappedInspections = inspections.map((inspection)=>{
        return(
            <div>
                <h1>{inspection.username}</h1>
                <h1>{inspection.region}</h1>
            </div>
        )
    })
    return(
        <div>
            <h1>Inspections</h1>
            {mappedInspections}
        </div>
    )
}

export default Inspections;