import "./meetings.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Imported Components.
import MeetAdd from "../../components/meetAdd/meetAdd.jsx";
import MeetEdit from "../../components/meetEdit/meetEdit.jsx";
import MeetDelete from "../../components/meetDelete/meetDelete.jsx";
import Navigation from "../../components/navigation/navigation.jsx";

const Meetings = () =>{
    const [meetings, setMeetings] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

    // Retrive Meetings.
    useEffect(()=>{
        const retrieveMeetings = async () =>{
            const response = await axios.get('http://localhost:7000/meetingRetrieve');
            setMeetings(response.data);
        }
        retrieveMeetings();
    }, []);

    return(
    <>
        <section className="all_sections">
            <div className="all_pageswrapper">
                <Navigation />
                <div className="all_pagescontentwrapper">

                    <div className="meet_headerwrapper">
                        <div>
                            <h1>Organization Events</h1>
                            <p>Manage and monitor organization events.</p>
                        </div>
                        <MeetAdd />
                    </div>

                    <div className="meet_bodywrapper">
                        
                        <div className="meet_bodyoptionswrapper">
                            <div className="meet_optionsearchfilterwrapper">
                                <h4>Search Event</h4>
                                <div className="meet_searcheventfield">
                                    <input type="text" placeholder="Search an event :" onChange={(e)=>{setSearchFilter(e.target.value.toLocaleLowerCase())}}></input>
                                    <img src="/svgsearch.svg" />
                                </div> 
                            </div>
                            
                            <div className="meet_optiondatefilterwrapper">
                                <h4>Filter Date Event</h4>
                                <input type="date" onChange={(e)=>{setDateFilter(e.target.value)}}></input>
                            </div>
                        </div>

                        <div className="meet_tablewrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Event Title</th>
                                        <th>Date Created</th>
                                        <th>Status</th>
                                        <th className="meet_tableactionsh">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {meetings.filter((o)=>{
                                        if(searchFilter === ""){return o;}
                                        else return o.meet_Title.toLocaleLowerCase().includes(searchFilter);
                                        
                                    }).filter((o) =>{
                                        if(dateFilter === ""){return o;}
                                        else return o.meet_Date.includes(dateFilter);
                                        
                                    }).map((o)=>{
                                        return(
                                        <>
                                        <tr className="all_tablecontenttr">
                                            <td>{o.meet_Title}</td>
                                            <td>{o.meet_Date}</td>
                                            <td>{o.meet_Status}</td>
                                            <td className="meet_tableactions">
                                                <div className="meet_tableactionsoption1">
                                                    <MeetEdit id={ o.id } meet_Title={ o.meet_Title } meet_Date={ o.meet_Date } meet_Status={ o.meet_Status }/>
                                                    <MeetDelete id={ o.id }/>
                                                </div>
                                                
                                                <Link to={`/meeting/${o.id}`} className="meet_tableactionsoption2">
                                                    <p>Logs</p>
                                                    <img src="/svgview.svg"/>
                                                </Link>
                                            </td>
                                        </tr>
                                        </>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <p>End of the list.</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </>
    );
}

export default Meetings;