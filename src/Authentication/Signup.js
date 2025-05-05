// useState - React hook to manage form data
import {useState} from "react";

// Library for making HTTP request
// import axios from "axios";

// A hook from React router to navigate between pages.
import {useNavigate} from "react-router-dom"

import { signUpUser } from "../Service/apiService";

//Define a signup component
const Signup=()=>{
    // useState() initializes a state variable called username with an empty string as a default value
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[group_name,setGroupName]=useState("");

    //useNavigate() is a react router hook that allows navigation between different pages
    const navigate=useNavigate();

//Defines an asynchronous function named handlesignup
    const handlesignup = async(e) => {
        //Normally, when a form is submitted, the browser reloads the page
        //e.preventDefault stops this default behaviour, so the page doesn't
        // refresh.
        e.preventDefault();
        try{
            //axios.post(url, data) is used to send data to the backend
            const response = await signUpUser({username, password, group_name});
            // localStorage.setItem("key", value) stores data in the browser
            // The token received from the backend is saved with the key "token"
            localStorage.setItem("token", response.data.token);
            alert("Signup successfull");
            navigate("/dashboard");
        }
        catch(error)
        {
            alert("Error signing up. Please try again")
        }
    };

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4 shadow">
                        <h2 className="text-center">Signup</h2>
                        <form onSubmit={handlesignup}>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Username"
                                onChange={(e)=> setUsername(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Group Name"
                                onChange={(e)=>setGroupName(e.target.value)} required/>
                            </div>
                            <button type="submit" className="btn btn-success w-100">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup;