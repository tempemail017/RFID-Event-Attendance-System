import "./meeting.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Imported Components.
import Navigation from "../../components/navigation/navigation.jsx";
import LogAttendance from "../../components/logAttendance/logAttendance.jsx";
import AttendanceDelete from "../../components/attendanceDelete/attendanceDelete.jsx";

const Meeting = () =>{
    const params = useParams();
    const meetingID = params.id;
    const [searchFilter, setSearchFilter] = useState('');

    const [meetingData, setMeetingData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [attendanceLoaded, setAttendanceLoaded] = useState(false);

    // Retrieve Meeting Data.
    useEffect(()=>{
        const retrieveMeeting = async () =>{
            const response = await axios.get("http://localhost:7000/meetingRetrieve/"+ meetingID);
            setMeetingData(response.data);
            setDataLoaded(!dataLoaded);
        }
        retrieveMeeting();
    }, []);

    // Retrieve Attendance Logs Data.
    useEffect(()=>{
        const retrieveAttendance = async () =>{
            const response = await axios.get("http://localhost:7000/attendanceRetrieve/"+ meetingID);
            setAttendanceData(response.data);
            setAttendanceLoaded(!attendanceLoaded);
        }
        retrieveAttendance();
    }, []);

    return(
    <>
        <section className="all_sections">
            <div className="all_pageswrapper">
                <Navigation />
                <div className="all_pagescontentwrapper">

                    <div className="mt_headerwrapper">
                            {dataLoaded &&(
                                <>
                                    <div className="mt_headertextswrapper">
                                        <div className="mt_headerbackbutton">
                                            <Link to={'/meetings'}><img src="/svgback.svg" /></Link>
                                        </div>
                                        
                                        <div>
                                            <h1>{meetingData[0].meet_Title}</h1>
                                            <p>An event in : {meetingData[0].meet_Date}.</p>
                                        </div>
                                    </div>
                                </>
                            )}                        
                    </div>

                    <div className="mt_headerbodywrapper">
                        <div className="mt_bodyoptionswrapper">
                            <div>
                                <h4>Recorded Attendance</h4>
                                <p>Recorded attendance as of creation.</p>
                            </div>
                
                            <div className="mt_bodyoptionswrapperright">
                                <div className="mt_bodysearchwrapper">
                                    <input type="text" placeholder="Search a record : " onChange={(e) =>{setSearchFilter(e.target.value)}}></input>
                                    <img src="/svgsearch.svg"/>
                                </div>
                                {dataLoaded &&(
                                <>
                                    <LogAttendance meetId={meetingData[0].id} meetTitle={meetingData[0].meet_Title} meetDate={meetingData[0].meet_Date}/>
                                </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt_bodytablewrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Card Number</th>
                                    <th>Event</th>   
                                    <th>Full Name</th>
                                    <th style={{textAlign: 'center'}}>Sex</th>
                                    <th style={{textAlign: 'center'}}>Program</th>
                                    <th style={{textAlign: 'center'}}>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {attendanceLoaded &&(
                                <>
                                    {attendanceData.filter((o)=>{
                                        if(searchFilter === ''){ return o;}
                                        else{ return o.stu_Fname.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase());}
                                        
                                    }).map((o)=>{
                                        return(
                                        <>
                                        <tr>
                                            <td className="mt_tablecardnumber"><p>{o.stu_CardNumber}</p></td>
                                            <td>{o.meet_Title}</td>                           
                                            <td>{o.stu_Fname}</td>
                                            <td style={{textAlign: 'center'}}>{o.stu_Sex}</td>
                                            <td style={{textAlign: 'center'}}>{o.stu_Program}</td>
                                            <td><AttendanceDelete id={ o.id }/></td>
                                        </tr>
                                        </>
                                        );
                                    })}
                                </>
                                )}
                            </tbody>
                        </table>
                        <p>End of the list.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
}

export default Meeting;