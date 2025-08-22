import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Box,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TextField,
    TableRow,
    MenuItem
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Search from '@mui/icons-material/Search';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ListAltIcon from "@mui/icons-material/ListAlt";
import io from 'socket.io-client';

const tabs = [
    { label: "Applicant Form", to: "/admin_dashboard1", icon: <PersonIcon /> },
    { label: "Documents Submitted", to: "/student_requirements", icon: <DescriptionIcon /> },
    { label: "Admission Exam", to: "/assign_entrance_exam", icon: <AssignmentIcon /> },
    { label: "Interview", to: "/interview", icon: <RecordVoiceOverIcon /> },
    { label: "Qualifying Exam", to: "/qualifying_exam", icon: <SchoolIcon /> },
    { label: "College Approval", to: "/college_approval", icon: <CheckCircleIcon /> },
    { label: "Medical Clearance", to: "/medical_clearance", icon: <LocalHospitalIcon /> },
    { label: "Applicant Status", to: "/applicant_status", icon: <HowToRegIcon /> },
    { label: "View List", to: "/applicant_list", icon: <ListAltIcon /> },
];

const Interview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(3);
    const [clickedSteps, setClickedSteps] = useState(Array(tabs.length).fill(false));


    const handleStepClick = (index, to) => {
        setActiveStep(index);
        navigate(to); // this will actually change the page
    };
    const [uploads, setUploads] = useState([]);
    const [persons, setPersons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFiles, setSelectedFiles] = useState({});
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [remarksMap, setRemarksMap] = useState({});
    const [userID, setUserID] = useState("");
    const [user, setUser] = useState("");
    const [userRole, setUserRole] = useState("");
    const [person, setPerson] = useState({
        profile_img: "",
        last_name: "",
        first_name: "",
        middle_name: "",
        extension: "",
    });
    const [editingRemarkId, setEditingRemarkId] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    // New state
    const [fetchedInterview, setFetchedInterview] = useState(null);

    const fetchInterviewData = async (applicant_number) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/interview/${applicant_number}`);
            if (res.data) {
                setFetchedInterview(res.data);
                setInterviewData(res.data);
                setOriginalData(res.data);
            } else {
                setFetchedInterview(null);
            }
        } catch (err) {
            console.error("❌ Failed to fetch interview:", err);
        }
    };

    // when a person is selected
    useEffect(() => {
        if (selectedPerson?.applicant_number) {
            fetchInterviewData(selectedPerson.applicant_number);
        }
    }, [selectedPerson]);


    useEffect(() => {
        // Load saved notifications from DB on first load
        axios.get("http://localhost:5000/api/notifications")
            .then(res => {
                setNotifications(res.data.map(n => ({
                    ...n,
                    timestamp: n.timestamp
                })));
            })
            .catch(err => console.error("Failed to load saved notifications:", err));
    }, []);


    useEffect(() => {
        const socket = io("http://localhost:5000");
        socket.on("notification", (data) => {
            setNotifications((prev) => [data, ...prev]);
        });
        return () => socket.disconnect();
    }, []);


    useEffect(() => {
        if (editingRemarkId !== null) {
            const stillEditing = uploads.find((u) => u.upload_id === editingRemarkId);
            if (stillEditing?.remarks === remarksMap[editingRemarkId]) {
                setEditingRemarkId(null); // reset only when new data matches
            }
        }
    }, [uploads]);



    useEffect(() => {
        const storedUser = localStorage.getItem("email");
        const storedRole = localStorage.getItem("role");
        const storedID = localStorage.getItem("person_id");

        if (storedUser && storedRole && storedID) {
            setUser(storedUser);
            setUserRole(storedRole);
            setUserID(storedID);

            if (storedRole === "registrar") {

                if (storedID !== "undefined") {

                } else {
                    console.warn("Stored person_id is invalid:", storedID);
                }
            } else {
                window.location.href = "/login";
            }
        } else {
            window.location.href = "/login";
        }
    }, []);


    useEffect(() => {
        fetchPersons();
    }, []);


    const fetchUploadsByApplicantNumber = async (applicant_number) => {
        if (!applicant_number) return;
        try {
            const res = await axios.get(`http://localhost:5000/uploads/by-applicant/${applicant_number}`);
            // ✅ filter only vaccine uploads
            const vaccineUploads = res.data.filter(u =>
                u.description.toLowerCase().includes("vaccine")
            );
            setUploads(vaccineUploads);
        } catch (err) {
            console.error('Fetch uploads failed:', err);
        }
    };





    const fetchPersonData = async (personID) => {
        if (!personID || personID === "undefined") {
            console.warn("Invalid personID for person data:", personID);
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/api/person/${personID}`);

            const safePerson = {
                ...res.data,
                document_status: res.data.document_status || "On process", // set default here
            };
            setPerson(safePerson);

        } catch (error) {
            console.error("❌ Failed to fetch person data:", error?.response?.data || error.message);
        }
    };


    useEffect(() => {
        if (selectedPerson?.person_id) {
            fetchPersonData(selectedPerson.person_id);
        }
    }, [selectedPerson]);

    const [examData, setExamData] = useState([]);
    // scores + percentages
    const [totalScore, setTotalScore] = useState(0);
    const [totalPercentage, setTotalPercentage] = useState(0);
    const [avgScore, setAvgScore] = useState(0);
    const [avgPercentage, setAvgPercentage] = useState(0);


    useEffect(() => {
        if (!searchQuery.trim()) {
            // empty search input: clear everything
            setSelectedPerson(null);
            setPerson({
                profile_img: "",
                generalAverage1: "",
                height: "",
                applyingAs: "",
                document_status: "",
                last_name: "",
                first_name: "",
                middle_name: "",
                extension: "",
            });
            // reset exam data
            setExamData([
                { TestArea: "English", RawScore: "", Percentage: "", User: "", DateCreated: "" },
                { TestArea: "Science", RawScore: "", Percentage: "", User: "", DateCreated: "" },
                { TestArea: "Filipino", RawScore: "", Percentage: "", User: "", DateCreated: "" },
                { TestArea: "Math", RawScore: "", Percentage: "", User: "", DateCreated: "" },
                { TestArea: "Abstract", RawScore: "", Percentage: "", User: "", DateCreated: "" },
            ]);
            return;
        }

        const match = persons.find((p) =>
            `${p.first_name} ${p.middle_name} ${p.last_name} ${p.emailAddress} ${p.applicant_number || ''}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );

        if (match) {
            setSelectedPerson(match);
        } else {
            // no match found: clear all
            setSelectedPerson(null);
            setPerson({
                profile_img: "",
                generalAverage1: "",
                height: "",
                applyingAs: "",
                document_status: "",
                last_name: "",
                first_name: "",
                middle_name: "",
                extension: "",
            });

            setExamData([
                { TestArea: "English", RawScore: "", Percentage: "", User: "", DateCreated: "" },
                { TestArea: "Science", RawScore: "", Percentage: "", User: "", DateCreated: "" },
                { TestArea: "Filipino", RawScore: "", Percentage: "", User: "", DateCreated: "" },
                { TestArea: "Math", RawScore: "", Percentage: "", User: "", DateCreated: "" },
                { TestArea: "Abstract", RawScore: "", Percentage: "", User: "", DateCreated: "" },
            ]);

            setTotalScore(0);
            setTotalPercentage(0);
            setAvgScore(0);
            setAvgPercentage(0);
        }
    }, [searchQuery, persons]);


    const fetchPersons = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/upload_documents');
            setPersons(res.data);
        } catch (err) {
            console.error('Error fetching persons:', err);
        }
    };

    const handleStatusChange = async (uploadId, remarkValue) => {
        const remarks = remarksMap[uploadId] || ""; // get remarks for this upload ID

        try {
            await axios.put(`http://localhost:5000/uploads/remarks/${uploadId}`, {
                status: remarkValue,   // keep it as number now
                remarks: remarks,
            });

            if (selectedPerson?.applicant_number) {
                await fetchUploadsByApplicantNumber(selectedPerson.applicant_number);
                setEditingRemarkId(null);
            }
        } catch (err) {
            console.error('Error updating Status:', err);
        }
    };


    // Add state at top of Interview component
    const [interviewData, setInterviewData] = useState({
        entrance_exam_interviewer: "",
        college_interviewer: "",
        entrance_exam_score: 0,
        college_exam_score: 0,
        status: "",
        custom_status: "",
        remarks: ""
    });


    const [originalData, setOriginalData] = useState(interviewData);

    const handleInterviewChange = (e) => {
        const { name, value } = e.target;
        setInterviewData(prev => ({ ...prev, [name]: value }));
    };

    const saveInterview = async () => {
        try {
            if (!selectedPerson?.applicant_number) {
                alert("❌ Please select a valid applicant first.");
                return;
            }

            // ✅ Correct payload field names matching backend
            const payload = {
                applicant_number: selectedPerson.applicant_number,
                entrance_exam_interviewer: interviewData.entrance_exam_interviewer,
                college_interviewer: interviewData.college_interviewer,
                entrance_exam_score: interviewData.entrance_exam_score,
                college_exam_score: interviewData.college_exam_score,
                total_score:
                    (Number(interviewData.entrance_exam_score) +
                        Number(interviewData.college_exam_score)) /
                    2,
                status: interviewData.status,
                custom_status: interviewData.custom_status,
                remarks: interviewData.remarks,
            };

            await axios.post("http://localhost:5000/api/interview", payload);
            alert("✅ Interview saved successfully!");

            setOriginalData(interviewData);
            setFetchedInterview(interviewData);
        } catch (error) {
            console.error("❌ Error saving interview:", error);
            alert("Failed to save interview.");
        }
    };







    return (
        <Box sx={{ height: 'calc(100vh - 150px)', overflowY: 'auto', paddingRight: 1 }}>
            <Box sx={{ px: 2 }}>
                <Box sx={{ position: 'absolute', top: 10, right: 24 }}>
                    <Button
                        sx={{ width: 65, height: 65, borderRadius: '50%', '&:hover': { backgroundColor: '#E8C999' } }}
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <NotificationsIcon sx={{ fontSize: 50, color: 'white' }} />
                        {notifications.length > 0 && (
                            <Box sx={{
                                position: 'absolute', top: 5, right: 5,
                                background: 'red', color: 'white',
                                borderRadius: '50%', width: 20, height: 20,
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontSize: '12px'
                            }}>
                                {notifications.length}
                            </Box>
                        )}
                    </Button>

                    {showNotifications && (
                        <Paper sx={{
                            position: 'absolute',
                            top: 70, right: 0,
                            width: 300, maxHeight: 400,
                            overflowY: 'auto',
                            bgcolor: 'white',
                            boxShadow: 3,
                            zIndex: 10,
                            borderRadius: 1
                        }}>
                            {notifications.length === 0 ? (
                                <Typography sx={{ p: 2 }}>No notifications</Typography>
                            ) : (
                                notifications.map((notif, idx) => (
                                    <Box key={idx} sx={{ p: 1, borderBottom: '1px solid #ccc' }}>
                                        <Typography sx={{ fontSize: '14px' }}>{notif.message}</Typography>
                                        <Typography sx={{ fontSize: '10px', color: '#888' }}>
                                            {new Date(notif.timestamp).toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}
                                        </Typography>
                                    </Box>
                                ))
                            )}
                        </Paper>
                    )}
                </Box>

                {/* Top header: DOCUMENTS SUBMITTED + Search */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        mt: 2,
                        mb: 2,
                        px: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            color: 'maroon',
                            fontSize: '36px',
                        }}
                    >
                        INTERVIEW
                    </Typography>

                    <TextField
                        variant="outlined"
                        placeholder="Search Applicant Name / Email / Applicant ID"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
                        sx={{ width: { xs: '100%', sm: '425px' }, mt: { xs: 2, sm: 0 } }}
                    />
                </Box>

                <hr style={{ border: "1px solid #ccc", width: "100%" }} />
                <br />


                <Box sx={{ display: "flex", justifyContent: "center", width: "100%",  flexWrap: "wrap" }}>
                    {tabs.map((tab, index) => (
                        <React.Fragment key={index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    m: 1,
                                }}
                                onClick={() => handleStepClick(index, tab.to)}
                            >
                                <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        backgroundColor: activeStep === index ? "#6D2323" : "#E8C999",
                                        color: activeStep === index ? "#fff" : "#000",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {tab.icon}
                                </Box>
                                <Typography
                                    sx={{
                                        mt: 1,
                                        color: activeStep === index ? "#6D2323" : "#000",
                                        fontWeight: activeStep === index ? "bold" : "normal",
                                        fontSize: 12,
                                        textAlign: "center",
                                        width: 80,
                                    }}
                                >
                                    {tab.label}
                                </Typography>
                            </Box>

                            {index < tabs.length - 1 && (
                                <Box
                                    sx={{
                                        flex: 1,
                                        height: "2px",
                                        backgroundColor: "#6D2323",
                                        alignSelf: "center",
                                    }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </Box>
                <br />
                {/* Applicant ID and Name */}
                <TableContainer component={Paper} sx={{ width: '100%', border: "1px solid maroon" }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#6D2323', }}>
                            <TableRow>
                                {/* Left cell: Applicant ID */}
                                <TableCell sx={{ color: 'white', fontSize: '20px', fontFamily: 'Arial Black', border: 'none' }}>
                                    Applicant ID:&nbsp;
                                    <span style={{ fontFamily: "Arial", fontWeight: "normal", textDecoration: "underline" }}>
                                        {selectedPerson?.applicant_number || "N/A"}
                                    </span>
                                </TableCell>

                                {/* Right cell: Applicant Name, right-aligned */}
                                <TableCell
                                    align="right"
                                    sx={{ color: 'white', fontSize: '20px', fontFamily: 'Arial Black', border: 'none' }}
                                >
                                    Applicant Name:&nbsp;
                                    <span style={{ fontFamily: "Arial", fontWeight: "normal", textDecoration: "underline" }}>
                                        {selectedPerson?.last_name?.toUpperCase()}, {selectedPerson?.first_name?.toUpperCase()}{" "}
                                        {selectedPerson?.middle_name?.toUpperCase()} {selectedPerson?.extension_name?.toUpperCase() || ""}
                                    </span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>

                <TableContainer component={Paper} sx={{ width: "100%", border: "2px solid maroon" }}>
                    {/* Header Row: Centered Title + Right-aligned Photo */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            p: 2,
                        }}
                    >
                        {/* Centered Title */}
                        <Typography
                            sx={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                fontFamily: "Arial",
                                color: "maroon",
                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            Interview
                        </Typography>

                        {/* Photo on the right */}
                        {person.profile_img && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 16,
                                    top: "165%",
                                    transform: "translateY(-50%)",
                                    width: "2.10in",
                                    height: "2.10in",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={`http://localhost:5000/uploads/${person.profile_img}`}
                                    alt="Profile"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </Box>
                        )}
                    </Box>

                    <div style={{ height: "175px" }}></div>

                    {/* ===== Form Section ===== */}
                    <Box sx={{ borderTop: "2px solid maroon", p: 2 }}>
                        {/* Entrance Exam Interviewer */}
                        <TextField
                            fullWidth
                            multiline
                            label="Entrance Exam Interview"
                            name="entrance_exam_interviewer"
                            value={interviewData.entrance_exam_interviewer}
                            onChange={handleInterviewChange}
                            sx={{ mb: 2 }}
                        />

                        {/* College Interviewer */}
                        <TextField
                            fullWidth
                            multiline
                            label="College Interviewer"
                            name="college_interviewer"
                            value={interviewData.college_interviewer}
                            onChange={handleInterviewChange}
                            sx={{ mb: 2 }}
                        />

                        {/* Scores */}
                        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            <TextField
                                type="number"
                                label="Entrance Exam Score (0-100)"
                                name="entrance_exam_score"
                                value={interviewData.entrance_exam_score || 0}
                                onChange={handleInterviewChange}
                            />
                            <TextField
                                type="number"
                                label="College Exam Score (0-100)"
                                name="college_exam_score"
                                value={interviewData.college_exam_score || 0}
                                onChange={handleInterviewChange}
                            />
                            <TextField

                                label="Total Score (Average)"
                                value={
                                    (Number(interviewData.entrance_exam_score || 0) +
                                        Number(interviewData.college_exam_score || 0)) / 2
                                }
                            />
                        </Box>

                        {/* Status */}
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={interviewData.status}
                            onChange={handleInterviewChange}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="PASSED">PASSED</MenuItem>
                            <MenuItem value="Proceed to College Interview (College/Program will post the schedule of the Interview)">
                                Proceed to College Interview (College/Program will post the schedule of the Interview)
                            </MenuItem>
                            <MenuItem value="FAILED, Sorry, you did not meet the minimum score for the entrance exam">
                                FAILED, Sorry, you did not meet the minimum score for the entrance exam
                            </MenuItem>
                            <MenuItem value="FAILED">FAILED</MenuItem>
                            <MenuItem value="WAIT, For further instructions">WAIT</MenuItem>
                            <MenuItem value="PASSED FAILED">PASSED FAILED</MenuItem>
                            <MenuItem value="CUSTOM">Custom</MenuItem>
                        </TextField>

                        {/* Custom Status */}
                        {interviewData.status === "CUSTOM" && (
                            <TextField
                                fullWidth
                                label="Custom Status"
                                name="custom_status"
                                value={interviewData.custom_status}
                                onChange={handleInterviewChange}
                                sx={{ mb: 2 }}
                            />
                        )}

                        {/* Remarks */}
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Remarks"
                            name="remarks"
                            value={interviewData.remarks}
                            onChange={handleInterviewChange}
                            sx={{ mb: 2 }}
                        />

                        {/* Buttons */}
                        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            <Button variant="contained" color="error" onClick={() => setInterviewData({})}>
                                Reset
                            </Button>
                            <Button variant="contained" color="success" onClick={saveInterview}>
                                Save
                            </Button>


                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => setInterviewData(originalData)}
                            >
                                Cancel
                            </Button>
                        </Box>


                    </Box>
                </TableContainer>



                <>




                </>

            </Box >
        </Box >
    );
};

export default Interview;