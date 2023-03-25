import { useState } from 'react';
import Checklist from './Checklist';

const CREDENTIALS = [
  {
    username: "Jason",
    password: 1234
  },
  {
    username: "Arturo",
    password: 5678
  },
]

const styles = {
  hide: "hide",
  show: "show"
}

const HomePage = () => {

  const [passcode, setPasscode] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Authenticates username and password
  const handleSubmit = () => {
    const foundUser = CREDENTIALS.find((el)=>el.username === passcode.username);
    if (!foundUser) return setError("Unauthorized");
    if(foundUser.password != Number(passcode.password)) return setError("Unauthorized");
    setIsAuthenticated(true);
  }

  //Watches the changes of the user input
  const handleChange = (e) => {
    const { name, value } = e.target
    setPasscode({ ...passcode, [name]: value });
    setError("");
  }

  return (
    <div>
      <img src='tree-service-logo.png' alt="logo" />
      <div className={isAuthenticated ? styles.hide : styles.show}>
        <input
          type="text"
          value={passcode.username}
          name="username"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          value={passcode.password}
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={() => handleSubmit()}>Submit</button>
        <p className='error'>{error}</p>
      </div>
      {
        isAuthenticated &&
        <>
          <Checklist username={passcode.username}/>
        </>

      }
    </div>
  )
}


export default HomePage;