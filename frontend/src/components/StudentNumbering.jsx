import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Paper } from '@mui/material';

const StudentNumbering = () => {
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [assignedNumber, setAssignedNumber] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPersons();
    }, []);

    const fetchPersons = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/persons');
            setPersons(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePersonClick = (person) => {
        setSelectedPerson(person);
        setAssignedNumber('');
        setError('');
    };

    const handleAssignNumber = async () => {
        if (!selectedPerson) return;
        try {
            const res = await axios.post('http://localhost:5000/api/assign-student-number', {
                person_id: selectedPerson.person_id
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
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="#800000" gutterBottom>
                Assign Student Number
            </Typography>

            <Box display="flex" gap={4}>
                {/* Person List */}
                <Box flex={1}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Student List:
                    </Typography>
                    {persons.length === 0 && <Typography>No available persons.</Typography>}
                    <Box sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {persons.map((person, index) => (
                            <Paper
                                key={person.person_id}
                                onClick={() => handlePersonClick(person)}
                                elevation={2}
                                sx={{
                                    p: 2,
                                    mb: 2,
                                    border: '2px solid #800000',
                                    color: '#800000',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#800000',
                                        color: 'white',
                                    },
                                }}
                            >
                                <Typography>
                                    {index + 1}. {person.first_name} {person.middle_name} {person.last_name}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>

                {/* Selected Person + Result */}
                <Box flex={1}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Selected Person
                    </Typography>

                    {selectedPerson ? (
                        <Box>
                            <Typography>
                                <strong>Name:</strong> {selectedPerson.first_name} {selectedPerson.middle_name} {selectedPerson.last_name}
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
        </Box>
    );
};

export default StudentNumbering;
