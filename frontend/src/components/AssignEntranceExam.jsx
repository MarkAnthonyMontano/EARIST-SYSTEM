import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Grid, MenuItem, TextField, Typography, Paper } from "@mui/material";

const AssignEntranceExam = () => {
  const [day, setDay] = useState("");
  const [roomId, setRoomId] = useState("");            // store selected room_id
  const [rooms, setRooms] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/room_list");
        // expect res.data = [{ room_id: 1, room_description: "Room A" }, ...]
        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setMessage("Could not load rooms. Check backend /room_list.");
      }
    };
    fetchRooms();
  }, []);

  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    setMessage("");

    // find selected room's description
    const sel = rooms.find((r) => String(r.room_id) === String(roomId));
    if (!sel) {
      setMessage("Please select a valid room.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/insert_exam_schedule", {
        day_description: day,
        room_description: sel.room_description,
        start_time: startTime,
        end_time: endTime,
      });
      setMessage("Entrance exam schedule saved successfully.");
      setDay("");
      setRoomId("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error("Error saving schedule:", err);
      setMessage("Failed to save schedule.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="#fdfdfd" px={2} pt={2}>
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
          ASSIGN ENTRANCE EXAMINATION ROOM
        </Typography>


      </Box>

      <hr style={{ border: "1px solid #ccc", width: "100%" }} />

      <br />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        width="100%"
        mt={3}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 500,
            width: "100%",
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "3px solid maroon", // keep the maroon border
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            textAlign="center"
            color="maroon"
          >
            ADD SCHEDULE
          </Typography>

          <form onSubmit={handleSaveSchedule}>
            <Grid container spacing={1}>
              {/* Day */}
              <Grid item xs={12}>
                <Typography  fontWeight={500}>
                  Day
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                  variant="outlined"
                >
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                    (d) => (
                      <MenuItem key={d} value={d}>
                        {d}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>

              {/* Room */}
              <Grid item xs={12}>
                <Typography fontWeight={500}>
                  Room
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  required
                  variant="outlined"
                >
                  {rooms.map((r) => (
                    <MenuItem key={r.room_id} value={r.room_id}>
                      {r.room_description}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Start Time */}
              <Grid item xs={12}>
                <Typography fontWeight={500}>
                  Start Time
                </Typography>
                <TextField
                  fullWidth
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  required
                  variant="outlined"
                />
              </Grid>

              {/* End Time */}
              <Grid item xs={12}>
                <Typography fontWeight={500}>
                  End Time
                </Typography>
                <TextField
                  fullWidth
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  required
                  variant="outlined"
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#800000",
                    "&:hover": { bgcolor: "#a00000" },
                    px: 6,
                    py: 1.5,
                    mt: 2,
                    borderRadius: 2,
                  }}
                >
                  Save Schedule
                </Button>
              </Grid>

              {/* Message */}
              {message && (
                <Grid item xs={12}>
                  <Typography textAlign="center" color="maroon">
                    {message}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AssignEntranceExam;
