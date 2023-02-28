import { useState } from "react";


const selected = {
    fontWeight: "750",
    border: "1px solid white"
}
const notSelected = {
    opacity: .3
}

const Radio = (props) => {

    const { radioQuestion, handleChange, index } = props;

    const [isSelected, setIsSelected] = useState({
        yes: false,
        no: false
    });

    return (
        <div>
            <label htmlFor="radio">{radioQuestion}?</label>
            <div>
                <span style={isSelected.yes ? selected : notSelected} >Yes</span>
                <input
                    type="radio"
                    name="radio"
                    value="Yes"
                    onClick={()=>setIsSelected({yes: true, no: false})}
                    onChange={(e) => handleChange(e, index)}
                />
                <span style={isSelected.no ? selected : notSelected}>No</span>
                <input
                    type="radio"
                    name="radio"
                    value="No"   
                    onClick={()=>setIsSelected({yes: false, no: true})}                 
                    onChange={(e) => handleChange(e, index)}
                />
            </div>
        </div>

    )
}

export default Radio;