import "./meetAdd.css";
import axios from "axios";
import React, { useState } from "react";

const MeetAdd = () =>{
    const [openAdd, setOpenAdd] = useState(false);

    const [values, setValues] = useState({
        meetTitle : "",
        meetDate  : "",
        meetStatus: ""
    })

    // Create Event.
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:7000/meetingCreate", values);
            window.location.reload();
        }catch(error){ console.log("Event Creation Failed.")};
    };

    return(
    <>
        <button className="mta_mainbutton" onClick={()=> {setOpenAdd(!openAdd)}}>
            <img src="svgadd.svg" /> Create Meeting
        </button>

        {openAdd && (
        <>
            <div className="all_overlay">
                <div className="all_modalmainwrapper">

                    <div className="mta_header">
                        <div>
                            <h3>Create Meeting</h3>
                            <p>Ensure correct information.</p>
                        </div>
                        <button><img src="/svglogout.svg" onClick={()=>{setOpenAdd(!openAdd)}}/></button>
                    </div>

                    <div className="mta_body">
                        <div className="mta_fieldTitle">
                            <h4>Event Title</h4>
                            <input type="text" placeholder="Enter Title :" onChange={(e) =>{ setValues({...values, meetTitle : e.target.value});}}></input> 
                        </div>

                        <div className="all_inputStatus">
                            <h4>Event Status</h4>
                            <div className="all_inputselectwrapper">
                                <select className="all_select" onChange={(e) =>{ setValues({...values, meetStatus: e.target.value});}}>
                                    <option value="" selected disabled hidden>Select Status :</option>
                                    <option value='Public'>Public</option>
                                    <option value='Private'>Private</option>
                                </select>
                                <div className="all_selectdropwrapper">
                                    <img src="/svgdropdown.svg"/>
                                </div>
                            </div>
                        </div>

                        <div className="mta_fieldDate">
                            <h4>Event Date</h4>
                            <input type="date" onChange={(e) =>{setValues({...values, meetDate : e.target.value});}}></input>
                        </div>
                    </div>

                    <div className="mta_footer">
                        <button onClick={()=> setOpenAdd(!openAdd)}>Cancel</button>
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                    
                </div>
            </div>
        </>
        )}
    </>
    );
}

export default MeetAdd;