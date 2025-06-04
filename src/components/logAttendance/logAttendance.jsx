import './logAttendance.css';
import axios from 'axios';
import io  from 'socket.io-client';
import React, { useEffect, useState } from 'react';

const socket = io("http://localhost:7000");

const LogAttendance = (props) =>{
    const [openLogAttendance, setOpenLogAttendance] = useState(false);

    const [viewInfoCard, setViewInfoCard] = useState(false);
    const [cardNotExist, setCardNotExits] = useState(false);

    const [values, setValues] = useState({
        meeting_ID: props.meetId,
        meet_Title: props.meetTitle,
        meet_Date: props.meetDate,
        stu_CardNumbers: "",
        stu_Fnames: "",
        stu_Sexs: "",
        stu_Programs: ""
    });

    // Retrieve Student Data.
    useEffect(()=>{
        socket.on('cardScanned', (data) => {
          if(data.uid != ''){
            socket.emit('get_Student', (data.uid));
            socket.on('rt_Student', (data)=>{
                if(data == null){
                    setViewInfoCard(false);
                    setCardNotExits(true);   
                }else{
                    setCardNotExits(false)
                    setViewInfoCard(true);
                    setValues({...values, stu_CardNumbers : data.stu_CardNumber, stu_Fnames : data.stu_Fname, stu_Sexs : data.stu_Sex, stu_Programs : data.stu_Program});  
                }        
            })         
          }
        });

        return ()=>{
          socket.off('cardScanned');
          socket.off('rt_Student');
        };
    }, []);

    // Submit Attendance Log Data.
    const handleSubmit = async () =>{
        try{
            await axios.post("http://localhost:7000/attendanceSubmit", values);
            window.location.reload();
        }catch(error){ console.log(error)}
    };

    return(
    <>
        <button className='la_mainbutton' onClick={() =>{setOpenLogAttendance(!openLogAttendance)}}>
            <img src="/svgopen.svg"/> Open Scanner
        </button>

        {openLogAttendance &&(
        <>
            <div className='all_overlay'>
                <div className='la_scannermodalwrapper'>
                    <div className='la_scannermainwrapper'>

                        <div className='la_scannernotifwrapper'>
                            {viewInfoCard &&(
                            <>
                                <div className="la_designmainwrapperconfirm">
                                    <div className="la_designsubwrapperconfirm">
                                        <img src="/svglogo.svg"/>
                                    </div>
                                </div>

                                <div style={{"marginBottom": "28px"}}>
                                    <h4>Confirm Information</h4>
                                    <p>Please confirm your data and log attendance.</p>
                                </div>      
                            </>
                            )}

                            {cardNotExist &&(
                            <>
                                <div className="la_designmainwrapper">
                                    <div className="la_designsubwrapper">
                                        <img src="/svglogo.svg"/>
                                    </div>
                                </div>

                                <div style={{"marginBottom": "28px"}}>
                                    <h4>Invalid Card</h4>
                                    <p>Card number not registered.</p>
                                </div>      
                            </>
                            )}

                            {viewInfoCard || cardNotExist ? null : 
                            <>
                                <div>
                                    <h4>Scan RFID Card</h4>
                                    <p>Please tap your card on the scanner.</p>
                                </div>    
                            </>}
                        </div>

                        <div className='la_scannerinfowrapper'>
                            <div className='la_scannerinfoheader'>
                                <div className='la_scannerheadertop'>
                                    <div>
                                        <h2>{props.meetTitle}</h2>
                                        <p>Event in : {props.meetDate}.</p>
                                    </div>
                                    <button onClick={()=>{window.location.reload(); setOpenLogAttendance(!openLogAttendance);
                                    }}><img src="/svglogout.svg"/></button>
                                </div>

                                {viewInfoCard &&(
                                <>
                                    <div className='la_scanneruserinfo'>
                                        <h3>CN : <span style={{"color": "#72B879"}}>{values.stu_CardNumbers}</span></h3>
                                        <div>
                                            <h4>{values.stu_Fnames}</h4>
                                            <p>{values.stu_Programs}</p>
                                        </div>
                                    </div>
                                </>
                                )}
                            </div>

                            <div className='la_scannerinfofooter'>
                                <button onClick={()=>{ setOpenLogAttendance(!openLogAttendance);}}>Cancel</button>
                                {viewInfoCard &&(
                                <>
                                    <button onClick={()=> handleSubmit()}>Log Attendance</button>
                                </>
                                )}    
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
        )}
    </>
    );
}

export default LogAttendance;