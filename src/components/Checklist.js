import { useState, useEffect } from "react";
import Radio from "./Radio";
import Input from "./Input";
import { SAFTEYQUESTIONS, INPUTFIELDNAMES } from "../data";
import ReviewForm from "./ReviewForm";
import { SignatureComponent, Signature } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const styles = {
    hide: "hide",
    show: "show"
}

const Checklist = () => {

    let signObj = Signature || null;


    const onSave = (e) => {
        e.preventDefault();
        // signObj?.save();
        console.log(signObj);
        setCheckList({...checklist, content: signObj.signatureValue})
    }


    const onClear = () => {
        signObj?.clear();
    }

    useEffect(() => { }, []);

    const [isReview, setIsReviewed] = useState(false);

    // const styles = clicked ? {display: "none"} : {display: "inline-block"};

    const [checklist, setCheckList] = useState({
        team: "",
        input: [""],
        radio: [""],
        textbox: "",
        employees: [""],
        content: ""
    });

    console.log("checklist content", checklist.content)

    // One function to watch the changes for all input types.
    const handleChange = (e, index) => {
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

    // Adds empty element into employees array for new input.
    const handleAdd = (e) => {
        e.preventDefault();
        setCheckList({ ...checklist, employees: [...checklist.employees, ""] });
    }

    const handleRemove = (e, index) => {
        e.preventDefault();
        const filteredArray = checklist.employees.filter((employee, i)=>i != index);
        setCheckList({ ...checklist, employees: filteredArray });
    }

    const review = (e) => {
        e.preventDefault();
        setIsReviewed(!isReview);
    }

    // Maps through the employees and creates an input component.
    const mappedEmployees = checklist.employees.map((employee, index) =>
        <div>
            <Input
                labelName="Employee and Title:"
                key={index}
                index={index}
                type="text"
                forName="employeesField"
                name="employees"
                value={checklist.employees[index]}
                handleChange={handleChange}
            />
            <button className="btnLeft" onClick={(e)=>handleRemove(e, index)}>Remove</button>
        </div>

    );

    // Maps through the array and creates an input component with the array element.
    const mappedInputs = INPUTFIELDNAMES.map((inputName, index) =>
        <div>
            <Input
                labelName={inputName}
                key={index}
                index={index}
                value={checklist.input[index] ? checklist.input[index] : ""}
                type="text"
                forName="inputField"
                name="input"
                handleChange={handleChange}
            />
            <br />
        </div>

    );
    const mappedRadio = SAFTEYQUESTIONS.map((question, index) =>
        <div>
            <Radio
                radioQuestion={question}
                key={index}
                index={index}
                handleChange={handleChange}
            />
            <br />
        </div>

    );

    return (
        <div className="flex center column form">
            <form onSubmit={(e) => review(e)} className={isReview ? styles.hide : styles.show}>
                <Input
                    labelName="Team Name"
                    value={checklist.team}
                    forName="team"
                    name="team"
                    type="text"
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
                {mappedEmployees}
                <button onClick={handleAdd}>Add Employee</button>
                <SignatureComponent
                ref={sign => signObj = sign}
                backgroundColor="red"
                strokeColor="white"
                ></SignatureComponent>
                <ButtonComponent
                onClick={onSave}
                >Save</ButtonComponent>
                 <ButtonComponent
                onClick={onClear}
                >clear</ButtonComponent>
                <br />
                <button className="left" onClick={handleAdd}>Add Employee</button>
                <br />
                <br/>
                <button>Review</button>
            </form>
            {isReview ? <ReviewForm checklist={checklist} review={review} /> : ""}
        </div>


    )
}

export default Checklist;