import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";

const Dashboard = () => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [professorCount, setProfessorCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [yearLevelCounts, setYearLevelCounts] = useState([]);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");
    const storedID = localStorage.getItem("person_id");

    if (storedUser && storedRole && storedID) {
      setUser(storedUser);
      setUserRole(storedRole);
      setUserID(storedID);

      if (storedRole !== "registrar") {
        window.location.href = "/applicant_dashboard";
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/enrolled-count")
      .then(res => setEnrolledCount(res.data.total))
      .catch(err => console.error("Failed to fetch enrolled count", err));

    axios.get("http://localhost:5000/api/professors")
      .then(res => setProfessorCount(Array.isArray(res.data) ? res.data.length : 0))
      .catch(err => console.error("Failed to fetch professor count", err));

    axios.get("http://localhost:5000/api/accepted-students-count")
      .then(res => setAcceptedCount(res.data.total))
      .catch(err => console.error("Failed to fetch accepted count", err));

    axios.get("http://localhost:5000/api/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Failed to fetch departments", err));
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      axios.get(`http://localhost:5000/statistics/student_count/department/${selectedDepartment}`)
        .then(res => setStudentCount(res.data.count))
        .catch(err => console.error("Failed to fetch student count", err));

      axios.get(`http://localhost:5000/statistics/student_count/department/${selectedDepartment}/by_year_level`)
        .then(res => setYearLevelCounts(res.data))
        .catch(err => console.error("Failed to fetch year level counts", err));
    }
  }, [selectedDepartment]);

  return (
    <Box sx={{ px: 5, py: 2, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Welcome, Admin {user}!
        </Typography>
        <Typography variant="body1" style={{ color: "black", fontSize: "25px" }}>
          {formattedDate}
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3}>
        {[
          {
            label: "Total Applicants",
            value: enrolledCount,
            icon: <GroupIcon style={{ fontSize: "50px" }} />,
            color: "#F6D167",
          },
          {
            label: "Total Enrolled Students",
            value: acceptedCount,
            icon: <SchoolIcon style={{ fontSize: "50px" }} />,
            color: "#84B082",
          },
          {
            label: "Total Professors",
            value: professorCount,
            icon: <PersonIcon style={{ fontSize: "50px" }} />,
            color: "#A3C4F3",
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: stat.color,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Department Selection & Stats */}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "350px", boxShadow: 3 }}>
            <CardContent>
              <Typography  fontWeight="bold" sx={{ mb: 1, fontSize: "16px" }}>
                Select College / Department
              </Typography>
              <FormControl fullWidth style={{fontSize: "14px"}}>
                <InputLabel>Select Department</InputLabel>
                <Select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  label="Select Department"
                >
                  <MenuItem value="">
                    <em>-Select Department-</em>
                  </MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept.dprtmnt_id} value={dept.dprtmnt_id}>
                      {dept.dprtmnt_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "350px", boxShadow: 3 }}>
            <CardContent>
              <Typography  fontWeight="bold" sx={{ mb: 1, fontSize: "16px" }}>
                Department Student
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, fontSize: "14px" }}>
                Total Enrolled:{" "}
                <Typography component="span" fontWeight="bold" color="maroon" sx={{ fontSize: "14px" }}>
                  {selectedDepartment ? studentCount : "—"}
                </Typography>
              </Typography>

              {yearLevelCounts.length > 0 ? (
                yearLevelCounts.map((item) => (
                  <Typography
                    key={item.year_level_id}
                    variant="body1"
                    sx={{ mb: 1, fontSize: "14px" }}
                  >
                    {item.year_level_description}:{" "}
                    <Typography
                      component="span"
                      fontWeight="bold"
                      color="maroon"
                      sx={{ fontSize: "14px" }}
                    >
                      {item.student_count}
                    </Typography>
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  No year level data available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
