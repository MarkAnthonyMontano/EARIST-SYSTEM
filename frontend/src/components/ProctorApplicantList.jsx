import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { FcPrint } from "react-icons/fc";
import EaristLogo from "../assets/EaristLogo.png";

const ProctorApplicantList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [proctor, setProctor] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [person, setPerson] = useState({
    campus: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    program: "",
    extension: "",


  });

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/proctor-applicants",
        { params: { query: searchQuery } }
      );
      setProctor(data[0]?.schedule || null); // first schedule if multiple
      setApplicants(data[0]?.applicants || []);
    } catch (err) {
      console.error(err);
    }
  };

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

  const printDiv = () => {
    const newWin = window.open("", "Print-Window");
    newWin.document.open();
    newWin.document.write(`
      <html>
        <head>
          <title>Proctor Applicant List</title>
          <style>
            @page { size: A4; margin: 10mm; }
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .print-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .print-header {
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              width: 100%;
            }
            .print-header img {
              position: absolute;
              left: 0;
              margin-left: 10px;
              width: 120px;
              height: 120px;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-top: 20px;
            }
          th, td {
  border: 2px solid maroon;
  padding: 6px;
  font-size: 12px;
  text-align: left;   /* default for data */
}
th {
  text-align: center; /* center header text */
  background-color: #800000;
  color: white;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

          </style>
        </head>
        <body onload="window.print(); setTimeout(() => window.close(), 100);">
          <div class="print-container">
            <!-- Header -->
            <div class="print-header">
              <img src="${EaristLogo}" alt="Earist Logo" />
              <div>
                <div>Republic of the Philippines</div>
                <b style="letter-spacing: 1px; font-size: 20px;">
                  Eulogio "Amang" Rodriguez
                </b>
                <div style="letter-spacing: 1px; font-size: 20px;">
                  <b>Institute of Science and Technology</b>
                </div>
                <div>Nagtahan St. Sampaloc, Manila</div>
                <div style="margin-top: 25px;">
                  <b style="font-size: 22px; letter-spacing: 1px;">
                    Proctor Applicant List
                  </b>
                </div>
              </div>
            </div>

            <!-- Proctor Info -->
            <div style="margin-top: 20px; text-align: left; width: 100%;">
              <p><b>Proctor:</b> ${proctor?.proctor || "N/A"}</p>
              <p><b>Room:</b> ${proctor?.room_description || "N/A"}</p>
              <p><b>Schedule:</b> ${proctor?.day_description || ""} 
                ${proctor?.start_time || ""} - ${proctor?.end_time || ""}</p>
            </div>

            <!-- Table -->
           <table>
  <thead>
    <tr>
      <th>#</th>
      <th>Applicant #</th>
      <th>Applicant Name</th>
      <th>Program</th>
    </tr>
  </thead>
  <tbody>
    ${applicants
        .map(
          (a, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${a.applicant_number}</td>
        <td>${a.last_name}, ${a.first_name} ${a.middle_name || ""}</td>
      <td>${curriculumOptions.find(
            (item) => item.curriculum_id?.toString() === a.program?.toString()
          )?.program_code ?? "N/A"
            }</td>

      </tr>
    `
        )
        .join("")}
    <tr>
      <td colspan="4" style="text-align:right; font-weight:bold;">
        Total Applicants: ${applicants.length}
      </td>
    </tr>
  </tbody>
</table>

          </div>
        </body>
      </html>
    `);
    newWin.document.close();
  };

  return (
    <Box sx={{ height: 'calc(100vh - 150px)', overflowY: 'auto', pr: 1, p: 2 }}>
      <Typography
        variant="h4"
        sx={{ color: "maroon", fontWeight: "bold", mb: 2 }}
      >
        Proctor Applicant List
      </Typography>

      {/* Search Controls */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search Proctor Name / Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        {applicants.length > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FcPrint size={20} />}
            onClick={printDiv}
          >
            Print Applicant List
          </Button>
        )}
      </Box>

      {/* TableContainer */}
      {applicants.length > 0 && (
       <TableContainer component={Paper}>
  <Table>
    <TableHead sx={{ backgroundColor: "#6D2323" }}>
      <TableRow>
        <TableCell sx={{ color: "white", textAlign: "center", border: "2px solid maroon" }}>#</TableCell>
        <TableCell sx={{ color: "white", textAlign: "center", border: "2px solid maroon" }}>Applicant</TableCell>
        <TableCell sx={{ color: "white", textAlign: "center", border: "2px solid maroon" }}>Name</TableCell>
        <TableCell sx={{ color: "white", textAlign: "center", border: "2px solid maroon" }}>Program</TableCell>
        <TableCell sx={{ color: "white", textAlign: "center", border: "2px solid maroon" }}>Email Sent</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {applicants.map((a, idx) => (
        <TableRow key={idx}>
          <TableCell align="center" sx={{ border: "2px solid maroon" }}>{idx + 1}</TableCell>
          <TableCell align="left" sx={{ border: "2px solid maroon" }}>{a.applicant_number}</TableCell>
          <TableCell align="left" sx={{ border: "2px solid maroon" }}>
            {`${a.last_name}, ${a.first_name} ${a.middle_name || ""}`}
          </TableCell>
          <TableCell align="left" sx={{ border: "2px solid maroon" }}>
            {curriculumOptions.find(
              (item) => item.curriculum_id?.toString() === a.program?.toString()
            )?.program_code ?? "N/A"}
          </TableCell>
          <TableCell align="left" sx={{ border: "2px solid maroon" }}>
            {a.email_sent ? "✅ Sent" : "❌ Not Sent"}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      )}
    </Box>
  );
};

export default ProctorApplicantList;
