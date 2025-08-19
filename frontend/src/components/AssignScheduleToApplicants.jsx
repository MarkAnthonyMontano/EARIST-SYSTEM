import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Typography,
  Paper,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import { Search } from '@mui/icons-material';

const socket = io("http://localhost:5000");


const AssignScheduleToApplicants = () => {
  const [schedules, setSchedules] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedApplicants, setSelectedApplicants] = useState(new Set());
  const [message, setMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [persons, setPersons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [person, setPerson] = useState({
    campus: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    document_status: "",
    extension: "",
    emailAddress: "",
    program: "",


  });


  const [selectedApplicantStatus, setSelectedApplicantStatus] = useState("");


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


  useEffect(() => {
    axios.get("http://localhost:5000/api/applied_program")
      .then(res => {
        setAllCurriculums(res.data);
        setCurriculumOptions(res.data);
      });
  }, []);


  const [allCurriculums, setAllCurriculums] = useState([]);


  useEffect(() => {
    fetchSchedules();
    fetchAllApplicants();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/exam_schedules");
      setSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };


  // ⬇️ Add this inside ApplicantList component, before useEffect
  const fetchAllApplicants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/all-applicants");
      setPersons(res.data);  // ⬅️ keep all applicants
      setSelectedApplicants(prev => {
        const newSet = new Set(prev);
        res.data.forEach((a) => {
          if (a.schedule_id !== null) newSet.delete(a.applicant_number);
        });
        return newSet;
      });
    } catch (err) {
      console.error("Error fetching all-applicants:", err);
    }
  };



  const toggleSelectApplicant = (id) => {
    const newSelected = new Set(selectedApplicants);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedApplicants(newSelected);
    setMessage("");
  };

  const handleAssign = () => {
    if (!selectedSchedule) {
      setMessage("Please select a schedule.");
      return;
    }
    if (selectedApplicants.size === 0) {
      setMessage("Please select at least one applicant.");
      return;
    }

    const applicant_numbers = Array.from(selectedApplicants);

    socket.emit("update_schedule", { schedule_id: selectedSchedule, applicant_numbers });

    socket.once("update_schedule_result", (res) => {
      if (res.success) {
        setMessage(`Assigned: ${res.assigned.length}, Skipped: ${res.skipped.length}`);
        setSelectedApplicants(new Set());
        fetchAllApplicants();
      } else {
        setMessage(res.error || "Failed to assign applicants.");
      }
    });
  };

  const handleAssign40 = () => {
    if (!selectedSchedule) {
      setMessage("Please select a schedule first.");
      return;
    }

    // ✅ Grab first 40 applicants with no schedule
    const first40 = persons
      .filter((a) => a.schedule_id === null) // only unassigned
      .slice(0, 40)
      .map((a) => a.applicant_number);

    if (first40.length === 0) {
      setMessage("No unassigned applicants available.");
      return;
    }

    // ✅ Step 1: Mark them as 'Selected' in the UI
    setSelectedApplicants(new Set(first40));

    // ✅ Step 2: Immediately send them to backend
    socket.emit("update_schedule", {
      schedule_id: selectedSchedule,
      applicant_numbers: first40,
    });

    // ✅ Step 3: Handle response
    socket.once("update_schedule_result", (res) => {
      if (res.success) {
        setMessage(`Assigned 40 applicants: ${res.assigned.length}, Skipped: ${res.skipped.length}`);
        fetchAllApplicants(); // refresh table
        setSelectedApplicants(new Set()); // clear after assign
      } else {
        setMessage(res.error || "Failed to assign applicants.");
      }
    });
  };


  const handleUnassignImmediate = async (applicant_number) => {
    try {
      await axios.post("http://localhost:5000/unassign_schedule", { applicant_number });

      // Update UI state
      setPersons(prev =>
        prev.map(p =>
          p.applicant_number === applicant_number
            ? { ...p, schedule_id: null }
            : p
        )
      );

      // 🔥 Remove from selectedApplicants too
      setSelectedApplicants(prev => {
        const newSet = new Set(prev);
        newSet.delete(applicant_number);
        return newSet;
      });

      setMessage(`Applicant ${applicant_number} unassigned successfully.`);
    } catch (err) {
      console.error("Error unassigning applicant:", err);
      setMessage(err.response?.data?.error || "Failed to unassign applicant.");
    }
  };



  const handleSendEmails = () => {
    if (!selectedSchedule) {
      setMessage("Please select a schedule first.");
      return;
    }
    setConfirmOpen(true);
  };

  const confirmSendEmails = () => {
    setConfirmOpen(false);
    socket.emit("send_schedule_emails", { schedule_id: selectedSchedule });

    socket.removeAllListeners("send_schedule_emails_result");
    socket.once("send_schedule_emails_result", (res) => {
      if (res.success) {
        setMessage(res.message || "Emails sent successfully.");

        // 🔥 Remove emailed applicants from the list
        setPersons(prev =>
          prev.filter(p => p.schedule_id !== selectedSchedule)
        );
      } else {
        setMessage(res.error || "Failed to send emails.");
      }
    });
  };


  const [itemsPerPage, setItemsPerPage] = useState(100);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim() === "") return;

      try {
        const res = await axios.get("http://localhost:5000/api/search-person", {
          params: { query: searchQuery }
        });

        setPerson(res.data); // ❌ don't do this
      } catch (err) {
        setSearchError("Applicant not found");
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState("");
  const [selectedProgramFilter, setSelectedProgramFilter] = useState("");
  const [department, setDepartment] = useState([]);


  // ✅ Step 1: Filtering
  const filteredPersons = persons.filter((personData) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${personData.first_name ?? ""} ${personData.middle_name ?? ""} ${personData.last_name ?? ""}`.toLowerCase();

    const matchesApplicantID = personData.applicant_number?.toString().toLowerCase().includes(query);
    const matchesName = fullName.includes(query);
    const matchesEmail = personData.emailAddress?.toLowerCase().includes(query); // ✅ included

    const programInfo = allCurriculums.find(
      (opt) => opt.curriculum_id?.toString() === personData.program?.toString()
    );
    const matchesProgramQuery = programInfo?.program_code?.toLowerCase().includes(query);

    const matchesDepartment =
      selectedDepartmentFilter === "" || programInfo?.dprtmnt_name === selectedDepartmentFilter;

    const matchesProgramFilter =
      selectedProgramFilter === "" || programInfo?.program_code === selectedProgramFilter;

    return (
      (matchesApplicantID || matchesName || matchesEmail || matchesProgramQuery) &&
      matchesDepartment &&
      matchesProgramFilter
    );
  });


  const sortedPersons = [...filteredPersons].sort((a, b) => {
    if (sortBy === "name") {
      // ✅ sort by last name first, then first + middle
      const nameA = `${a.last_name ?? ""} ${a.first_name ?? ""} ${a.middle_name ?? ""}`.toLowerCase();
      const nameB = `${b.last_name ?? ""} ${b.first_name ?? ""} ${b.middle_name ?? ""}`.toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }

    if (sortBy === "id") {
      const idA = a.applicant_number ?? "";
      const idB = b.applicant_number ?? "";
      return sortOrder === "asc" ? idA - idB : idB - idA;
    }

    if (sortBy === "email") {
      const emailA = a.emailAddress?.toLowerCase() ?? "";
      const emailB = b.emailAddress?.toLowerCase() ?? "";
      return sortOrder === "asc" ? emailA.localeCompare(emailB) : emailB.localeCompare(emailA);
    }

    return 0;
  });

  // ✅ Step 3: Pagination (use sortedPersons instead of filteredPersons)
  const totalPages = Math.ceil(sortedPersons.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPersons = sortedPersons.slice(indexOfFirstItem, indexOfLastItem);


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

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredPersons.length, totalPages]);




  return (
    <Box sx={{ height: "calc(100vh - 150px)", overflowY: "auto", paddingRight: 1, backgroundColor: "transparent" }}>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          mt: 1,
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
          ASSIGN SCHEDULE TO APPLICANT
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search Applicant Name / Email / Applicant ID"
          size="small"
          style={{ width: '450px' }}
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

      <hr style={{ border: "1px solid #ccc", width: "100%" }} />

      <br />


      <TableContainer component={Paper} sx={{ width: '100%', border: "2px solid maroon", }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#6D2323' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', textAlign: "Center" }}>Schedule</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <Paper
        sx={{
          width: "100%",

          p: 3,

          border: "3px solid maroon",
          bgcolor: "white",
          boxShadow: "0 3px 12px rgba(0,0,0,0.1)",

        }}
      >
        <Box >

          <Typography textAlign="left" color="maroon" >
            Select Schedule:
          </Typography>
          <TextField
            select
            fullWidth
            label="Select a Schedule"
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
            variant="outlined"
            sx={{
              border: "3px solid maroon",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              bgcolor: "white",
              p: 0.5,
              mb: 2,
            }}
          >
            <MenuItem value="" disabled>
              -- Select Schedule --
            </MenuItem>
            {schedules.map((s) => (
              <MenuItem key={s.schedule_id} value={s.schedule_id}>
                {s.day_description} | {s.room_description} | {s.start_time} - {s.end_time}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {/* === ROW 1: Sort + Buttons === */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          {/* LEFT SIDE: Sort By + Sort Order */}
          <Box display="flex" alignItems="center" gap={2}>
            {/* Sort By */}
            <Box display="flex" alignItems="center" gap={1} marginLeft={-4}>
              <Typography fontSize={13} sx={{ minWidth: "80px", textAlign: "right" }}>
                Sort By:
              </Typography>
              <FormControl size="small" sx={{ width: "200px" }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="name">Applicant's Name</MenuItem>
                  <MenuItem value="id">Applicant ID</MenuItem>
                  <MenuItem value="email">Email Address</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Sort Order */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontSize={13} sx={{ minWidth: "80px", textAlign: "right" }}>
                Sort Order:
              </Typography>
              <FormControl size="small" sx={{ width: "200px" }}>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>


          {/* RIGHT SIDE: Action Buttons */}
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAssign40}
              sx={{ minWidth: 150 }}
            >
              Assign First 40
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAssign}
              sx={{ minWidth: 150 }}
            >
              Assign Selected
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSendEmails}
              sx={{ minWidth: 150 }}
            >
              Send Emails
            </Button>
          </Box>
        </Box>

        {/* === ROW 2: Department + Program === */}
        <Box display="flex" alignItems="center" gap={3} mb={2}>
          {/* Department Filter */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize={13} sx={{ minWidth: "100px" }}>Department:</Typography>
            <FormControl size="small" sx={{ width: "350px" }}>
              <Select
                value={selectedDepartmentFilter}
                onChange={(e) => {
                  const selectedDept = e.target.value;
                  setSelectedDepartmentFilter(selectedDept);
                  handleDepartmentChange(selectedDept);
                }}
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

          {/* Program Filter */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize={13} sx={{ minWidth: "100px" }}>Program:</Typography>
            <FormControl size="small" sx={{ width: "350px" }}>
              <Select
                value={selectedProgramFilter}
                onChange={(e) => setSelectedProgramFilter(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All Programs</MenuItem>
                {curriculumOptions.map((prog) => (
                  <MenuItem key={prog.curriculum_id} value={prog.program_code}>
                    {prog.program_code} - {prog.program_description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Message inside Paper */}
        {message && (
          <Typography textAlign="center" color="maroon" mt={1}>
            {message}
          </Typography>
        )}
      </Paper>

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

      <TableContainer component={Paper} sx={{ width: "100%", border: "2px solid maroon" }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#F1F1F1", }}>
            <TableRow>
              <TableCell sx={{ color: "white", textAlign: "center", fontSize: "12px", color: "maroon", border: "2px solid maroon" }}>#</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontSize: "12px", color: "maroon", border: "2px solid maroon" }}>Applicant ID</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontSize: "12px", color: "maroon", border: "2px solid maroon" }}>Name</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontSize: "12px", color: "maroon", border: "2px solid maroon" }}>Program</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontSize: "12px", color: "maroon", border: "2px solid maroon" }}>Email Address</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontSize: "12px", color: "maroon", border: "2px solid maroon" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPersons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", p: 2 }}>
                  No applicants found.
                </TableCell>
              </TableRow>
            ) : (
              currentPersons.map((person, index) => {
                const id = person.applicant_number;
                const isAssigned = person.schedule_id !== null;
                const isSelected = selectedApplicants.has(id);

                return (
                  <TableRow key={person.person_id}>
                    {/* Auto-increment # */}
                    <TableCell sx={{ textAlign: "center", border: "1px solid maroon", borderLeft: "2px solid maroon", fontSize: "12px" }}>
                      {indexOfFirstItem + index + 1}
                    </TableCell>

                    {/* Applicant ID */}
                    <TableCell sx={{ textAlign: "center", border: "1px solid maroon", fontSize: "12px" }}>
                      {person.applicant_number ?? "N/A"}
                    </TableCell>

                    {/* Applicant Name */}
                    <TableCell sx={{ textAlign: "left", border: "1px solid maroon", fontSize: "12px" }}>
                      {`${person.last_name}, ${person.first_name} ${person.middle_name ?? ""} ${person.extension ?? ""}`}
                    </TableCell>

                    {/* Program */}
                    <TableCell sx={{ textAlign: "center", border: "1px solid maroon", fontSize: "12px" }}>
                      {curriculumOptions.find(
                        (item) => item.curriculum_id?.toString() === person.program?.toString()
                      )?.program_code ?? "N/A"}
                    </TableCell>

                    {/* Email */}
                    <TableCell sx={{ textAlign: "center", border: "1px solid maroon", fontSize: "12px" }}>
                      {person.emailAddress ?? "N/A"}
                    </TableCell>

                    {/* Action Buttons (from AssignScheduleToApplicants) */}
                    <TableCell sx={{ textAlign: "center", border: "1px solid maroon", borderRight: "2px solid maroon", }}>
                      {!isAssigned ? (
                        <Button
                          variant={isSelected ? "contained" : "outlined"}
                          color="success"
                          size="small"
                          onClick={() => toggleSelectApplicant(id)}
                        >
                          {isSelected ? "Selected" : "Assign"}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleUnassignImmediate(id)}
                        >
                          Unassign
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>



        </Table>
      </TableContainer>

      <br />









      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Email Sending</DialogTitle>
        <DialogContent>
          Are you sure you want to send exam schedule emails? Please confirm that
          the applicants' Email addresses are correct.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={confirmSendEmails} color="success" variant="contained">
            Yes, Send Emails
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default AssignScheduleToApplicants;
