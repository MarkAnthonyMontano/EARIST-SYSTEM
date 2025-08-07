import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    FormControl,
    Select,
    TableCell,
    TextField,
    MenuItem,
    InputLabel,
    TableBody,

} from '@mui/material';
import { Search } from '@mui/icons-material';
import { io } from "socket.io-client";
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';

const socket = io("http://localhost:5000");

const ApplicantList = () => {
    const navigate = useNavigate();
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [assignedNumber, setAssignedNumber] = useState('');

    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });
    const [person, setPerson] = useState({
        campus: "",
        last_name: "",
        first_name: "",
        middle_name: "",
        extension: "",
        generalAverage1: "",
        program: "",
        created_at: "",

    });



    useEffect(() => {
        // Replace this with your actual API endpoint
        fetch("http://localhost:5000/api/all-applicants")
            .then((res) => res.json())
            .then((data) => setPersons(data)) // ✅ Correct

    }, []);


    const [curriculumOptions, setCurriculumOptions] = useState([]);

    useEffect(() => {
        const fetchCurriculums = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/applied_program");
                console.log("✅ curriculumOptions:", response.data); // <--- add this
                setCurriculumOptions(response.data);
            } catch (error) {
                console.error("Error fetching curriculum options:", error);
            }
        };

        fetchCurriculums();
    }, []);





    const itemsPerPage = 100;
    const filteredPersons = persons.filter((person) => {
        const fullText = `${person.first_name} ${person.middle_name} ${person.last_name} ${person.emailAddress} ${person.applicant_number || ''}`.toLowerCase();
        return fullText.includes(searchQuery.toLowerCase());

    });

    const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPersons = filteredPersons.slice(indexOfFirstItem, indexOfLastItem);

    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage < maxButtonsToShow - 1) {
        startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }

    const fetchApplicantNumber = async (personID) => {
        const res = await axios.get(`http://localhost:5000/api/applicant_number/${personID}`);
        setApplicantID(res.data?.applicant_number || "N/A");
    };



    const fetchPersons = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/persons');
            setPersons(res.data);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        fetch("http://localhost:5000/api/all-applicants") // 👈 This is the new endpoint
            .then((res) => res.json())

            .catch((err) => console.error("Error fetching applicants:", err));
    }, []);



    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    const [selectedSY, setSelectedSY] = useState("2025-2026");
    const [selectedSemester, setSelectedSemester] = useState("First");

    const [selectedApplicantStatus, setSelectedApplicantStatus] = useState("");
    const [selectedRegistrarStatus, setSelectedRegistrarStatus] = useState("");

    const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState("");
    const [selectedProgramFilter, setSelectedProgramFilter] = useState("");
    const [department, setDepartment] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/departments"); // ✅ Update if needed
                setDepartment(response.data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);


    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [filteredPersons.length, totalPages]);

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


    const handleSnackClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnack(prev => ({ ...prev, open: false }));
    };



    return (
        <Box sx={{ height: 'calc(100vh - 150px)', overflowY: 'auto', pr: 1, p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" fontWeight="bold" color="maroon">
                    ADMISSION PROCESS FOR REGISTRAR
                </Typography>
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

                <Box>

                    <TextField
                        variant="outlined"
                        placeholder="Search Applicant Name / Email / Applicant ID"
                        size="small"
                        style={{ width: '500px' }}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // Corrected
                        }}

                        InputProps={{
                            startAdornment: <Search sx={{ mr: 1 }} />,
                        }}
                    />
                </Box>
            </Box>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />
            <br />
            <TableContainer component={Paper} sx={{ width: '100%', border: "2px solid maroon" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#6D2323', }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', textAlign: "Center" }}>Applicantion Date  </TableCell>

                        </TableRow>
                    </TableHead>

                </Table>
            </TableContainer>

            <TableContainer component={Paper} sx={{ width: '100%', border: "2px solid maroon", p: 2 }}>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" rowGap={2}>

                    {/* Left Side: From and To Date (stacked) */}
                    <Box display="flex" flexDirection="column" gap={2}>
                        {/* From Date */}
                        <FormControl size="small">
                            <Typography fontSize={13} sx={{ mb: 1 }}>From Date:</Typography>
                            <TextField
                                type="date"
                                size="small"
                                name="fromDate"
                                value={person.fromDate || ""}

                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>

                        {/* To Date */}
                        <FormControl size="small">
                            <Typography fontSize={13} sx={{ mb: 1 }}>To Date:</Typography>
                            <TextField
                                type="date"
                                size="small"
                                name="toDate"
                                value={person.toDate || ""}

                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>
                    </Box>

                    {/* Right Side: Campus Dropdown with label on top */}
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Typography fontSize={13} sx={{ mb: 1 }}>Campus:</Typography>
                        <FormControl size="small" sx={{ width: "200px" }}>
                            <InputLabel id="campus-label">-Campus-</InputLabel>
                            <Select
                                labelId="campus-label"
                                id="campus-select"
                                name="campus"
                                value={person.campus == null ? "" : String(person.campus)}
                                label="Campus (Manila/Cavite)"

                            >
                                <MenuItem value=""><em>Select Campus</em></MenuItem>
                                <MenuItem value="0">MANILA</MenuItem>
                                <MenuItem value="1">CAVITE</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </Box>
            </TableContainer>


            <TableContainer component={Paper} sx={{ width: '100%', }}>
                <Table size="small">
                    <TableHead sx={{ backgroundColor: '#6D2323', color: "white" }}>
                        <TableRow>
                            <TableCell colSpan={10} sx={{ border: "2px solid maroon", py: 0.5, backgroundColor: '#6D2323', color: "white" }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    {/* Left: Total Count */}
                                    <Typography fontSize="14px" fontWeight="bold" color="white">
                                        Total Applicants: {filteredPersons.length}
                                    </Typography>

                                    {/* Right: Pagination Controls */}
                                    <Box display="flex" alignItems="center" gap={1}>
                                        {/* First & Prev */}
                                        <Button
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                minWidth: 80,
                                                color: "white",
                                                borderColor: "white",
                                                backgroundColor: "transparent",
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&.Mui-disabled': {
                                                    color: "white",
                                                    borderColor: "white",
                                                    backgroundColor: "transparent",
                                                    opacity: 1,
                                                }
                                            }}
                                        >
                                            First
                                        </Button>

                                        <Button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                minWidth: 80,
                                                color: "white",
                                                borderColor: "white",
                                                backgroundColor: "transparent",
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&.Mui-disabled': {
                                                    color: "white",
                                                    borderColor: "white",
                                                    backgroundColor: "transparent",
                                                    opacity: 1,
                                                }
                                            }}
                                        >
                                            Prev
                                        </Button>


                                        {/* Page Dropdown */}
                                        <FormControl size="small" sx={{ minWidth: 80 }}>
                                            <Select
                                                value={currentPage}
                                                onChange={(e) => setCurrentPage(Number(e.target.value))}
                                                displayEmpty
                                                sx={{
                                                    fontSize: '12px',
                                                    height: 36,
                                                    color: 'white',
                                                    border: '1px solid white',
                                                    backgroundColor: 'transparent',
                                                    '.MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'white',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'white',
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'white',
                                                    },
                                                    '& svg': {
                                                        color: 'white', // dropdown arrow icon color
                                                    }
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            maxHeight: 200,
                                                            backgroundColor: '#fff', // dropdown background
                                                        }
                                                    }
                                                }}
                                            >
                                                {Array.from({ length: totalPages }, (_, i) => (
                                                    <MenuItem key={i + 1} value={i + 1}>
                                                        Page {i + 1}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <Typography fontSize="11px" color="white">
                                            of {totalPages} page{totalPages > 1 ? 's' : ''}
                                        </Typography>


                                        {/* Next & Last */}
                                        <Button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                minWidth: 80,
                                                color: "white",
                                                borderColor: "white",
                                                backgroundColor: "transparent",
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&.Mui-disabled': {
                                                    color: "white",
                                                    borderColor: "white",
                                                    backgroundColor: "transparent",
                                                    opacity: 1,
                                                }
                                            }}
                                        >
                                            Next
                                        </Button>

                                        <Button
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                minWidth: 80,
                                                color: "white",
                                                borderColor: "white",
                                                backgroundColor: "transparent",
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&.Mui-disabled': {
                                                    color: "white",
                                                    borderColor: "white",
                                                    backgroundColor: "transparent",
                                                    opacity: 1,
                                                }
                                            }}
                                        >
                                            Last
                                        </Button>
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>






            <TableContainer component={Paper} sx={{ width: '100%', border: "2px solid maroon", p: 2 }}>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" rowGap={3} columnGap={5}>

                    {/* LEFT COLUMN: Sorting & Status Filters */}
                    <Box display="flex" flexDirection="column" gap={2}>

                        {/* Sort By */}
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontSize={13} sx={{ minWidth: "10px" }}>Sort By:</Typography>
                            <FormControl size="small" sx={{ width: "200px" }}>
                                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} displayEmpty>
                                    <MenuItem value="">Select Field</MenuItem>
                                    <MenuItem value="name">Applicant's Name</MenuItem>
                                    <MenuItem value="id">Applicant ID</MenuItem>
                                    <MenuItem value="email">Email Address</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography fontSize={13} sx={{ minWidth: "10px" }}>Sort Order:</Typography>
                            <FormControl size="small" sx={{ width: "200px" }}>
                                <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} displayEmpty>
                                    <MenuItem value="">Select Order</MenuItem>
                                    <MenuItem value="asc">Ascending</MenuItem>
                                    <MenuItem value="desc">Descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>


                        {/* Applicant Status */}
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontSize={13} sx={{ minWidth: "140px" }}>Applicant Status:</Typography>
                            <FormControl size="small" sx={{ width: "275px" }}>
                                <Select
                                    value={selectedApplicantStatus}
                                    onChange={(e) => setSelectedApplicantStatus(e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="">Select status</MenuItem>
                                    <MenuItem value="On process">On process</MenuItem>
                                    <MenuItem value="Documents Verified & ECAT">Documents Verified & ECAT</MenuItem>
                                    <MenuItem value="Disapproved">Disapproved</MenuItem>
                                    <MenuItem value="Program Closed">Program Closed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Registrar Status */}
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontSize={13} sx={{ minWidth: "140px" }}>Registrar Status:</Typography>
                            <FormControl size="small" sx={{ width: "275px" }}>
                                <Select
                                    value={selectedRegistrarStatus}
                                    onChange={(e) => setSelectedRegistrarStatus(e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="">Select status</MenuItem>
                                    <MenuItem value="Enrolled">Enrolled</MenuItem>
                                    <MenuItem value="Unenrolled">Unenrolled</MenuItem>

                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* MIDDLE COLUMN: SY & Semester */}
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontSize={13} sx={{ minWidth: "100px" }}>School Year:</Typography>
                            <FormControl size="small" sx={{ minWidth: 180 }}>
                                <Select value={selectedSY} onChange={(e) => setSelectedSY(e.target.value)} displayEmpty>
                                    <MenuItem value="">Select SY</MenuItem>
                                    <MenuItem value="2025-2026">2025 - 2026</MenuItem>
                                    <MenuItem value="2024-2025">2024 - 2025</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontSize={13} sx={{ minWidth: "100px" }}>Semester:</Typography>
                            <FormControl size="small" sx={{ minWidth: 180 }}>
                                <Select
                                    value={selectedSemester}
                                    onChange={(e) => setSelectedSemester(e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="">Select Semester</MenuItem>
                                    <MenuItem value="First">First</MenuItem>
                                    <MenuItem value="Second">Second</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* RIGHT COLUMN: Department & Program */}
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontSize={13} sx={{ minWidth: "100px" }}>Department:</Typography>
                            <FormControl size="small" sx={{ minWidth: 250 }}>
                                <Select
                                    value={selectedDepartmentFilter}
                                    onChange={(e) => setSelectedDepartmentFilter(e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="">All Departments</MenuItem>
                                    {department.map((dep) => (
                                        <MenuItem key={dep.dprtmnt_id} value={dep.dprtmnt_name}>
                                            {dep.dprtmnt_name} ({dep.dprtmnt_code})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontSize={13} sx={{ minWidth: "100px" }}>Program:</Typography>
                            <FormControl size="small" sx={{ minWidth: 250 }}>
                                <Select
                                    value={selectedProgramFilter}
                                    onChange={(e) => setSelectedProgramFilter(e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="">All Programs</MenuItem>
                                    {curriculumOptions.map((prog) => (
                                        <MenuItem key={prog.curriculum_id} value={prog.program_code}>
                                            {prog.program_code}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
            </TableContainer>



            <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table size="small"> {/* size="small" reduces default padding */}
                    <TableHead sx={{ backgroundColor: '#6D2323' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "2%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>#</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "3%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>Submitted Orig Documents</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "10%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>Applicant ID</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "30%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "10%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>Program</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "6%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>SHS GWA</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "9%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>Date Applied</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "9%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>Date Last Updated</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "10%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>Applicant Status</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: "center", width: "9%", py: 0.5, fontSize: '12px', border: "2px solid maroon", }}>Registrar Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {persons.map((person, index) => (
                            <TableRow key={person.person_id} sx={{ height: '10px' }}>
                                <TableCell sx={{ color: 'black', textAlign: "center", border: "2px solid maroon", py: 0.5, fontSize: '12px' }}>{index + 1}</TableCell>
                                <TableCell sx={{ textAlign: "center", border: "2px solid maroon", py: 0.5 }}>
                                    <input
                                        type="checkbox"
                                        disabled
                                        checked={person.submitted_documents === 1}
                                        style={{ transform: "scale(1.2)", cursor: "default" }}
                                    />
                                </TableCell>

                                <TableCell
                                    sx={{ color: 'blue', textAlign: "center", border: "2px solid maroon", py: 0.5, fontSize: '12px', cursor: 'pointer' }}
                                    onClick={() => navigate(`/admin_dashboard1?person_id=${person.person_id}`)}
                                >
                                    {person.applicant_number ?? "N/A"}
                                </TableCell>

                                <TableCell
                                    sx={{ color: 'blue', textAlign: "left", border: "2px solid maroon", py: 0.5, fontSize: '12px', cursor: 'pointer' }}
                                    onClick={() => navigate(`/admin_dashboard1?person_id=${person.person_id}`)}
                                >
                                    {`${person.last_name}, ${person.first_name} ${person.middle_name ?? ''} ${person.extension ?? ''}`}
                                </TableCell>

                                <TableCell sx={{ color: 'black', textAlign: "center", border: "2px solid maroon", py: 0.5, fontSize: '12px' }}>
                                    {
                                        curriculumOptions.find(
                                            (item) => item.curriculum_id?.toString() === person.program?.toString()
                                        )?.program_code ?? "N/A"
                                    }
                                </TableCell>
                                <TableCell sx={{ color: 'black', textAlign: "center", border: "2px solid maroon", py: 0.5, fontSize: '12px' }}>{person.generalAverage1}</TableCell>
                                <TableCell sx={{ color: 'black', textAlign: "center", border: "2px solid maroon", py: 0.5, fontSize: '12px' }}>{person.created_at}</TableCell>
                                <TableCell sx={{ color: 'black', textAlign: "center", border: "2px solid maroon", py: 0.5, fontSize: '12px' }}>{person.last_updated}</TableCell>
                                <TableCell sx={{ color: 'black', textAlign: "center", border: "2px solid maroon", py: 0.5, fontSize: '12px' }}>{person.applicant_status}</TableCell>
                                <TableCell sx={{ color: 'black', textAlign: "center", border: "2px solid maroon", py: 0.5, fontSize: '12px' }}>{person.registrar_status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Snackbar
                open={snack.open}

                onClose={handleSnackClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackClose} severity={snack.severity} sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
            </Snackbar>

        </Box>
    );
};

export default ApplicantList;