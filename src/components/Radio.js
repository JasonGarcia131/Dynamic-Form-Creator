const Radio = (props) => {

    const {radioQuestion, handleChange, index} = props;

    return (
        <div>
            <label htmlFor="radio">{radioQuestion}?</label>
            <input
                type="radio"
                name="radio"
                value="Yes"
                onChange={(e)=>handleChange(e, index)}
            />
            <input
                type="radio"
                name="radio"
                value="No"
                onChange={(e)=>handleChange(e, index)}
            />
        </div>

    )
}

export default Radio;