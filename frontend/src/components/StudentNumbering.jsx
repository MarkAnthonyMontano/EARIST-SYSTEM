import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Typography,
    Paper,
    TextField,
    Avatar,
} from '@mui/material';
import { Search } from '@mui/icons-material';

const StudentNumbering = () => {
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [assignedNumber, setAssignedNumber] = useState('');
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 20;
    const filteredPersons = persons.filter((person) => {
        const fullName = `${person.first_name} ${person.middle_name} ${person.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPersons = filteredPersons.slice(indexOfFirstItem, indexOfLastItem);

    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage < maxButtonsToShow - 1) {
        startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }


    const fetchPersons = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/persons');
            setPersons(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [filteredPersons.length, totalPages]);

    useEffect(() => {
        fetchPersons();
    }, []);

    const handlePersonClick = (person) => {
        setSelectedPerson(person);
        setAssignedNumber('');
        setError('');
    };

    const handleAssignNumber = async () => {
        if (!selectedPerson) return;
        try {
            const res = await axios.post('http://localhost:5000/api/assign-student-number', {
                person_id: selectedPerson.person_id,
            });
            setAssignedNumber(res.data.student_number);
            setError('');
            await fetchPersons();
            setSelectedPerson(null);
        } catch (err) {
            setError(err.response?.data || 'An error occurred.');
        }
    };

    return (
        <Box sx={{ height: 'calc(100vh - 150px)', overflowY: 'auto', pr: 1, p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" fontWeight="bold" color="maroon">
                    Assign Student Number
                </Typography>

                <Box>
                    <Typography variant="subtitle2" sx={{ color: 'black', mb: 0.5 }}>
                        Search Student Name:
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search Student Name"
                        size="small"
                        style={{ width: '500px' }}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // Corrected
                        }}

                        InputProps={{
                            startAdornment: <Search sx={{ mr: 1 }} />,
                        }}
                    />
                </Box>
            </Box>
            <hr style={{ border: "1px solid #ccc", width: "100%" }} />

            <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
                {/* Student List */}
                <Box flex={1}>
                    <Typography fontSize={16} fontWeight="bold" gutterBottom>
                        Applicant List:
                    </Typography>
                    {currentPersons.length === 0 && <Typography>No matching students.</Typography>}
                    <Box>
                        {currentPersons.map((person, index) => (
                            <Paper
                                key={person.person_id}
                                onClick={() => handlePersonClick(person)}
                                elevation={2}
                                sx={{
                                    p: 1,
                                    mb: 1,
                                    border: '2px solid #800000',
                                    color: '#800000',
                                    cursor: 'pointer',
                                    height: '50px',
                                    backgroundColor:
                                        selectedPerson?.person_id === person.person_id ? '#800000' : 'white',
                                    color:
                                        selectedPerson?.person_id === person.person_id ? 'white' : '#800000',
                                    '&:hover': {
                                        backgroundColor: '#800000',
                                        color: 'white',
                                    },
                                }}
                            >
                                <Typography>
                                    {indexOfFirstItem + index + 1}. {person.first_name} {person.middle_name}{' '}
                                    {person.last_name}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>

                {/* Selected Person + Assignment */}
                <Box flex={1}>
                    <Typography  fontSize={16} fontWeight="bold" gutterBottom>
                        Selected Person
                    </Typography>

                    {selectedPerson ? (
                        <Box>
                            <Typography style={{ fontSize: "25px" }}>
                                <strong >Name:</strong> {selectedPerson.first_name} {selectedPerson.middle_name}{' '}
                                {selectedPerson.last_name}
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#800000',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#5e0000',
                                    },
                                }}
                                onClick={handleAssignNumber}
                            >
                                Assign Student Number
                            </Button>
                        </Box>
                    ) : (
                        <Typography>No person selected.</Typography>
                    )}

                    {assignedNumber && (
                        <Typography mt={2} color="green">
                            <strong>Assigned Student Number:</strong> {assignedNumber}
                        </Typography>
                    )}

                    {error && (
                        <Typography mt={2} color="error">
                            {error}
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "right", mt: 3, flexWrap: "wrap", gap: 1 }}>
                {currentPage > 1 && (
                    <>
                        <Button
                            onClick={() => setCurrentPage(1)}
                            variant="outlined"
                            sx={{ borderColor: "maroon", color: "maroon" }}
                        >
                            First
                        </Button>
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            variant="outlined"
                            sx={{ borderColor: "maroon", color: "maroon" }}
                        >
                            Prev
                        </Button>
                    </>
                )}

                {visiblePages.map((pageNum) => (
                    <Button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        variant={currentPage === pageNum ? "contained" : "outlined"}
                        sx={{
                            backgroundColor: currentPage === pageNum ? "maroon" : "transparent",
                            color: currentPage === pageNum ? "white" : "maroon",
                            borderColor: "maroon",
                            minWidth: "36px",
                        }}
                    >
                        {pageNum}
                    </Button>
                ))}

                {currentPage < totalPages && (
                    <>
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            variant="outlined"
                            disabled={currentPage === totalPages}
                            sx={{ borderColor: "maroon", color: "maroon" }}
                        >
                            Next
                        </Button>
                        <Button
                            onClick={() => setCurrentPage(totalPages)}
                            variant="outlined"
                            disabled={currentPage === totalPages}
                            sx={{ borderColor: "maroon", color: "maroon" }}
                        >
                            Last
                        </Button>
                    </>
                )}
            </Box>

        </Box>
    );
};

export default StudentNumbering;