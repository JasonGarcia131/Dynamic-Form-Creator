// import axios from "axios";
// import { useState, useEffect } from "react";
// import { INPUTFIELDNAMES } from "../data";
// import { SAFTEYQUESTIONS } from "../data";

// const Inspectionsbyuser = (props) => {

//     const [inspections, setInspections] = useState([]);

//     const username = window.location.pathname;
//     console.log("username", username);

//     useEffect(() => {
//         getInspections();
//     }, []);

//     const getInspections = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/inspection/${username}`);
//             console.log("response", response.data);
//             setInspections(response.data)
//         } catch (e) {
//             console.log(e);
//         }
//     }

//     const mappedInspections = inspections.map((inspection) => {
//         return (
//             <tr>
//                 <td>{inspection.date}</td>
//                 <td>{inspection.username}</td>
//             </tr>

//         )
//     });

//     const mappedInputFieldNames = INPUTFIELDNAMES.map((inputNames, index) =>
//         <th>
//             {inputNames}
//         </th>
//     );

//     const mappedSafetyQuestions = SAFTEYQUESTIONS.map((questions, index) =>
//         <th>
//             {questions}
//         </th>
//     );

//     return (
//         <div>
//             <p>total inspections:{inspections.length}</p>
//             <div className="table-container">
//                  <table>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Inspection done by:</th>
//                         {mappedInputFieldNames}
//                         {mappedSafetyQuestions}
//                     </tr>
//                 </thead>
//             </table>
//             <tbody>
//                 {mappedInspections}
//             </tbody>
//             </div>
           
//         </div>
//     )
// }

// export default Inspectionsbyuser;