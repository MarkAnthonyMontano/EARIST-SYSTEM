import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import axios from "axios";

const FacultyList = () => {
  const [professors, setProfessors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({
    person_id: "",
    fname: "",
    mname: "",
    lname: "",
    email: "",
    password: "",
    role: "faculty",
    profileImage: null,
  });

  const fetchProfessors = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/professors");
      if (Array.isArray(res.data)) {
        setProfessors(res.data);
      } else {
        setProfessors([]);
        console.error("Unexpected data format:", res.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setProfessors([]);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setForm({ ...form, profileImage: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    try {
      if (editData) {
        await axios.put(`http://localhost:3000/api/update_prof/${editData.prof_id}`, formData);
      } else {
        await axios.post("http://localhost:3000/api/register_prof", formData);
      }
      fetchProfessors();
      handleCloseDialog();
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const handleEdit = (prof) => {
    setEditData(prof);
    setForm({
      person_id: prof.person_id || "",
      fname: prof.fname || "",
      mname: prof.mname || "",
      lname: prof.lname || "",
      email: prof.email || "",
      password: "",
      role: prof.role || "faculty",
      profileImage: null,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditData(null);
    setForm({
      person_id: "",
      fname: "",
      mname: "",
      lname: "",
      email: "",
      password: "",
      role: "faculty",
      profileImage: null,
    });
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Faculty List
      </Typography>
      <Button
        startIcon={<Add />}
        variant="contained"
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
      >
        Add Professor
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Person ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professors.map((prof) => (
            <TableRow key={prof.prof_id}>
              <TableCell>{prof.person_id ?? "N/A"}</TableCell>
              <TableCell>
                <Avatar
                  src={
                    prof.profile_image
                      ? `http://localhost:3000/uploads/${prof.profile_image}`
                      : undefined
                  }
                  alt={prof.fname}
                  sx={{ width: 60, height: 60 }}
                >
                  {prof.fname?.[0]}
                </Avatar>
              </TableCell>
              <TableCell>{`${prof.fname} ${prof.mname || ""} ${prof.lname}`}</TableCell>
              <TableCell>{prof.email}</TableCell>
              <TableCell>{prof.status === 0 ? "Inactive" : "Active"}</TableCell>
              <TableCell>{prof.role}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(prof)}>
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{editData ? "Edit Professor" : "Add Professor"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Person ID" name="person_id" value={form.person_id} onChange={handleChange} />
          <TextField label="First Name" name="fname" value={form.fname} onChange={handleChange} required />
          <TextField label="Middle Name" name="mname" value={form.mname} onChange={handleChange} />
          <TextField label="Last Name" name="lname" value={form.lname} onChange={handleChange} required />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} required />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required={!editData}
          />
          <TextField label="Role" name="role" value={form.role} onChange={handleChange} />
          <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editData ? "Update" : "Register"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FacultyList;
