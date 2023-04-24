import { useNavigate, Link, useSearchParams } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();


    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    //Authenticated User
    const { auth } = useAuth();

    //User info decoded from the access token
    const decode = auth.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const user = decode?.UserInfo;
    const id = user?.userId;
    const role = user?.roles;
    
    return (
        <section>
            <h1>Home</h1>
            <br />
            {role?.includes(1994) ? <Link to='/admin-page'>Admin's Home</Link> : ""}
            <br />
            <Link to='/inspection-form'>Start Inspection</Link>

            <br />
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
