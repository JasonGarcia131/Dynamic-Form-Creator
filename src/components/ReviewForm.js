import { INPUTFIELDNAMES, SAFTEYQUESTIONS } from "../data";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

const ReviewForm = (props) => {

    const { checklist, styles } = props;
    let templateParams = {}

    // let templateParams = {
    //     team: checklist.team,
    //     date: checklist.input[0],
    //     timeArrived: checklist.input[1],
    //     timeDeparted: checklist.input[2]
    // };

    // Need to make an object from array

    useEffect(() => {
        // for (const key of INPUTFIELDNAMES) {
        //     for (let i = 0; i < checklist.input.length; i++) {
        //         templateParams[key.split(" ").join("_")] = checklist.input[i];
        //     }
        // }
        // for (const key of SAFTEYQUESTIONS) {
        //     for (let i = 0; i < checklist.radio.length; i++) {
        //         templateParams[key.split(" ").join("_")] = checklist.radio[i];
        //     }
        // }
        // for (const key of SAFTEYQUESTIONS) {
        //     for (let i = 0; i < checklist.radio.length; i++) {
        //         templateParams[key.split(" ").join("_")] = checklist.radio[i];
        //     }
        // }

        arrayToObject(INPUTFIELDNAMES, checklist.input);
        arrayToObject(SAFTEYQUESTIONS, checklist.radio);
        templateParams.team = checklist.team;
        templateParams.textBox = checklist.textbox;
        templateParams.employees = checklist.employees;

    }, []);

    const arrayToObject = (array, stateArray) => {
        let i = 0;
        for (let i = 0; i < array.length; i++) {
            templateParams[array[i].split(" ").join("_")] = stateArray[i] ? String(stateArray[i]) : ""
        }
    }


    //{{All_employees_have_the_proper_PPE_and_are_currently_wearing_the_appropriate_PPE?}}


    console.log("paramenters", templateParams);


    const [isReviewed, setIsReviewed] = useState(false);


    const sendEmail = (e) => {
        e.preventDefault();
        console.log("checklist", checklist);
        emailjs.send('service_t81sqia', 'template_cb7usop', templateParams, "3wqMebJTzeXwpCO5-")
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
    const mappedInputFieldNames = INPUTFIELDNAMES.map((inputNames, index) =>
        <div>
            <h3>{inputNames}</h3>
            <p>{checklist.input[index]}</p>
        </div>
    );

    const mappedSafetyQuestions = SAFTEYQUESTIONS.map((questions, index) =>
        <ul>
            <li>{questions}</li>
            <li>{checklist.radio[index]}</li>
        </ul>
    )
    return (
        // <form onSubmit={sail}>
        <div style={styles}>
            <h1>Review</h1>
            <h2>Team: {checklist.team}</h2>
            {mappedInputFieldNames}
            {mappedSafetyQuestions}
            <button onClick={(e) => sendEmail(e)}>Submit</button>
            <button>Edit</button>
        </div>
        // </form>



    )
}

export default ReviewForm;