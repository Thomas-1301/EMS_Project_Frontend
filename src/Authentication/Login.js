import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//function to handle login
const Login = () => {
    const [username, setUsername] = useState(""); //state variable to store username
    const [password, setPassword] = useState(""); //state variable to store password

    const navigate = useNavigate(); //initialize the navigate function

    const handleLogin = async (e) => { //defines a asynchronous function named handleLogin
        e.preventDefault(); //this stops the default behavior, so the page does not refresh
        try {
            //axios.post(url,data) is used to send data to backend 
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.Data.Access); //store the token in local storage
            alert("Login Successful")
            navigate('/dashboard'); //navigate to the dashboard page
        }catch (error) {
            console.log(error)
            alert("Invalid Login Credentials!");
        }
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4 shadow">
                        <h2 className="text-center">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form> 
                    </div>
                </div>      
            </div>

        </div>
    );  
}
export default Login; //export the Login component so it can be used in other files