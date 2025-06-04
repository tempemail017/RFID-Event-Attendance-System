import cors from 'cors';
import mysql from 'mysql2';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const server = express();
const serverPort = "7000";
const httpServer = createServer(server);

server.use(express.json());
server.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Application Web Socket.
const io = new Server(httpServer, {cors: {origin: '*'}});

// Application Server & Database.
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db-eventattendance",
});

db.connect((error)=>{
    if(error){console.log("Database Not Connected.")}
    else{
        httpServer.listen(serverPort, ()=>{
        console.log("Database Connected.");
        console.log("The server is listening.");})
    }
})

// Serial Hardware & Parser Configuration.
const serialHardware = new SerialPort({
  path: 'COM3',  
  baudRate: 9600,
});

const serialParser = serialHardware.pipe(new ReadlineParser({
    delimiter: '\n' 
}));

serialParser.on('data', (line) =>{
  const hardwareData = line.trim();
  console.log(hardwareData);
  io.emit('cardScanned', {uid: hardwareData});
});

// EP Admin Login
server.post('/loginAdmin', (req, res)=>{
    const sql = 'SELECT * FROM admin WHERE ad_Username = ? AND ad_Password = ?';
    const values = [req.body.ad_Username, req.body.ad_Password];

    db.query(sql, [...values], (error, result)=>{
        if(error){return res.json({Status: false, Error: "Log In Failed."})}

        if(result.length > 0){
            return res.status(200).json({Status: true, Success: "Log In Successful."});
        }else{return res.json({Status: false, Error: "Invalid Credentials."})}
    })
})


// EP Meeting Retrieval, Generation, Modification, and Deletion.
server.get('/meetingRetrieve', (req, res) =>{
    const sql = "SELECT * FROM meetings";

    db.query(sql, (error, result)=>{
        if(error){return res.status(400).json({Status: false, Error: "Meeting Retrieval Failed."})}
        return res.status(200).json(result);
    })
})

server.get('/meetingRetrieve/:id', (req, res) =>{
    const sql = "SELECT * FROM meetings WHERE id = ?";
    const meetingID = req.params.id;

    db.query(sql, meetingID, (error, result)=>{
        if(error){return res.status(400).json({Status: false, Error: "Meeting Retrieval Failed."})}
        return res.status(200).json(result);
    })
})

server.post('/meetingCreate', (req, res)=>{
    const sql = "INSERT INTO meetings (`meet_Title`, `meet_Date`, `meet_Status`) VALUES(?)";
    const values = [req.body.meetTitle, req.body.meetDate, req.body.meetStatus];

    db.query(sql, [values], (error, result)=>{
        if(error){return res.status(400).json({Status: false, Error: "Meeting Creation Failed."})}
        return res.status(200).json({Status: true, Success: "Meeting Created."})
    })
})

server.put('/meetingUpdate/:id', (req, res) =>{
    const sql = "UPDATE meetings SET `meet_Title` = ?, `meet_Date` = ?, `meet_Status` = ? WHERE id = ?";
    const meetingID = req.params.id;
    const values = [
        req.body.meet_Title,
        req.body.meet_Date,
        req.body.meet_Status
    ];

    db.query(sql, [...values, meetingID], (error, result)=>{
        if(error){return res.status(400).json({Status: false, Error: "Meeting Update Failed."})}
        return res.status(200).json({Status: true, Success: "Meeting Update Complete."});
    })
})

server.delete('/meetingDelete/:id', (req, res)=>{
    const sql = "DELETE FROM meetings WHERE id = ?";
    const meetingID = req.params.id;

    db.query(sql, [meetingID], (error, result)=>{
        if(error){return res.status(400).json({Status: false, Error: "Meeting Deletion Failed."})}
        return res.status(200).json({Status: true, Success: "Meeting Deleted."});
    })
})

// EP Attendance Log Retrieval, Submission, and Deletion.
server.get('/attendanceRetrieve/:id', (req, res)=>{
    const sql = "SELECT * FROM attendancelogs WHERE meet_Id = ?";
    const attendanceID = req.params.id;

    db.query(sql, attendanceID, (error, result)=>{
        if(error){return res.status(400).json({Status: false, Error: "Attendance Log Retrieval Failed."})}
        return res.status(200).json(result);
    })
})

server.post('/attendanceSubmit', (req, res)=>{
    const sql = "INSERT INTO attendancelogs (`meet_Id`, `meet_Title`, `meet_Date`, `stu_CardNumber`, `stu_Fname`, `stu_Sex`, `stu_Program`) VALUES(?)";
    const values = [
        req.body.meeting_ID,
        req.body.meet_Title,
        req.body.meet_Date,
        req.body.stu_CardNumbers,
        req.body.stu_Fnames,
        req.body.stu_Sexs,
        req.body.stu_Programs
    ]

    db.query(sql, [values], (error, result)=>{
        if(error){return res.status(400).json({Status: false, Error: "Attendance Submission Failed."})}
        return res.status(200).json({Status: true, Success: "Attendance Submitted."});
    })
})

server.delete('/attendanceDelete/:id', (req, res)=>{
    const sql = "DELETE FROM attendancelogs WHERE id = ?";
    const meetingID = req.params.id;

    db.query(sql, meetingID, (error, result)=>{
        if(error){return res.status(400).json({Status: false, Error: "Attendance Log Deletion Failed."})}
        return res.status(200).json({Status: true, Success: "Attendance Log Deleted."});
    })
})

 // EP Real Time Meetings Retrieval.
const getMeetPublic = () =>{
    let meetingsPublic = [];
    const sql = "SELECT * FROM meetings WHERE meet_Status = 'Public'";

    db.query(sql, (error, result)=>{
        if(error){console.log("Meeting Retrieval Failed.")}
        meetingsPublic = result;
        io.emit("rt_meetPublic", meetingsPublic);
    })
}

setInterval(getMeetPublic, 500);
getMeetPublic();

// EP Real Time Student Data Retrieval.
io.on("connection", (io)=>{
  io.on("get_Student", (stu_CardNumber)=>{
    const sql = "SELECT * FROM students WHERE stu_CardNumber = ?";

    db.query(sql, [stu_CardNumber], (error, result) =>{
        if(error){io.emit("rt_Student", result[0])}
        io.emit("rt_Student", result[0]);
    });
  });
})
