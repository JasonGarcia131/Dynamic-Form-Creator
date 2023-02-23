import { useState, useEffect } from "react";
import Radio from "./Radio";
import Input from "./Input";
import { SAFTEYQUESTIONS, INPUTFIELDNAMES } from "../data";
import ReviewForm from "./ReviewForm";


const Checklist = () => {

    useEffect(() => { }, []);

    const [clicked, setClicked] = useState(false);

    const [checklist, setCheckList] = useState({
        team: "",
        input: [""],
        radio: [""],
        textbox: "",
        employees: [""]
    });

    const handleChange = (e, index) => {
        e.preventDefault();
        let newArray
        const { name, value } = e.target;

        if (name === "textbox" || name === "team") return setCheckList({ ...checklist, [name]: value });

        if (name === "employees") {
            newArray = [...checklist.employees];
        } else if (name === "radio") {
            newArray = [...checklist.radio];
        } else if (name === "input") {
            newArray = [...checklist.input];
        }
        newArray[index] = value;

        setCheckList({ ...checklist, [name]: newArray });
    }


    const handleAdd = (e) => {
        e.preventDefault();
        setCheckList({ ...checklist, employees: [...checklist.employees, ""] });
    }

    console.log("checklist", checklist);

    const mappedEmployees = checklist.employees.map((employee, index) =>
        <Input
            labelName="Employees"
            key={index}
            index={index}
            type="text"
            forName="employeesField"
            name="employees"
            value={checklist.employees[index]}
            handleChange={handleChange}
        />
    );

    const mappedInputs = INPUTFIELDNAMES.map((inputName, index) =>
        <Input
            labelName={inputName}
            index={index}
            value={checklist.input[index] ? checklist.input[index] : ""}
            type="text"
            forName="inputField"
            name="input"
            handleChange={handleChange}
        />
    );

    const mappedRadio = SAFTEYQUESTIONS.map((question, index) =>
        <Radio
            radioQuestion={question}
            key={index}
            index={index}
            handleChange={handleChange} />
    );

    return (
        <div>
            <Input
                labelName="Team Name"
                value={checklist.team}
                forName="team"
                name="team"
                type="text"
                handleChange={handleChange}
            />
            <form>
                {mappedInputs}
                <h2>Are the following safety item properly addressed, identified, and communicated?</h2>
                {mappedRadio}
                <br />
                <Input
                    type="textbox"
                    name="textbox"
                    value={checklist.textbox}
                    forName="comments"
                    labelName="Remarks, Comments, and failures that was found and corrections:"
                    handleChange={handleChange}
                />
                <br />
                {mappedEmployees}
                <button onClick={handleAdd}>Add Employee</button>
            </form>
            {/* below code for testing only. remove when done */}
            <button onClick={() => setClicked(!clicked)}>Submit</button>
            {clicked ? <ReviewForm checklist={checklist} /> : ""}
        </div>


    )
}

export default Checklist;