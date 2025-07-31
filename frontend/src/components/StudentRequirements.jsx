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


const requiredDocs = [
  { label: 'PSA Birth Certificate', key: 'BirthCertificate' },
  { label: 'Form 138 (4th Quarter / No failing Grades)', key: 'Form138' },
  { label: 'Certificate of Good Moral Character', key: 'GoodMoralCharacter' },
  { label: 'Certificate Belonging to Graduating Class', key: 'CertificateOfGraduatingClass' }
];

const vaccineDoc = { label: 'Copy of Vaccine Card (1st and 2nd Dose)', key: 'VaccineCard' };

const StudentRequirements = () => {
  const [uploads, setUploads] = useState([]);
  const [persons, setPersons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState({});
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [applicantID, setApplicantID] = useState("");
  const [remarksMap, setRemarksMap] = useState({});
  const [userID, setUserID] = useState("");

  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [person, setPerson] = useState({
    profile_img: "",
    generalAverage1: "",
    height: "",
    schoolLevel1: "",
    strand: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    extension: "",
  });
  const [editingRemarkId, setEditingRemarkId] = useState(null); 

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
        schoolLevel1: "",
        strand: "",
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
        schoolLevel1: "",
        strand: "",
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
          <Button sx={{ width: 65, height: 65, borderRadius: '50%', '&:hover': { backgroundColor: '#E8C999' } }}>
            <NotificationsIcon sx={{ fontSize: 50, color: 'white' }} />
          </Button>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start", // left align
            alignItems: "center",
            gap: 4,
            px: 2,
            mb: 2, // margin bottom before image
          }}
        >
          <Typography sx={{ fontSize: "12px", fontFamily: "Arial Black" }}>
            SHS GWA:{" "}
            <span style={{ fontFamily: "Arial", fontWeight: "normal", textDecoration: "underline" }}>
              {person.generalAverage1 || "N/A"}
            </span>
          </Typography>

          <Typography sx={{ fontSize: "12px", fontFamily: "Arial Black" }}>
            Height:{" "}
            <span style={{ fontFamily: "Arial", fontWeight: "normal", textDecoration: "underline" }}>
              {person.height || "N/A"} cm
            </span>
          </Typography>

        </Box>



        {/* Applying As, Strand, and ID Photo side by side */}
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
            <Typography sx={{ fontSize: "14px", fontFamily: "Arial Black" }}>
              Applying As:{" "}
              <span style={{ fontFamily: "Arial", fontWeight: "normal", textDecoration: "underline" }}>
                {person.schoolLevel1 || "N/A"}
              </span>
            </Typography>

            <Typography sx={{ fontSize: "14px", fontFamily: "Arial Black" }}>
              Document Status:{" "}
              <span style={{ fontFamily: "Arial", fontWeight: "normal", textDecoration: "underline" }}>
                {person.strand || "N/A"}
              </span>
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              {/* Document Type */}
              <Box sx={{ display: 'flex', alignItems: 'center', }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Arial Black",
                    width: "150px", // fix label width for alignment
                  }}
                >
                  Document Type:
                </Typography>
                <TextField
                  select
                  size="small"
                  label="Select Documents"
                  value={selectedFiles.requirements_id || ''}
                  onChange={(e) =>
                    setSelectedFiles((prev) => ({
                      ...prev,
                      requirements_id: e.target.value,
                    }))
                  }
                  sx={{ width: 300 }}
                >
                  <MenuItem value=""><em>Select Documents</em></MenuItem>
                  <MenuItem value={1}>PSA Birth Certificate</MenuItem>
                  <MenuItem value={2}>Form 138 (4th Quarter / No failing Grades)</MenuItem>
                  <MenuItem value={3}>Certificate of Good Moral Character</MenuItem>
                  <MenuItem value={4}>Certificate Belonging to Graduating Class</MenuItem>
                  <MenuItem value={5}>Copy of Vaccine Card (1st and 2nd Dose)</MenuItem>
                </TextField>
              </Box>

              {/* Document File */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Arial Black",
                    width: "150px", // same as above for alignment
                  }}
                >
                  Document File:
                </Typography>

                <TextField
                  size="small"
                  label="Select File"
                  value={selectedFiles.file?.name || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ width: 300 }}
                  onClick={() => document.getElementById("fileInput").click()}
                />

                <input
                  id="fileInput"
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    setSelectedFiles((prev) => ({
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
                width: "140px"
              }}
              onClick={handleUploadSubmit}
              disabled={!selectedFiles.requirements_id || !selectedFiles.file}
            >
              Upload
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

          <Typography variant="h6" sx={{ mt: 2, color: '#6D2323' }}>
            Upload Your Medical Documents
          </Typography>

          <TableContainer component={Paper} sx={{ width: '100%', mt: 2 }}>
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
              <TableBody>{renderRow(vaccineDoc)}</TableBody>
            </Table>
          </TableContainer>
        </>

      </Box>
    </Box>
  );
};

export default StudentRequirements;