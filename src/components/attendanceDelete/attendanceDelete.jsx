import "./attendanceDelete.css";
import axios from "axios";
import React, { useState } from "react";

const AttendanceDelete = (props) =>{
    const [openDelete, setOpenDelete] = useState(false);
    const attendanceID = props.id;

    // Delete Attendance Log Data.
    const handleDelete = async () =>{
        try{
            await axios.delete("http://localhost:7000/attendanceDelete/" + attendanceID);
            window.location.reload();
        }catch(error){throw error;}
    };

    return(
    <>
        <button className="ad_mainbutton" onClick={() =>{setOpenDelete(!openDelete)}}>
            <img src="/svgdelete.svg"/>
        </button>

        {openDelete &&(
        <>
            <div className="all_overlay">
                <div className="all_modalmainwrapper">
                    <div className="ad_header">
                        <h3>Delete Attendance Log</h3>
                        <p>Are you sure you want to delete this log?</p>
                    </div>

                    <div className="ad_footer">
                        <button onClick={()=> {setOpenDelete(!openDelete)}}>Cancel</button>
                        <button onClick={()=> {handleDelete()}}>Delete</button>
                    </div>
                </div>
            </div>
        </>
        )}
    </>
    );
}

export default AttendanceDelete;