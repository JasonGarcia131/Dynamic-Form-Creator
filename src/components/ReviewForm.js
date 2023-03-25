import { INPUTFIELDNAMES, SAFTEYQUESTIONS } from "../data";
import { useState } from "react";
import emailjs from '@emailjs/browser';

let templateParams = {}

const ReviewForm = (props) => {

    const { checklist, review } = props;
    const [success, setSuccess] = useState("");

    // Creates an object from state nested arrays for email.js templateParams
    const arrayToObject = (array, stateArray) => {
        for (let i = 0; i < array.length; i++) {
            templateParams[array[i].split(" ").join("_")] = stateArray[i] ? String(stateArray[i]) : ""
        }
    }

    //Converts 24 hour time to 12 hour time
    const format = (H,M) => {
        if(H%12 == 0) return `12:${(M<10?'0':'')+M} ${H<12?'AM':'PM'}`;
        else return `${(H%12<10?'0':'')+H%12}:${(M<10?'0':'')+M} ${H<12?'AM':'PM'}`;
    }

    const timeArrived = checklist.timeIn.split(":");
    const timeArrivedHour = timeArrived[0];
    const timeArrivedMinutes = timeArrived[1];        
    const timeDeparted = checklist.timeOut.split(":");
    const timeDepartedHour = timeDeparted[0];
    const timeDepartedMinutes = timeDeparted[1];     
    
    const timeArrivedConverted = format(timeArrivedHour, timeArrivedMinutes);
    const timeDepartedConverted = format(timeDepartedHour, timeDepartedMinutes);
        
    // Creating key pair values for object to send to emailjs
    arrayToObject(INPUTFIELDNAMES, checklist.input);
    arrayToObject(SAFTEYQUESTIONS, checklist.radio);
    templateParams.team = checklist.team;
    templateParams.timeArrived = timeArrivedConverted;
    templateParams.timeDeparted = timeDepartedConverted;
    templateParams.textBox = checklist.textbox;
    templateParams.manager = checklist.manager;
    templateParams.employee1 = checklist.employee1;
    templateParams.title1 = checklist.title1;
    templateParams.consent1= checklist.consent1;
    templateParams.employee2 = checklist.employee2;
    templateParams.title2 = checklist.title2;
    templateParams.consent2= checklist.consent2;
    templateParams.employee3 = checklist.employee3;
    templateParams.title3 = checklist.title3;
    templateParams.consent3= checklist.consent3;

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

    const mappedInputFieldNames = INPUTFIELDNAMES.map((inputNames, index) =>
        <div>
            <h3>{inputNames}</h3>
            <p>{checklist.input[index]}</p>
        </div>
    );

    const mappedSafetyQuestions = SAFTEYQUESTIONS.map((questions, index) =>
        <ul>
            <li className="font-weight">{index + 1}. {questions}</li>
            <li>{checklist.radio[index]}</li>
        </ul>
    );

    return (
        <div className="form">
            <h1>Review Safety Form</h1>
            <hr/>
            <br />
            <h2>Crew Leader: {checklist.team}</h2>
            <p>Time Arrived: {timeArrivedConverted}</p>
            <p>Time Departed: {timeDepartedConverted}</p>
            {mappedInputFieldNames}
            {mappedSafetyQuestions}
            <br />
             <ul>
                <li className="font-weight">
                    <p>Employee: {checklist.employee1}</p>
                    <p>Title: {checklist.title1}</p> 
                    <p>Consent: {checklist.consent1}</p>
                </li>
                <li className="font-weight">
                    <p>Employee: {checklist.employee2}</p>
                    <p>Title: {checklist.title2}</p> 
                    <p>Consent: {checklist.consent2}</p>
                </li>
                <li className="font-weight">
                    <p>Employee: {checklist.employee3}</p>
                    <p>Title: {checklist.title3}</p> 
                    <p>Consent: {checklist.consent3}</p>
                </li>
             </ul>
            <p className="font-weight">Safety Report Reviewed By Contract Group Manager or Contract Group Supervisor: {checklist.manager}</p>
            <button className="margin" onClick={(e) => sendEmail(e)}>Send Form</button>
            <button className="margin" onClick={(e) => review(e)}>Edit</button>
            <p className="error">{success}</p>
        </div>
    )
}

export default ReviewForm;