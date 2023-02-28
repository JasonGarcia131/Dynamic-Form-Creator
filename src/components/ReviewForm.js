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

    arrayToObject(INPUTFIELDNAMES, checklist.input);
    arrayToObject(SAFTEYQUESTIONS, checklist.radio);
    templateParams.team = checklist.team;
    templateParams.textBox = checklist.textbox;
    templateParams.employees = checklist.employees;
    templateParams.manager = checklist.manager;

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
            <li>{index + 1}. {questions}</li>
            <li>{checklist.radio[index]}</li>
        </ul>
    );

    const mappedEmployees = checklist.employees.map((employee, index) =>
        <ul>
            <li>
                {employee}
            </li>
        </ul>
    );

    return (
        <div className="form">
            <h1>Review Safety Form</h1>
            <br />
            <h2>{checklist.team}</h2>
            {mappedInputFieldNames}
            {mappedSafetyQuestions}
            <br />
            <p>Employees and Title: </p>
            {mappedEmployees}
            <p>Safety Report Reviewed By Contract Group Manager or Contract Group Supervisor: {checklist.manager}</p>
            <button onClick={(e) => sendEmail(e)}>Send Form</button>
            <button onClick={(e) => review(e)}>Edit</button>
            <p className="error">{success}</p>
        </div>
    )
}

export default ReviewForm;