import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function RequirementUploader() {
  const [requirements, setRequirements] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [personId] = useState(1); // Replace with actual user ID

  useEffect(() => {
    fetchRequirements();
    fetchUploads();
  }, []);

  const fetchRequirements = async () => {
    try {
      const res = await axios.get('http://localhost:5000/requirements');
      setRequirements(res.data);
    } catch (err) {
      console.error('Error fetching requirements:', err);
    }
  };

  const fetchUploads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/uploads');
      setUploads(res.data);
    } catch (err) {
      console.error('Error fetching uploads:', err);
    }
  };

  const handleUpload = async () => {
    if (!selectedRequirement || !file) {
      return alert('Please select a requirement and upload a file.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('requirements_id', selectedRequirement);
    formData.append('person_id', personId);

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/upload', formData);
      setSelectedRequirement('');
      setFile(null);
      await fetchUploads();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this upload?')) {
      try {
        await axios.delete(`http://localhost:5000/uploads/${id}`);
        fetchUploads();
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ height: "calc(100vh - 150px)", overflowY: "auto", paddingRight: 1, backgroundColor: "transparent" }}>
      <Container maxWidth="md" sx={{ mt: 5, }}>
        <Container>
          <h1 style={{ fontSize: "40px", fontWeight: "bold", textAlign: "center", color: "maroon", marginTop: "25px" }}>UPLOAD REQUIREMENT DOCUMENT</h1>
          <div style={{ textAlign: "center" }}>Complete the applicant form to secure your place for the upcoming academic year at EARIST.</div>
        </Container>
        <br />
        <Container
          maxWidth="100%"
          sx={{
            backgroundColor: "#6D2323",
            border: "2px solid black",
            maxHeight: "500px",
            overflowY: "auto",
            color: "white",
            borderRadius: 2,
            boxShadow: 3,
            padding: "4px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography style={{ fontSize: "20px", padding: "10px", fontFamily: "Arial Black" }}>Step 6: Upload Documents</Typography>
          </Box>
        </Container>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, border: "1px solid black" }}>
          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>Select Documents:</Typography>
          <hr style={{ border: "1px solid #ccc", width: "100%" }} />

          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            {/* Select Requirement (default size) */}
            <label style={{ marginTop: "-5px", marginBottom: "-20px" }} className="w-40 font-medium">Requirement:</label>
            <FormControl fullWidth>
              <InputLabel id="requirement-label">Select Requirement</InputLabel>
              <Select
                labelId="requirement-label"
                value={selectedRequirement}
                onChange={(e) => setSelectedRequirement(e.target.value)}
                label="Select Requirement"
              >
                <MenuItem value="">
                  <em>-- Select Requirement --</em>
                </MenuItem>
                {requirements.map((req) => (
                  <MenuItem key={req.id} value={req.id}>
                    {req.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <label style={{ marginTop: "-5px", marginBottom: "-20px" }} className="w-40 font-medium">Upload File:</label>
            {/* File Upload (TextField with default size) */}
            <TextField
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              inputProps={{ accept: '.png,.jpg,.jpeg,.pdf' }}
              fullWidth
            />


            <Button
              onClick={handleUpload}
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
              disabled={loading}
              sx={{
                backgroundColor: '#6D2323',
                '&:hover': { backgroundColor: '#5a1f1f' },
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                py: 1
              }}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </Box>
        </Paper>

        <Typography variant="h6" align="center" mt={5} mb={2} color="#6D2323">
          Uploaded Documents
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f1f1f1' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Requirement</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Date Uploaded</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: '#888', fontStyle: 'italic' }}>
                    No uploads found.
                  </TableCell>
                </TableRow>
              ) : (
                uploads.map((upload) => (
                  <TableRow key={upload.upload_id}>
                    <TableCell>{upload.upload_id}</TableCell>
                    <TableCell>{upload.description}</TableCell>
                    <TableCell>
                      <a
                        href={`http://localhost:5000${upload.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#007bff', textDecoration: 'none' }}
                      >
                        View
                      </a>
                    </TableCell>
                    <TableCell>
                      {upload.created_at ? new Date(upload.created_at).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(upload.upload_id)}>
                        <DeleteIcon sx={{ color: 'maroon' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default RequirementUploader;
