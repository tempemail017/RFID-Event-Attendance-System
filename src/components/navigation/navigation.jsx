import "./navigation.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () =>{
    const navigate = useNavigate();
    return(
    <>
        <div className="nav_mainwrapper">
            <div className="nav_topwrapper">
                <div className="nav_logowrapper">
                    <Link to={'/meetings'}><img src="/svglogo.svg" /></Link>
                </div>
                <ul className="nav_routeswrapper">
                    <li><Link to={'/meetings'}><img src="/svgmeeting.svg"/></Link></li>
                </ul>
            </div>

            <div className="nav_bottomwrapper">
                <button onClick={()=> {navigate('/')}}><img src="/svglogout.svg"/></button>
            </div>
        </div>
    </>
    );
}

export default Navigation;