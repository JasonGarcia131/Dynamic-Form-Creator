const Input = (props) => {

    const {handleChange, index, labelName, value, name, type, forName} = props;

    return (
        <div>
            <label htmlFor={forName}>{labelName}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={(e)=>handleChange(e, index)}
            />
        </div>

    )
}

export default Input;