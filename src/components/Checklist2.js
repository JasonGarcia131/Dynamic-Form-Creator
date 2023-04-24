import { useState, useEffect } from "react";
import Radio from "./Radio";
import Input from "./Input";
import { FormData } from "../data";
import ReviewForm from "./ReviewForm";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const styles = {
    hide: "hide",
    show: "show"
}

const Checklist2 = () => {


    useEffect(()=>{

    },[]);
    //Authenticated User
    const { auth } = useAuth();
  
    //User info decoded from the access token
    const decode = auth.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const username = decode.UserInfo.username

        // console.group("user", username)
    //State variable to control review component through a ternary
    const [isReview, setIsReviewed] = useState(false);

    //State variable for all inputs.
    const [checklist, setCheckList] = useState({
        team: username,
        input: [""],
        radio: [""],
        comments: "",
        images: [""],
        employees: [{
            firstName: "",
            lastName: "",
            title: "",
            consent: "n/a",
        }],
    });

    // One function to watch the changes for all input types.
    const handleChange = (e, index) => {
        let newArray
        const { name, value } = e.target;

        if (name === "comments" || name === "team" || name === "manager") return setCheckList({ ...checklist, [name]: value });

        // if (name === "radio") {
        //     newArray = [...checklist.radio];

        // } else if (name === "input") {
        //     newArray = [...checklist.input];
        // }

        newArray = [...checklist[name]];

        newArray[index] = value;
        setCheckList({ ...checklist, [name]: newArray });
    }

    console.log("checklist", checklist);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const { name } = e.target

        if (file && file.type.substring(0, 5) === 'image') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                // setIsLoading(false);
                // setUploadBtn(true);
                //Sets the name of the key based on the string that was passed in the props.
                //This is for the userControllers to know which field to update in the Users db collection. 
                setCheckList((prevData) => ({ ...prevData, images: [...checklist.images, reader.result] }));
            }
        }
    }

    //Watches the changes for employee acknowledgment section.
    const handleChangeEmployee = (e, index) => {
        const { name, value } = e.target;
        const newArray = [...checklist.employees];
        newArray[index][name] = value;
        setCheckList({ ...checklist, employees: newArray });
    }

    // Adds empty element into employees array for new input.
    const handleAdd = (e) => {
        e.preventDefault();
        setCheckList({ ...checklist, employees: [...checklist.employees, { firstName: "", lastName: "", title: "", consent: "" }] });
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
    const mappedInputs = FormData.map((data, index) => {
        return data.type === "input" || data.type === "date" || data.type === "time" ? (
            <div key={index}>
                <Input
                    labelName={data.question}
                    index={index}
                    value={checklist.input[index] ? checklist.input[index] : ""}
                    type={data.type}
                    forName="data"
                    name="input"
                    handleChange={handleChange}
                />
                <br />
            </div>
        ) :
            <div key={index}>
                <Radio
                    radioQuestion={data.question}
                    index={index}
                    handleChange={handleChange}
                />
                <input
                    type="file"
                    name="images"
                    accept="/image/*"
                    onChange={(e) => handleImageChange(e, index)}
                />
                <br />
            </div>
    }
    );

    const mappedEmployee = checklist.employees.map((employee, index) =>
        <fieldset className="border" key={index}>
            <legend>Acknowledgement</legend>
            <Input
                labelName="First Name"
                index={index}
                value={checklist.employees[index].firstName}
                type="text"
                forName="inputField"
                name="firstName"
                handleChange={handleChangeEmployee}
            />
            <Input
                labelName="Last Name"
                index={index}
                value={checklist.employees[index].lastName}
                type="text"
                forName="inputField"
                name="lastName"
                handleChange={handleChangeEmployee}
            />
            <Input
                labelName="Title"
                index={index}
                value={checklist.employees[index].title}
                type="text"
                forName="inputField"
                name="title"
                handleChange={handleChangeEmployee}
            />
            <Input
                labelName="I Consent"
                index={index}
                type="checkbox"
                forName="employeesField"
                name="consent"
                value="yes"
                handleChange={handleChangeEmployee}
            />
            <button onClick={(e) => handleRemove(e, index)}>Remove Employee</button>

        </fieldset>
    )

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
                <br />
                {mappedInputs}
                <h2>Are the following safety item properly addressed, identified, and communicated?</h2>
                <br />
                <Input
                    type="textbox"
                    name="comments"
                    value={checklist.comments}
                    forName="comments"
                    labelName="Remarks, Comments, and failures that was found and corrections:"
                    handleChange={handleChange}
                />
                <br />
                <br />
                {mappedEmployee}
                <button onClick={handleAdd}>Add employee</button>
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
            {isReview ? <ReviewForm checklist={checklist} setChecklist={setCheckList} review={review} /> : ""}
        </div>
    );
}

export default Checklist2;