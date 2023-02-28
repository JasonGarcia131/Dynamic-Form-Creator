import { useState } from 'react';
import Checklist from './Checklist';

const CREDENTIALS = {
  password: 1234
}

const styles = {
  hide: "hide",
  show: "show"
}

const HomePage = () => {

    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    //Authenticates users passcode 
    const handleSubmit = () => {
      if (Number(passcode) !== CREDENTIALS.password) return setError("Unauthorized");
      setIsAuthenticated(true);
    }
  
    //Watches the changes of the user input
    const handleChange = (e) => {
      setPasscode(e.target.value);
      setError("");
    }

    return (
        <div>
            <img src='tree-service-logo.png' alt="logo"/>
            <div className={isAuthenticated ? styles.hide : styles.show}>
                <input
                    type="text"
                    value={passcode}
                    placeholder="Enter passcode"
                    onChange={(e) => handleChange(e)}
                />
                <button onClick={() => handleSubmit()}>Submit</button>
                <p className='error'>{error}</p>
            </div>
            {
                isAuthenticated &&
                <>
                    <Checklist />
                </>

            }
        </div>
    )
}


export default HomePage;