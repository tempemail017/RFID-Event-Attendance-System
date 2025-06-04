import "./zglobal.css";
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Imported Sytem Pages.
import Login from "./pages/login/login.jsx";
import Meeting from "./pages/meeting/meeting.jsx";
import Meetings from "./pages/meetings/meetings.jsx";
import DisplayEvent from "./pages/displayEvent/displayevent.jsx";

const Application = () =>{
    return(
    <BrowserRouter>
        <Routes>

            <Route index element={<Login />}/>
            <Route path="/meetings" element={<Meetings />}/>
            <Route path="/meeting/:id" element={<Meeting />}/>
            <Route path="/displayEvent" element={<DisplayEvent />}/>
            
        </Routes>
    </BrowserRouter>
    );
}

export default Application;