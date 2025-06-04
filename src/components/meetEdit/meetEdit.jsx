import "./meetEdit.css";
import axios from "axios";
import React, { useState } from "react";

const MeetEdit = (props) =>{
    const [openEdit, setOpenEdit] = useState(false);

    const [values, setValues] = useState({
        meet_Title: props.meet_Title,
        meet_Date: props.meet_Date,
        meet_Status: props.meet_Status
    });

    // Edit Meeting.
    const handleUpdate = async (id) =>{
        try{
            await axios.put("http://localhost:7000/meetingUpdate/" + id, values);
            window.location.reload();
        }catch(error){console.log(error)};
    };

    return(
    <>
        <button className="mte_mainbutton" onClick={() =>{setOpenEdit(!openEdit)}}>
            <img src="/svgedit.svg"/>
        </button>

        {openEdit &&(
        <>
            <div className="all_overlay">
                <div className="all_modalmainwrapper">

                    <div className="mte_header">
                        <div>
                            <h3>Edit Meeting</h3>
                            <p>Ensure correct information.</p>
                        </div>
                        <button><img src="/svglogout.svg" onClick={()=>{setOpenEdit(!openEdit)}}/></button>
                    </div>

                    <div className="mte_body">
                        <div className="mte_fieldTitle">
                            <h4>Event Title</h4>
                            <input required value={values.meet_Title} type="text" placeholder="Enter Title :" onChange={(e) =>{ setValues({...values, meet_Title : e.target.value});}}></input> 
                        </div> 

                        <div className="all_inputStatus">
                            <h4>Event Status</h4>
                            <div className="all_inputselectwrapper">
                                <select value={values.meet_Status} className="all_select" onChange={(e) =>{ setValues({...values, meet_Status: e.target.value});}}>
                                    <option value='Public'>Public</option>
                                    <option value='Private'>Private</option>
                                </select>
                                <div className="all_selectdropwrapper">
                                    <img src="/svgdropdown.svg"/>
                                </div>
                            </div>
                        </div>

                        <div className="mte_fieldDate">
                            <h4>Event Date</h4>
                            <input required value={values.meet_Date} type="date" onChange={(e) =>{setValues({...values, meet_Date : e.target.value});}}></input>
                        </div>
                    </div>

                    <div className="mte_footer">
                        <button onClick={()=> setOpenEdit(!openEdit)}>Cancel</button>
                        <button onClick={() => handleUpdate(props.id)}>Save</button>
                    </div>

                </div>
            </div>
        </>
        )}
    </>
    );
}

export default MeetEdit;