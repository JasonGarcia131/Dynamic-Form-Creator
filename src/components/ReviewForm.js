import { INPUTFIELDNAMES, SAFTEYQUESTIONS } from "../data";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

let templateParams = {}

const ReviewForm = (props) => {

    const { checklist, review } = props;
    const [isReviewed, setIsReviewed] = useState(false);
    const [success, setSuccess] = useState("");

    console.log("template params", templateParams);

    useEffect(() => {

        arrayToObject(INPUTFIELDNAMES, checklist.input);
        arrayToObject(SAFTEYQUESTIONS, checklist.radio);
        templateParams.team = checklist.team;
        templateParams.textBox = checklist.textbox;
        templateParams.employees = checklist.employees;

    }, []);

    // Creates an object from state nested arrays for email.js templateParams
    const arrayToObject = (array, stateArray) => {
        let i = 0;
        for (let i = 0; i < array.length; i++) {
            templateParams[array[i].split(" ").join("_")] = stateArray[i] ? String(stateArray[i]) : ""
        }
    }

    //Sends templateParams values as an object to be used as an email.
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send('service_t81sqia', 'template_cb7usop', templateParams, "3wqMebJTzeXwpCO")
            .then((result) => {
                console.log(result.text);
                if (result.text === "OK") setSuccess("Sent!");
            }, (error) => {
                console.log(error.text);
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
            <br/>
            <h2>Team: {checklist.team}</h2>
            {mappedInputFieldNames}
            {mappedSafetyQuestions}
            <br/>
            <p>Employees: </p>
            {mappedEmployees}
            <button onClick={(e) => sendEmail(e)}>Send Form</button>
            <button onClick={(e) => review(e)}>Edit</button>
            <p className="error">{success}</p>
        </div>
    )
}

export default ReviewForm;