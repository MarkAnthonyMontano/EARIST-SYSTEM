import { useEffect, useState } from 'react';
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

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import io from 'socket.io-client';

const tabs = [
    { label: "Applicant Form", to: "/admin_dashboard1" },
    { label: "Documents Submitted", to: "/student_requirements" },
    { label: "Admission Exam", to: "/assign_entrance_exam" },
    { label: "Interview", to: "/interview" },
    { label: "Qualifying Exam", to: "/qualifying_exam" },
    { label: "College Approval", to: "/college_approval" },
    { label: "Medical Clearance", to: "/medical_clearance" },
    { label: "Applicant Status", to: "/applicant_status" },
    { label: "View List", to: "/view_list" },
];

const Interview = () => {
    const location = useLocation();
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

        document_status: "",
        last_name: "",
        first_name: "",
        middle_name: "",
        extension: "",
    });
    const [editingRemarkId, setEditingRemarkId] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

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




    useEffect(() => {
        if (!searchQuery.trim()) {
            setSelectedPerson(null);
            setUploads([]);
            setSelectedFiles({});
            setPerson({   // clear person data too
                profile_img: "",
                generalAverage1: "",
                height: "",
                applyingAs: "",
                document_status: "On Process",
                last_name: "",
                first_name: "",
                middle_name: "",
                extension: "",
            });
            return;
        }

        const match = persons.find((p) =>
            `${p.first_name} ${p.middle_name} ${p.last_name} ${p.emailAddress} ${p.applicant_number || ''}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );

        if (match) {
            setSelectedPerson(match);
            fetchUploadsByApplicantNumber(match.applicant_number);
        } else {
            setSelectedPerson(null);
            setUploads([]);
            setPerson({   // also clear if no match
                profile_img: "",

                document_status: "On Process",
                last_name: "",
                first_name: "",
                middle_name: "",
                extension: "",
            });
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
        user: user || "",
        status: "",
        custom_status: "",
        remarks: ""
    });

    const [originalData, setOriginalData] = useState(interviewData);

    const handleInterviewChange = (e) => {
        const { name, value } = e.target;
        setInterviewData(prev => ({ ...prev, [name]: value }));
    };

    // Save Interview
    const saveInterview = async () => {
        try {
            await axios.post("http://localhost:5000/api/interview/save", {
                ...interviewData,
                applicant_id: selectedPerson?.applicant_number,
                person_id: selectedPerson?.person_id
            });
            alert("✅ Interview Saved!");
        } catch (err) {
            console.error(err);
            alert("❌ Failed to save interview");
        }
    };


    const renderRow = (doc) => {
        const uploaded = uploads.find((u) =>
            u.description.toLowerCase().includes(doc.label.toLowerCase())
        );

        const buttonStyle = {
            minWidth: 120,
            height: 40,
            fontWeight: 'bold',
            fontSize: '14px',
            textTransform: 'none',
        };



        return (
            <TableRow key={doc.key}>
                <TableCell sx={{ fontWeight: 'bold', width: '20%', border: "1px solid maroon" }}>{doc.label}</TableCell>

                <TableCell sx={{ width: '20%', border: "1px solid maroon" }}>
                    {editingRemarkId === uploaded?.upload_id ? (
                        newRemarkMode[uploaded.upload_id] ? (
                            // === Free-text editor mode ===
                            <TextField
                                size="small"
                                fullWidth
                                autoFocus
                                placeholder="Enter custom remark"
                                value={remarksMap[uploaded.upload_id] || ""}
                                onChange={(e) =>
                                    setRemarksMap((prev) => ({
                                        ...prev,
                                        [uploaded.upload_id]: e.target.value,
                                    }))
                                }
                                onBlur={async () => {
                                    const finalRemark = (remarksMap[uploaded.upload_id] || "").trim();
                                    if (finalRemark) {
                                        await handleSaveRemarks(uploaded.upload_id);
                                    }
                                    setNewRemarkMode((prev) => ({ ...prev, [uploaded.upload_id]: false }));
                                }}
                                onKeyDown={async (e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        const finalRemark = (remarksMap[uploaded.upload_id] || "").trim();
                                        if (finalRemark) {
                                            await handleSaveRemarks(uploaded.upload_id);
                                        }
                                        setNewRemarkMode((prev) => ({ ...prev, [uploaded.upload_id]: false }));
                                    }
                                }}
                            />
                        ) : (
                            // === Predefined dropdown mode ===
                            <TextField
                                select
                                size="small"
                                fullWidth
                                autoFocus
                                value={remarksMap[uploaded.upload_id] ?? uploaded?.remarks ?? ""}
                                onChange={async (e) => {
                                    const value = e.target.value;
                                    if (value === "__NEW__") {
                                        // Switch to text mode; don't store the marker
                                        setNewRemarkMode((prev) => ({ ...prev, [uploaded.upload_id]: true }));
                                        // If there was a previous preset value, keep it until they type
                                        setRemarksMap((prev) => ({
                                            ...prev,
                                            [uploaded.upload_id]: (prev[uploaded.upload_id] ?? uploaded?.remarks ?? "")
                                        }));
                                        return;
                                    }
                                    // Normal preset value → save immediately
                                    setRemarksMap((prev) => ({ ...prev, [uploaded.upload_id]: value }));
                                    await handleSaveRemarks(uploaded.upload_id);
                                }}
                                SelectProps={{
                                    MenuProps: { PaperProps: { style: { maxHeight: 200 } } },
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select Remarks</em>
                                </MenuItem>
                                {remarksOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                                {/* Trigger for custom text */}
                                <MenuItem value="__NEW__">New Remarks</MenuItem>
                            </TextField>
                        )
                    ) : (
                        // === Display mode ===
                        <Box
                            onClick={() => {
                                setEditingRemarkId(uploaded.upload_id);
                                setNewRemarkMode((prev) => ({ ...prev, [uploaded.upload_id]: false }));
                                setRemarksMap((prev) => ({
                                    ...prev,
                                    [uploaded.upload_id]: uploaded?.remarks || "",
                                }));
                            }}
                            sx={{
                                cursor: "pointer",
                                fontStyle: uploaded?.remarks ? "normal" : "italic",
                                color: uploaded?.remarks ? "inherit" : "#888",
                                minHeight: "40px",
                                display: "flex",
                                alignItems: "center",
                                px: 1,
                            }}
                        >
                            {uploaded?.remarks || "Click to add remarks"}
                        </Box>
                    )}
                </TableCell>





                <TableCell align="center" sx={{ width: '15%', border: "1px solid maroon" }}>
                    {uploaded ? (
                        uploaded.status === 1 ? (
                            <Box
                                sx={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    borderRadius: 1,
                                    width: 140,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                }}
                            >
                                <Typography sx={{ fontWeight: 'bold' }}>Verified</Typography>
                            </Box>
                        ) : uploaded.status === 2 ? (
                            <Box
                                sx={{
                                    backgroundColor: '#F44336',
                                    color: 'white',
                                    borderRadius: 1,
                                    width: 140,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                }}
                            >
                                <Typography sx={{ fontWeight: 'bold' }}>Rejected</Typography>
                            </Box>
                        ) : (
                            <Box display="flex" justifyContent="center" gap={1}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleStatusChange(uploaded.upload_id, '1')}
                                    sx={{ ...buttonStyle, backgroundColor: 'green', color: 'white' }}
                                >
                                    Verified
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleStatusChange(uploaded.upload_id, '2')}
                                    sx={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}
                                >
                                    Rejected
                                </Button>
                            </Box>
                        )
                    ) : null}
                </TableCell>

                <TableCell style={{ border: "1px solid maroon" }}>
                    {uploaded?.created_at &&
                        new Date(uploaded.created_at).toLocaleString('en-PH', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                            timeZone: 'Asia/Manila',
                        })}
                </TableCell>

                <TableCell style={{ border: "1px solid maroon" }}>
                    {selectedPerson
                        ? `[${selectedPerson.applicant_number}] ${selectedPerson.last_name?.toUpperCase()}, ${selectedPerson.first_name?.toUpperCase()} ${selectedPerson.middle_name?.toUpperCase() || ''} ${selectedPerson.extension?.toUpperCase() || ''}`
                        : ''}
                </TableCell>

                <TableCell style={{ border: "1px solid maroon" }}>
                    <Box display="flex" justifyContent="center" gap={1}>
                        {uploaded ? (
                            <>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#006400'
                                        }
                                    }}
                                    onClick={() => {
                                        setEditingRemarkId(uploaded.upload_id);
                                        setRemarksMap((prev) => ({
                                            ...prev,
                                            [uploaded.upload_id]: uploaded.remarks || "",
                                        }));
                                    }}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#1976d2', color: 'white' }}
                                    href={`http://localhost:5000${uploaded.file_path}`}
                                    target="_blank"
                                >
                                    Preview
                                </Button>

                                <Button
                                    onClick={() => handleDelete(uploaded.upload_id)}
                                    sx={{
                                        backgroundColor: 'maroon',
                                        color: 'white',
                                        '&:hover': { backgroundColor: '#600000' },
                                    }}
                                >
                                    Delete
                                </Button>

                            </>
                        ) : null}
                    </Box>
                </TableCell>

            </TableRow>

        );
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

                <Box display="flex" sx={{ border: "2px solid maroon", borderRadius: "4px", overflow: "hidden" }}>
                    {tabs.map((tab, index) => {
                        const isActive = location.pathname === tab.to; // check active route

                        return (
                            <Link
                                key={index}
                                to={tab.to}
                                style={{ textDecoration: "none", flex: 1 }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: isActive ? "#6D2323" : "white", // active tab bg
                                        padding: "16px",
                                        height: "75px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        borderRight: index !== tabs.length - 1 ? "2px solid maroon" : "none",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "#6D2323",
                                            "& .MuiTypography-root": {
                                                color: "white",
                                            },
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: isActive ? "white" : "maroon", // active tab text
                                            fontWeight: "bold",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {tab.label}
                                    </Typography>
                                </Box>
                            </Link>
                        );
                    })}
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

                <TableContainer component={Paper} sx={{ width: '100%', border: "2px solid maroon" }}>
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
                    {/* Form Section */}
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
                                disabled
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
                            <MenuItem value="PASSED">PASSED</MenuItem>
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
                        <Box sx={{ display: "flex", gap: 2 }}>
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