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
  TableContainer,
  TableCell,
  TableHead,
} from "@mui/material";

const socket = io("http://localhost:5000");


const AssignScheduleToApplicants = () => {
  const [schedules, setSchedules] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedApplicants, setSelectedApplicants] = useState(new Set());
  const [message, setMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    fetchSchedules();
    fetchApplicants();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/exam_schedules");
      setSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  const fetchApplicants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/applicants");
      setApplicants(res.data);
      // Clear selection of any applicant that got assigned (to avoid confusion)
      setSelectedApplicants((prev) => {
        const newSet = new Set(prev);
        res.data.forEach((a) => {
          if (a.schedule_id !== null) newSet.delete(a.applicant_number);
        });
        return newSet;
      });
    } catch (err) {
      console.error("Error fetching applicants:", err);
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
        fetchApplicants();
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

    const unassigned = applicants
      .filter((a) => a.schedule_id === null)
      .slice(0, 40)
      .map((a) => a.applicant_number);

    if (unassigned.length === 0) {
      setMessage("No unassigned applicants available.");
      return;
    }

    socket.emit("update_schedule", { schedule_id: selectedSchedule, applicant_numbers: unassigned });

    socket.once("update_schedule_result", (res) => {
      if (res.success) {
        setMessage(`Assigned (max 40): ${res.assigned.length}, Skipped: ${res.skipped.length}`);
        fetchApplicants();
      } else {
        setMessage(res.error || "Failed to assign applicants.");
      }
    });
  };
  const handleUnassignImmediate = async (applicant_number) => {
    try {
      await axios.post("http://localhost:5000/unassign_schedule", { applicant_number });
      setMessage(`Applicant ${applicant_number} unassigned successfully.`);
      fetchApplicants();
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

    socket.removeAllListeners("send_schedule_emails_result"); // 🔥 avoid stacking
    socket.once("send_schedule_emails_result", (res) => {
      if (res.success) {
        setMessage(res.message || "Emails sent successfully.");
      } else {
        setMessage(res.error || "Failed to send emails.");
      }
    });
  };

  

  return (
    <Box px={2} py={2} display="flex" flexDirection="column" >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',

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
          mb: 3,
        }}
      >
        <Box >

          <TextField
            select
            fullWidth
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
            variant="outlined"
            sx={{
              border: "3px solid maroon",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              bgcolor: "white",
              p: 0.5,
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
      </Paper>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#6D2323", }}>
            <TableRow>
              <TableCell sx={{ color: "white", textAlign: "center", width: "2%", py: 0.5, fontSize: "12px", border: "1px solid maroon", borderLeft: "2px solid maroon" }}>
                #
              </TableCell>

              <TableCell sx={{ color: "white", textAlign: "center", width: "10%", py: 0.5, fontSize: "12px", border: "1px solid maroon" }}>
                Applicant ID
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", width: "30%", py: 0.5, fontSize: "12px", border: "1px solid maroon" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", width: "10%", py: 0.5, fontSize: "12px", border: "1px solid maroon" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", width: "6%", py: 0.5, fontSize: "12px", border: "1px solid maroon" }}>
                Action
              </TableCell>

            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>



      {/* Applicants List */}


      {applicants.length === 0 && (
        <Typography sx={{ p: 1 }}>No applicants found.</Typography>
      )}

      {applicants.map((a) => {
        const id = a.applicant_number;
        const name = a.applicant_name;
        const isAssigned = a.schedule_id !== null;
        const isSelected = selectedApplicants.has(id);

        return (
          <Box
            key={id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1,
              px: 1,
              borderBottom: "1px solid #f6f6f6",
            }}
          >
            <Box>
              <Typography fontWeight={500}>{name}</Typography>
              <Typography fontSize={12} color="text.secondary">
                Applicant Number: {id}
              </Typography>
            </Box>

            <Box>
              {!isAssigned && (
                <Button
                  variant={isSelected ? "contained" : "outlined"}
                  color="success"
                  size="small"
                  onClick={() => toggleSelectApplicant(id)}
                >
                  {isSelected ? "Selected" : "Assign"}
                </Button>
              )}
              {isAssigned && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleUnassignImmediate(id)}
                >
                  Unassign
                </Button>
              )}
            </Box>
          </Box>
        );
      })}


      {/* Action Buttons Centered */}
      <Box display="flex" justifyContent="center" gap={2} mb={2}>
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

      {/* Message inside Paper */}
      {message && (
        <Typography textAlign="center" color="maroon" mt={1}>
          {message}
        </Typography>
      )}


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
