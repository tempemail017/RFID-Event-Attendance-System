import "./login.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate();
    const [loginFailed, setLoginFailed] = useState(false);

    const [values, setValues] = useState({
        ad_Username: "",
        ad_Password: ""
    });

    // Admin Credentials Validation.
    const handleLogin = async () =>{
        const response = await axios.post("http://localhost:7000/loginAdmin", values);
        try{
            if(response.data.Status){
                navigate('/meetings'); 
            }
            setLoginFailed(!loginFailed);
            setTimeout(()=>{window.location.reload()}, 1500);
        }catch(error){
            setLoginFailed(!loginFailed);
            setTimeout(()=>{window.location.reload()}, 1500);
        }
    };

    return(
    <>
        <section className="all_sections">
            <div className="lg_pagewrapper">

                <div className="lg_designmainwrapper">
                    <div className="lg_designsubwrapper">
                        <img src="/svglogo.svg"/>
                    </div>
                </div>

                <div className="lg_formmainwrapper">

                    <div className="lg_topmainwrapper">
                        <div className="lg_topheader">
                            <h2>Gemi.</h2>
                            <p>Event Attendance Management System</p>
                            {loginFailed &&(
                            <>
                                <p style={{ "color": "white",
                                            "padding": "8px 0px", 
                                            "marginTop": "20px",
                                            "marginBottom": "0px",
                                            "fontSize": "13px",
                                            "borderRadius": "8px",
                                            "backgroundColor": "#FFB77C",
                                            "box-shadow": "0px 0px 3px #FFB77C"}}>Log In Failed.</p>
                            </>
                            )}
                        </div>

                        <div className="lg_topformswrapper">
                            <div className="lg_formusername">
                                <h4>Admin Username</h4>
                                <input required type="text" placeholder="Enter Username :" onChange={(e) => {setValues({...values, ad_Username : e.target.value});}}/>
                            </div>

                            <div className="lg_formpassword">
                                <h4>Admin Password</h4>
                                <input required type="password" placeholder="Enter Password : " onChange={(e)=> {setValues({...values, ad_Password : e.target.value});}}/>
                            </div>  
                        </div>    

                    </div>
                    <button onClick={handleLogin}>Log In</button>
           
                </div>    
            </div>
        </section>
    </>
    );
}

export default Login;