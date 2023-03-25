import { useState, useEffect } from "react";
import Radio from "./Radio";
import Input from "./Input";
import { SAFTEYQUESTIONS, INPUTFIELDNAMES } from "../data";
import ReviewForm from "./ReviewForm";

const styles = {
    hide: "hide",
    show: "show"
}

const Checklist = ({ username }) => {

    // useEffect(() => { }, []);

    //State variable to control review component through a ternary
    const [isReview, setIsReviewed] = useState(false);

    //State variable for all inputs.
    const [checklist, setCheckList] = useState({
        team: username,
        input: [""],
        radio: [""],
        textbox: "",
        employee1: "",
        title1: "",
        consent1: "n/a",
        employee2: "",
        title2: "",
        consent2: "n/a",
        employee3: "",
        title3: "",
        consent3: "n/a",
        manager: "",
        timeIn: "",
        timeOut: ""
    });

    // One function to watch the changes for all input types.
    const handleChange = (e, index) => {
        let newArray
        const { name, value } = e.target;

        if (name === "textbox" || name === "team" || name === "manager") return setCheckList({ ...checklist, [name]: value });
        if (name.includes("time")) return setCheckList({ ...checklist, [name]: value });

        if (name === "empName") {
            newArray = [...checklist.employees];
            newArray[index].empName = value;
            return setCheckList({ ...checklist, employees: newArray });
        } else if (name === "title") {
            newArray = [...checklist.employees];
            newArray[index].title = value;
            return setCheckList({ ...checklist, employees: newArray })
        } else if (name === "consent") {
            newArray = [...checklist.employees];
            newArray[index].consent = value;
            return setCheckList({ ...checklist, employees: newArray })
        } else if (name === "radio") {
            newArray = [...checklist.radio];
        } else if (name === "input") {
            newArray = [...checklist.input];
        }
        newArray[index] = value;
        setCheckList({ ...checklist, [name]: newArray });
    }

    //Watches the changes for employee acknowledgment section.
    const handleChangeEmployee = (e, index) => {
        const { name, value } = e.target;
        setCheckList({ ...checklist, [name]: value });
    }

    // Adds empty element into employees array for new input.
    const handleAdd = (e) => {
        e.preventDefault();
        setCheckList({ ...checklist, employees: [...checklist.employees, { empName: "", title: "", consent: "" }] });
    }

    //Removes element from employees array.
    const handleRemove = (e, index) => {
        e.preventDefault();
        const filteredArray = checklist.employees.filter((employee, i) => i !== index);
        setCheckList({ ...checklist, employees: filteredArray });
    }

    //Displays review component.
    const review = (e) => {
        e.preventDefault();
        setIsReviewed(!isReview);
    }

    // Maps through the array and creates an input component with the array element.
    const mappedInputs = INPUTFIELDNAMES.map((inputName, index) =>
        <div key={index}>
            <Input
                labelName={inputName}
                index={index}
                value={checklist.input[index] ? checklist.input[index] : ""}
                type={inputName === "Date" ? "date" : "text"}
                forName="inputField"
                name="input"
                handleChange={handleChange}
            />
            <br />
        </div>

    );

    const mappedRadio = SAFTEYQUESTIONS.map((question, index) =>
        <div key={index}>
            <Radio
                radioQuestion={question}
                index={index}
                handleChange={handleChange}
            />
            <br />
        </div>
    );

    return (
        <div className="flex center column form">

            <form onSubmit={(e) => review(e)} className={isReview ? styles.hide : styles.show}>
                <h1>Welcome, {username}</h1>
                <Input
                    labelName="Crew Leader"
                    value={checklist.team}
                    forName="team"
                    name="team"
                    type="text"
                    handleChange={handleChange}
                />
                <Input
                    labelName="Time Arrived"
                    value={checklist.timeIn}
                    forName="team"
                    name="timeIn"
                    type="time"
                    handleChange={handleChange}
                />
                <Input
                    labelName="Time Departed"
                    value={checklist.timeOut}
                    forName="team"
                    name="timeOut"
                    type="time"
                    handleChange={handleChange}
                />
                <br />
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
                <br />
                <form>
                    <fieldset>
                        <legend>Acknowledgement</legend>
                        <div className="border">
                            <Input
                                type="text"
                                name="employee1"
                                value={checklist.employee1}
                                forName="comments"
                                labelName="Employee 1"
                                handleChange={handleChangeEmployee}
                            />
                            <Input
                                type="text"
                                name="title1"
                                value={checklist.title1}
                                forName="comments"
                                labelName="Title"
                                handleChange={handleChangeEmployee}
                            />
                            <p>
                                By checking the box below, I hereby confirm that the information provided above is accurate, correct and can be used by the company at the company's descretion.
                            </p>
                            <Input
                                labelName=""
                                type="checkbox"
                                forName="employeesField"
                                name="consent1"
                                value="yes"
                                handleChange={handleChangeEmployee}
                            />
                        </div>
                    </fieldset>
                </form>
                <br />
                <br />
                <form>
                    <fieldset>
                        <legend>Acknowledgement</legend>
                        <div className="border">
                            <Input
                                type="text"
                                name="employee2"
                                value={checklist.employee2}
                                forName="comments"
                                labelName="Employee 2"
                                handleChange={handleChangeEmployee}
                            />
                            <Input
                                type="text"
                                name="title2"
                                value={checklist.title2}
                                forName="comments"
                                labelName="Title"
                                handleChange={handleChangeEmployee}
                            />
                            <p>
                                By checking the box below, I hereby confirm that the information provided above is accurate, correct and can be used by the company at the company's descretion.
                            </p>
                            <Input
                                labelName=""
                                type="checkbox"
                                forName="employeesField"
                                name="consent2"
                                value="yes"
                                handleChange={handleChangeEmployee}
                            />
                        </div>
                    </fieldset>
                </form>
                <br />
                <br />
                <form>
                    <fieldset>
                        <legend>Acknowledgement</legend>
                        <div className="border">
                            <Input
                                type="text"
                                name="employee3"
                                value={checklist.employee3}
                                forName="comments"
                                labelName="Employee 3"
                                handleChange={handleChangeEmployee}
                            />
                            <Input
                                type="text"
                                name="title3"
                                value={checklist.title3}
                                forName="comments"
                                labelName="Title"
                                handleChange={handleChangeEmployee}
                            />
                            <p>
                                By checking the box below, I hereby confirm that the information provided above is accurate, correct and can be used by the company at the company's descretion.
                            </p>
                            <Input
                                labelName=""
                                type="checkbox"
                                forName="employeesField"
                                name="consent3"
                                value="yes"
                                handleChange={handleChangeEmployee}
                            />
                        </div>

                    </fieldset>
                </form>
                <br />
                <br />
                <Input
                    type="text"
                    name="manager"
                    value={checklist.manager}
                    forName="manager"
                    labelName="Safety Report Reviewed By Contract Group Manager or Contract Group Supervisor"
                    handleChange={handleChange}
                />
                <br />
                <button>Review</button>
            </form>
            {isReview ? <ReviewForm checklist={checklist} review={review} /> : ""}
        </div>
    );
}

export default Checklist;