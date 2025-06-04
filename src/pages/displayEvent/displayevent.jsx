import "./displayevent.css";
import io  from "socket.io-client";
import React, {useState, useEffect} from "react";

const socket = io("http://localhost:7000");

// Imported Components.
import LogAttendance2 from "../../components/logAttendance2/logAttendance.jsx";

const DisplayEvent = () =>{
    const [meetings, setMeetings] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [meetingLoaded, setMeetingLoaded] = useState(false);

    const [viewInfoCard, setViewInfoCard] = useState(false);
    const [cardNotExist, setCardNotExits] = useState(false);

    useEffect(() => {
        // Retrieve Public Meetings.
        const handleMeetPublic = (data)=>{
            setMeetings(data);
            setMeetingLoaded(true);
        };

        // Retrieve Scanned Student Card.
        const handleCardScanned = (data)=>{
            if(data.uid !== ''){
                socket.emit('get_Student', data.uid);        
            }
        };

        // Retrive Student Data.
        const handleRtStudent = (data)=>{
            if(data == null){
                setViewInfoCard(false);
                setCardNotExits(true);
            } else{
                setCardNotExits(false);
                setViewInfoCard(true);
                setStudentData(data);
            }
        };

        socket.on('rt_meetPublic', handleMeetPublic);
        socket.on('cardScanned', handleCardScanned);
        socket.on('rt_Student', handleRtStudent);

        return () => {
            socket.off('rt_meetPublic', handleMeetPublic);
            socket.off('cardScanned', handleCardScanned);
            socket.off('rt_Student', handleRtStudent);
        };
    }, []);


    return(
    <>
        <section className="all_sections">
            <div className="all_pageswrapper">

                <div className="de_tabside">
                    <div className="de_tablogomainwrapper">
                        <div className="de_tablogosubwrapper">
                            <img src="/svglogo.svg" />
                        </div>
                    </div>
                </div>

                <div className="all_pagescontentwrapper">
                    <div className="de_headerwrapper">
                        <div>
                            <h1>Organization Events</h1>
                            <p>Click on an event and scan your card.</p>
                        </div>
                    </div>

                    <div className="de_bodywrapper">
                        {meetingLoaded &&(
                        <>
                            {meetings.map((o)=>{
                                return(
                                <>
                                    <div key={o.id} className="de_bodycmainwrapper">

                                        <div className="de_bodycsubwrapper">
                                            <div className="de_bodycinfowrapper">
                                                <img src="/pngwave.png"/>                                             
                                                <div>
                                                    <h3>{o.meet_Title}</h3>
                                                    <p>{o.meet_Date}</p>
                                                </div>  
                                            </div>

                                            <div className="de_bodycbuttonwrapper">
                                                <LogAttendance2 vCard={viewInfoCard} nCard={cardNotExist} meetId={o.id} meetTitle={o.meet_Title} meetDate={o.meet_Date} scannedStudentData={studentData}/>
                                            </div>
                                        </div>

                                    </div>
                                </>
                                )
                            })}
                        </>
                        )}
                        <p className="de_bodypend">End of the list.</p>
                    </div>  
                </div>

            </div>
        </section>
    </>
    );
}

export default DisplayEvent;