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

import io from 'socket.io-client';


const requiredDocs = [
  { label: 'PSA Birth Certificate', key: 'BirthCertificate' },
  { label: 'Form 138 (4th Quarter / No failing Grades)', key: 'Form138' },
  { label: 'Certificate of Good Moral Character', key: 'GoodMoralCharacter' },
  { label: 'Certificate Belonging to Graduating Class', key: 'CertificateOfGraduatingClass' }
];

const StudentRequirements = () => {
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
    generalAverage1: "",
    height: "",
    applyingAs: "",
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
  fetchApplicantNumber(storedID); 
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
      setUploads(res.data);
    } catch (err) {
      console.error('Fetch uploads failed:', err);
      console.log("Fetching for applicant number:", applicant_number);

    }
  };



  const fetchPersonData = async (personID) => {
    if (!personID || personID === "undefined") {
      console.warn("Invalid personID for person data:", personID);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/person/${personID}`);

      const safePerson = Object.fromEntries(
        Object.entries(res.data).map(([key, val]) => [key, val ?? ""])
      );

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
        document_status: "",
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
        generalAverage1: "",
        height: "",
        applyingAs: "",
        document_status: "",
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
        status: remarkValue,
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

   const fetchApplicantNumber = async (personID) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/applicant_number/${personID}`);
        if (res.data && res.data.applicant_number) {
          setApplicantID(res.data.applicant_number);
        }
      } catch (error) {
        console.error("Failed to fetch applicant number:", error);
      }
    };
  

  const handleUploadSubmit = async () => {
    if (!selectedFiles.requirements_id || !selectedFiles.file || !selectedPerson?.person_id) {
      alert("Please select both document type and file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFiles.file);
      formData.append("requirements_id", selectedFiles.requirements_id);
      formData.append("person_id", selectedPerson.person_id);

      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Upload successful!");
      setSelectedFiles({}); // Clear selected file and dropdown

      // Refresh uploaded docs
      if (selectedPerson?.applicant_number) {
        fetchUploadsByApplicantNumber(selectedPerson.applicant_number);
      }

    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed.");
    }
  };



  const handleDelete = async (uploadId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/uploads/${uploadId}`, {
        withCredentials: true
      });

      if (selectedPerson?.applicant_number) {
        fetchUploadsByApplicantNumber(selectedPerson.applicant_number);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSaveRemarks = async (uploadId) => {
    const newRemark = remarksMap[uploadId];

    try {
      await axios.put(`http://localhost:5000/uploads/remarks/${uploadId}`, {
        remarks: newRemark,
        status: uploads.find((u) => u.upload_id === uploadId)?.status || "0",
      });

      if (selectedPerson?.applicant_number) {
        // Wait for uploads to refresh
        await fetchUploadsByApplicantNumber(selectedPerson.applicant_number);
      }

      // Delay hiding input slightly to allow rerender to pick up new remarks
      setTimeout(() => {
        setEditingRemarkId(null);
      }, 100); // small delay ensures UI is refreshed with updated data

    } catch (err) {
      console.error("Failed to save remarks:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
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
        <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>{doc.label}</TableCell>

        <TableCell sx={{ width: '20%' }}>
          {editingRemarkId === uploaded?.upload_id ? (
            <TextField
              size="small"
              fullWidth
              autoFocus
              value={remarksMap[uploaded.upload_id] || ""}
              onChange={(e) => {
                const value = e.target.value;
                setRemarksMap((prev) => ({
                  ...prev,
                  [uploaded.upload_id]: value,
                }));
              }}
              onBlur={() => {
                handleSaveRemarks(uploaded.upload_id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSaveRemarks(uploaded.upload_id);
                }
              }}
            />
          ) : (
            <Box
              onClick={() => {
                setEditingRemarkId(uploaded.upload_id);
                setRemarksMap((prev) => ({
                  ...prev,
                  [uploaded.upload_id]: uploaded.remarks || "",
                }));
              }}
              sx={{
                cursor: 'text',
                fontStyle: uploaded?.remarks ? 'normal' : 'italic',
                color: uploaded?.remarks ? 'inherit' : '#888',
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center',

                px: 1
              }}
            >
              {uploaded?.remarks || "Click to add remarks"}
            </Box>
          )}
        </TableCell>




        <TableCell align="center" sx={{ width: '15%' }}>
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
                <Typography sx={{ fontWeight: 'bold' }}>Approved</Typography>
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
                <Typography sx={{ fontWeight: 'bold' }}>Disapproved</Typography>
              </Box>
            ) : (
              <Box display="flex" justifyContent="center" gap={1}>
                <Button
                  variant="contained"
                  onClick={() => handleStatusChange(uploaded.upload_id, '1')}
                  sx={{ ...buttonStyle, backgroundColor: 'green', color: 'white' }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleStatusChange(uploaded.upload_id, '2')}
                  sx={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}
                >
                  Disapprove
                </Button>
              </Box>
            )
          ) : null}
        </TableCell>

        <TableCell>
          {uploaded?.created_at &&
            new Date(uploaded.created_at).toLocaleString('en-PH', {
              dateStyle: 'medium',
              timeStyle: 'short',
              timeZone: 'Asia/Manila',
            })}
        </TableCell>

        <TableCell>
          {selectedPerson
            ? `[${selectedPerson.applicant_number}] ${selectedPerson.last_name?.toUpperCase()}, ${selectedPerson.first_name?.toUpperCase()} ${selectedPerson.middle_name?.toUpperCase() || ''} ${selectedPerson.extension?.toUpperCase() || ''}`
            : ''}
        </TableCell>

        <TableCell>
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
      <Box sx={{ mt: 2, px: 2 }}>
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
            mt: 3,
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
            DOCUMENTS SUBMITTED
          </Typography>

          <TextField
            variant="outlined"
            placeholder="Search Applicant Name / Email / Applicant ID"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
            sx={{ width: { xs: '100%', sm: '350px' }, mt: { xs: 2, sm: 0 } }}
          />
        </Box>
        <hr style={{ border: "1px solid #ccc", width: "100%" }} />


        {/* Applicant ID and Name */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            mb: 1, // small margin bottom
          }}
        >
          <Typography sx={{ fontSize: "20px", fontFamily: "Arial Black" }}>
            Applicant ID:{" "}
            <span style={{ fontFamily: "Arial", fontWeight: "normal", textDecoration: "underline" }}>
              {selectedPerson?.applicant_number || "N/A"}
            </span>
          </Typography>

          <Typography sx={{ fontSize: "20px", fontFamily: "Arial Black" }}>
            Applicant Name:{" "}
            <span style={{ fontFamily: "Arial", fontWeight: "normal", textDecoration: "underline" }}>
              {selectedPerson?.last_name?.toUpperCase()}, {selectedPerson?.first_name?.toUpperCase()}{" "}
              {selectedPerson?.middle_name?.toUpperCase()} {selectedPerson?.extension_name?.toUpperCase() || ""}
            </span>
          </Typography>

        </Box>

        {/* SHS GWA and Height row below Applicant Name */}
        <Box sx={{ px: 2, mb: 2 }}>
          {/* SHS GWA Field */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Arial Black",
                minWidth: "100px",
                mr: 1,
              }}
            >
              SHS GWA:
            </Typography>
            <TextField
              size="small"
              name="generalAverage1"
              placeholder="Enter SHS GWA"
              value={person.generalAverage1 || ""}
              sx={{ width: "300px" }}
              InputProps={{
                sx: {
                  height: 30, // control outer height
                },
              }}
              inputProps={{
                style: {
                  padding: "4px 8px", // control inner padding
                  fontSize: "12px",
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Arial Black",
                minWidth: "100px",
                mr: 1,
              }}
            >
              Height:
            </Typography>
            <TextField
              size="small"
              name="height"

              value={person.height || ""}
              sx={{ width: "100px" }}
              InputProps={{
                sx: {
                  height: 30,
                },
              }}
              inputProps={{
                style: {
                  padding: "4px 8px",
                  fontSize: "12px",
                },
              }}
            />
            <div style={{ fontSize: "12px", marginLeft: "10px" }}>cm.</div>
          </Box>
        </Box>


        <br />
        <br />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            px: 2,
          }}
        >
          {/* Left side: Applying As and Strand */}
          <Box>
            {/* Applying As */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "Arial Black",
                  minWidth: "120px",

                  mr: 4.8,
                }}
              >
                Applying As:
              </Typography>
              <TextField
                select
                size="small"
                name="applyingAs"
                value={person.applyingAs || ""}
                placeholder="Select applyingAs"
                sx={{ width: "300px" }}
                InputProps={{ sx: { height: 30 } }}
                inputProps={{ style: { padding: "4px 8px", fontSize: "12px" } }}
              >

                <MenuItem value=""><em>Select Applying</em></MenuItem>
                <MenuItem value="Senior High School Graduate">Senior High School Graduate</MenuItem>
                <MenuItem value="Senior High School Graduating Student">Senior High School Graduating Student</MenuItem>
                <MenuItem value="ALS Passer">ALS (Alternative Learning System) Passer</MenuItem>
                <MenuItem value="Transferee">Transferee from other University/College</MenuItem>
                <MenuItem value="Cross Enrolee">Cross Enrolee Student</MenuItem>
                <MenuItem value="Foreign Applicant">Foreign Applicant/Student</MenuItem>
                <MenuItem value="Baccalaureate Graduate">Baccalaureate Graduate</MenuItem>
                <MenuItem value="Master Degree Graduate">Master Degree Graduate</MenuItem>
              </TextField>
            </Box>

            {/* Document Status */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "Arial Black",
                  minWidth: "140px",
                  mr: 2.3,
                }}
              >
                Document Status:
              </Typography>
              <TextField
                select
                size="small"
                name="document_status"
                value={person.document_status || ""}
                placeholder="Select Document Status"
                onChange={handleChange} // make sure this updates state
                sx={{ width: "300px" }}
                InputProps={{ sx: { height: 30 } }}
                inputProps={{ style: { padding: "4px 8px", fontSize: "12px" } }}
              >
                <MenuItem value="">
                  <em>Select Document Status</em>
                </MenuItem>
                <MenuItem value="On process">On process</MenuItem>
                <MenuItem value="Documents Verified & ECAT">Documents Verified & ECAT</MenuItem>
                <MenuItem value="Disapproved">Disapproved</MenuItem>
                <MenuItem value="Program Closed">Program Closed</MenuItem>
              </TextField>
            </Box>

            {/* Document Type & File Upload */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2 }}>
              {/* Document Type */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: "14px", fontFamily: "Arial Black", width: "150px" }}>
                  Document Type:
                </Typography>
                <TextField
                  select
                  size="small"
                  placeholder="Select Documents"
                  value={selectedFiles.requirements_id || ''}
                  onChange={(e) =>
                    setSelectedFiles(prev => ({
                      ...prev,
                      requirements_id: e.target.value,
                    }))
                  }
                  sx={{ width: 300 }}
                  InputProps={{ sx: { height: 30 } }}
                  inputProps={{ style: { padding: "4px 8px", fontSize: "12px" } }}
                >
                  <MenuItem value="">
                    <em>Select Documents</em>
                  </MenuItem>
                  <MenuItem value={1}>PSA Birth Certificate</MenuItem>
                  <MenuItem value={2}>Form 138 (With at least 3rd Quarter posting / No failing grade)</MenuItem>
                  <MenuItem value={3}>Certificate of Good Moral Character</MenuItem>
                  <MenuItem value={4}>Certificate Belonging to Graduating Class</MenuItem>
                </TextField>
              </Box>

              {/* Document File */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: "14px", fontFamily: "Arial Black", width: "150px" }}>
                  Document File:
                </Typography>
                <TextField
                  size="small"
                  placeholder="Select File"
                  value={selectedFiles.file?.name || ''}
                  InputProps={{
                    readOnly: true,
                    sx: { height: 30 },
                  }}
                  inputProps={{ style: { padding: "4px 8px", fontSize: "12px" } }}
                  sx={{ width: 300 }}
                  onClick={() => document.getElementById("fileInput").click()}
                />
                <input
                  id="fileInput"
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    setSelectedFiles(prev => ({
                      ...prev,
                      file: e.target.files[0],
                    }))
                  }
                />
              </Box>
            </Box>


            <Button
              variant="contained"
              color="success"
              sx={{
                ml: 2,
                textTransform: "none",
                fontWeight: "bold",
                height: "35px",
                width: "200px"
              }}
              onClick={handleUploadSubmit}
              disabled={!selectedFiles.requirements_id || !selectedFiles.file}
            >
              Submit Documents
            </Button>
          </Box>

          {/* Right side: ID Photo */}
          {person.profile_img && (
            <Box
              sx={{
                width: "2in", // standard 2×2 size
                height: "2in",
                border: "1px solid #ccc",
                overflow: "hidden",
                marginTop: "-220px",
                borderRadius: "4px",
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



        <>
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#6D2323' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', textAlign: "Center" }}>Document Type</TableCell>
                  <TableCell sx={{ color: 'white', textAlign: "Center" }}>Remarks</TableCell>
                  <TableCell sx={{ color: 'white', textAlign: "Center" }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', textAlign: "Center" }}>Date and Time Submitted</TableCell>
                  <TableCell sx={{ color: 'white', textAlign: "Center" }}>User</TableCell>
                  <TableCell sx={{ color: 'white', textAlign: "Center" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requiredDocs.map(doc => renderRow(doc))}
              </TableBody>
            </Table>
          </TableContainer>


        </>

      </Box>
    </Box >
  );
};

export default StudentRequirements;