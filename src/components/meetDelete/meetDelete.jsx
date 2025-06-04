import "./meetDelete.css";
import axios from "axios";
import React, { useState } from "react";

const MeetDelete = (props) =>{
    const [openDelete, setOpenDelete] = useState(false);

    // Delete Meeting.
    const handleDelete = async (id) =>{
        try{
            await axios.delete('http://localhost:7000/meetingDelete/' + id);
            window.location.reload();
        }catch(error){console.log("Meeting Deletion Failed.");}
    };

    return(
    <>
        <button className="mtd_mainbutton" onClick={() => {setOpenDelete(!openDelete)}}>
            <img src="/svgdelete.svg"/>
        </button>

        {openDelete &&(
        <>
            <div className="all_overlay">
                <div className="all_modalmainwrapper">
                    <div className="mtd_header">
                        <h3>Delete Event</h3>
                        <p>Are you sure you want to delete this event?</p>
                    </div>

                    <div className="mtd_footer">
                        <button onClick={()=> {setOpenDelete(!openDelete)}}>Cancel</button>
                        <button onClick={() => handleDelete(props.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </>
        )}
    </>
    )
}

export default MeetDelete;