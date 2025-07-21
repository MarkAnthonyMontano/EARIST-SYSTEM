import React, { useState, useEffect } from "react";
import axios from 'axios'; // ← Import axios
import '../styles/TempStyles.css';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import GroupIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const Dashboard = () => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [professorCount, setProfessorCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);


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
    const fetchEnrolledCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/enrolled-count");
        setEnrolledCount(res.data.total);
      } catch (error) {
        console.error("Failed to fetch enrolled count", error);
      }
    };

    fetchEnrolledCount();
  }, []);

  useEffect(() => {
    const fetchProfessorCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/professors");
        if (Array.isArray(res.data)) {
          setProfessorCount(res.data.length);
        }
      } catch (error) {
        console.error("Failed to fetch professor count", error);
      }
    };

    fetchProfessorCount();
  }, []);

  useEffect(() => {
    const fetchAcceptedCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/accepted-students-count");
        setAcceptedCount(res.data.total);
      } catch (error) {
        console.error("Failed to fetch accepted student count", error);
      }
    };

    fetchAcceptedCount();
  }, []);




  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

return (
  <div className="dashboard-container">
    <div className="dashboard-header">
      <div className="welcome-text">Welcome Admin! {user}</div>
      <div style={{color: "black", fontSize: "18px"}} className="date-text">{formattedDate}</div>
    </div>

    {/* Cards Row */}
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
      {/* Applicants Card */}
      <Card
        sx={{
          borderRadius: "6px",
          boxShadow: 2,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 3,
          flex: 1,
          minWidth: 250,
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: "#E8C999",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <GroupIcon sx={{ fontSize: 35, color: "maroon" }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Applicants
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {enrolledCount}
          </Typography>
        </Box>
      </Card>

      {/* Students Card */}
      <Card
        sx={{
          borderRadius: "6px",
          boxShadow: 2,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 3,
          flex: 1,
          minWidth: 250,
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: "#E8C999",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <SchoolIcon sx={{ fontSize: 35, color: "maroon" }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Students
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {acceptedCount}
          </Typography>
        </Box>
      </Card>

      {/* Professors Card */}
      <Card
        sx={{
          borderRadius: "6px",
          boxShadow: 2,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 3,
          flex: 1,
          minWidth: 250,
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: "#E8C999",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: 35, color: "maroon" }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Professors
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {professorCount}
          </Typography>
        </Box>
      </Card>

      {/* Placeholder Card 4 */}
      <Card
        sx={{
          borderRadius: "6px",
          boxShadow: 2,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 3,
          flex: 1,
          minWidth: 250,
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: "#E8C999",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <InsertChartIcon sx={{ fontSize: 30, color: "maroon" }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Insights
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {/* Add actual count/data if needed */}
            0
          </Typography>
        </Box>
      </Card>
    </Box>

    {/* STATISTIC ROW */}
    <Grid container spacing={3} mt={4}>
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: "8px", height: 250, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Statistic A
            </Typography>
            {/* Add chart or info here */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: "8px", height: 250, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Statistic B
            </Typography>
            {/* Add chart or info here */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
);

};

export default Dashboard;
