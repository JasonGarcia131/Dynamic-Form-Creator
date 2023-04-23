import { FormData } from "../data";
import { useEffect, useState } from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';

//Initializing global variables
let templateParams = {}
let backendObjFormat = {
    questions: [{}]
}
let timeArrivedConverted = 0;
let timeDepartedConverted = 0;

const ReviewForm = (props) => {

    const { checklist, review } = props;
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Resets object when component reloads.
         return () => backendObjFormat = { questions: [{}] }
    }, [])


    // Creates an object from state nested arrays for email.js templateParams
    const arrayToObject = (array, bool) => {
        for (let i = 0; i < array.length; i++) {
            if (bool) return templateParams[`question${i}`] = array[i] ? String(array[i]) : ""
            else if (!bool) {
                templateParams[`employee${i}`] = array[i].firstName + array[i].lastName;
                templateParams[`employee${i}Title`] = array[i].title;
                templateParams[`employee${i}Consent`] = array[i].consent;
            }
        }
    }

    //Converts 24 hour time to 12 hour time
    const format = (H, M) => {
        if (H % 12 == 0) return `12:${(M < 10 ? '0' : '') + M} ${H < 12 ? 'AM' : 'PM'}`;
        else return `${(H % 12 < 10 ? '0' : '') + H % 12}:${(M < 10 ? '' : '') + M} ${H < 12 ? 'AM' : 'PM'}`;
    }
    const timeArrived = checklist.input[1]?.length > 0 ? checklist.input[1]?.split(":") : "0:00";
    const timeArrivedHour = timeArrived[0];
    const timeArrivedMinutes = timeArrived[1];
    const timeDeparted = checklist.input[2]?.length > 0 ? checklist.input[2]?.split(":") : "0:00";
    const timeDepartedHour = timeDeparted[0];
    const timeDepartedMinutes = timeDeparted[1];
    timeArrivedConverted = format(timeArrivedHour, timeArrivedMinutes);
    timeDepartedConverted = format(timeDepartedHour, timeDepartedMinutes);

    // Creates key value pairs for object to send to emailjs
    arrayToObject(checklist.input, true);
    arrayToObject(checklist.radio, true);
    arrayToObject(checklist.employees, false);
    templateParams.team = checklist.team;
    templateParams.timeArrived = timeArrivedConverted;
    templateParams.timeDeparted = timeDepartedConverted;
    templateParams.comments = checklist.comments;
    templateParams.manager = checklist.manager;

    //Formating object to send to backend
    for (let i = 0; i < FormData.length; i++) {
        if (FormData[i].type === "radio") {
           backendObjFormat.questions.push({
               id: i,
               question: FormData[i].question,
               response: checklist.radio[i] ? checklist.radio[i] : "",
               image: checklist.images[i-15] ? checklist.images[i-15] : ""
           })
       }else{
           backendObjFormat.questions.push({
               id: i,
               question: FormData[i].question,
               response: checklist.input[i] ? checklist.input[i] : ""
           })
       }
   }

    //Sends templateParams values as an object to be used as an email.
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send('service_t81sqia', 'template_cb7usop', templateParams, "3wqMebJTzeXwpCO5-")
            .then((result) => {
                if (result.text === "OK") setSuccess("Sent!");
            }, (error) => {
                setSuccess("Form was not sent! Please try again.");
            });
    };

    const handleSubmit = async (e) => {
        // sendEmail(e);

        console.log("team", checklist.team)
        backendObjFormat.submittedBy = checklist.team;
        backendObjFormat.employees = checklist.employees;
        console.log("backendobject sent", backendObjFormat)
    //     try {
    //         const response = await axios.post("http://localhost:5000/inspection/submit", backendObjFormat);
    //         console.log("response", response);
    //     } catch (e) {
    //         console.log(e);
    //     }

    }

   //Removes to empty object in index 0;
    backendObjFormat.questions.shift();
    const formData = backendObjFormat.questions.map((question, index)=>{
        console.log("question inside map", question.question);
        console.log("index inside ", index)
        return(
            <div>
                <h3>{question.question}</h3>
                <p>{question.response}</p>
                {question.image ? <img className="review-image" src={question.image} alt=""/> : ""}
            </div>
        )
    });

    return (
        <div className="form">
            <h1>Review Safety Form</h1>
            <hr />
            <br />
            <h2>Crew Leader: {checklist.team}</h2>
            {formData}
            <br />
            <p className="font-weight">Safety Report Reviewed By Contract Group Manager or Contract Group Supervisor: {checklist.manager}</p>
            <button className="margin" onClick={(e) => handleSubmit(e)}>Send Form</button>
            <button className="margin" onClick={(e) => review(e)}>Edit</button>
            <p className="error">{success}</p>
        </div>
    )
}

export default ReviewForm;