import { useState, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Divider
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterProf = () => {
  const [profForm, setProfForm] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef(null);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setProfForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    if (
      !profForm.fname ||
      !profForm.mname ||
      !profForm.lname ||
      !profForm.email ||
      !profForm.password ||
      !file
    ) {
      alert("Please fill in all fields and upload a profile image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("fname", profForm.fname);
    formData.append("mname", profForm.mname);
    formData.append("lname", profForm.lname);
    formData.append("email", profForm.email);
    formData.append("password", profForm.password);
    formData.append("profileImage", file);

    try {
      const response = await axios.post("http://localhost:5000/register_prof", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert(response.data.message);

      setProfForm({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        password: '',
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;

    } catch (error) {
      alert(error.response?.data?.error || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
        <Box sx={{ height: "calc(100vh - 100px)", overflowY: "auto", paddingRight: 1, backgroundColor: "transparent" }}>
    
    <Box sx={{ py: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" fontWeight="bold" color="maroon" gutterBottom>
          PROFESSOR REGISTRATION
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Welcome to the EARIST Professor Registration Portal. Please complete all required fields
          accurately to create your teaching profile. Make sure to upload your profile picture and credentials.
        </Typography>

        <Paper
          sx={{
            backgroundColor: "#6D2323",
            color: "white",
            p: 2,
         
            border: "2px solid black",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography sx={{ fontSize: "20px", fontFamily: "Arial Black" }}>
            College Department Professor's
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            border: "2px solid black",
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f1f1f1"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography sx={{ minWidth: "120px", fontWeight: "500" }}>Employee ID:</Typography>
            <TextField
              label="Enter your Employee ID"
              name="employeeId"
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography sx={{ minWidth: "120px", fontWeight: "500" }}>First Name:</Typography>
            <TextField
              label="Enter your First Name"
              name="fname"
              value={profForm.fname}
              onChange={handleChanges}
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography sx={{ minWidth: "120px", fontWeight: "500" }}>Middle Name:</Typography>
            <TextField
              label="Enter your Middle Name"
              name="mname"
              value={profForm.mname}
              onChange={handleChanges}
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography sx={{ minWidth: "120px", fontWeight: "500" }}>Last Name:</Typography>
            <TextField
              label="Enter your Last Name"
              name="lname"
              value={profForm.lname}
              onChange={handleChanges}
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography sx={{ minWidth: "120px", fontWeight: "500" }}>Email:</Typography>
            <TextField
              label="Enter your Email Address"
              name="email"
              type="email"
              value={profForm.email}
              onChange={handleChanges}
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography sx={{ minWidth: "120px", fontWeight: "500" }}>Password:</Typography>
            <TextField
              label="Enter your Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={profForm.password}
              onChange={handleChanges}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#6D2323",
                "&:hover": { backgroundColor: "#5a1f1f" },
                textTransform: "none",
              }}
            >
              Upload Profile Picture
              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {file ? file.name : "No file selected"}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
           
            disabled={loading}
            onClick={handleRegister}
            sx={{
              backgroundColor: "#6D2323",
              "&:hover": { backgroundColor: "#5a1f1f" },
              textTransform: "none",
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Paper>
      </Container>
    </Box>
    </Box>
  );
};

export default RegisterProf;
