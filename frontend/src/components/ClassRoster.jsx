import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ClassRoster = () => {
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_department');
      setDepartments(response.data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  // Fetch programs by department
  const fetchPrograms = async (deptId) => {
    setSelectedDept(deptId);
    try {
      const response = await axios.get(`http://localhost:5000/class_roster/ccs/${deptId}`);
      setPrograms(response.data);
    } catch (err) {
      console.error('Error fetching programs:', err);
      setPrograms([]);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#800000"
        textAlign="center"
        gutterBottom
      >
        Class Roster
      </Typography>

      <Typography variant="h6" fontWeight="600" gutterBottom>
        Select a Department:
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {departments.map(dept => (
          <button
            key={dept.dprtmnt_id}
            onClick={() => fetchPrograms(dept.dprtmnt_id)}
            className={`p-2 w-[100px] border border-black rounded font-semibold 
              ${selectedDept === dept.dprtmnt_id ? 'bg-[#800000] text-white' : 'text-black bg-white'}`}
          >
            {dept.dprtmnt_code}
          </button>
        ))}
      </Box>

      {/* Program Section */}
      <Box mt={4}>
        {selectedDept && programs.length === 0 && (
          <Typography color="text.secondary" fontStyle="italic">
            There are no programs in the selected department.
          </Typography>
        )}

        {programs.length > 0 && (
          <>
            <Typography fontWeight="bold" mb={1}>
              {programs[0].dprtmnt_name} ({programs[0].dprtmnt_code})
            </Typography>

            {programs.map(program => (
              <Box key={program.program_id} mb={1}>
                <Link
                  to={`class_list/ccs/${program.curriculum_id}`}
                  className="text-blue-600 hover:underline"
                >
                  {program.program_description} ({program.program_code})
                </Link>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ClassRoster;
