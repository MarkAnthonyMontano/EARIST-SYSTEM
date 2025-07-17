import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FcPrint } from "react-icons/fc";

const StudentList = () => {
  const { curriculum_id, dstID, courseID, professorID } = useParams();
  const [studentList, setStudent] = useState([]);
  const [classInfo, setClassInfo] = useState({
    section_Description: '',
    course_description: '',
    course_code: '',
    course_unit: '',
    fname: '',
    mname: '',
    lname: '',
    semester_description: '',
    year_level_description: '',
    day: '',
    school_time_start: '',
    school_time_end: '',
  });

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/class_roster/student_info/${curriculum_id}/${dstID}/${courseID}/${professorID}`
      );
      setStudent(response.data);
    } catch (err) {
      console.error("Error fetching student list:", err);
    }
  };

  const fetchClassInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/class_roster/classinfo/${curriculum_id}/${dstID}/${courseID}/${professorID}`
      );
      setClassInfo(response.data[0] || {});
    } catch (err) {
      console.error("Error fetching class info:", err);
    }
  };

  useEffect(() => {
    fetchStudent();
    fetchClassInfo();
  }, [curriculum_id, dstID, courseID, professorID]);

  const dayMap = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday"
  };

  const formattedDay = dayMap[classInfo.day] || classInfo.day;
  const program_code = studentList[0]?.program_code || "";

  const divToPrintRef = useRef();

  const printDiv = () => {
    const divToPrint = divToPrintRef.current;
    if (divToPrint) {
      const newWin = window.open('', 'Print-Window');
      newWin.document.open();
      newWin.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              @page {
                size: A4;
                margin: 10mm 10mm 10mm 10mm; /* reasonable print margins */
              }

              html, body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;

                width: auto;
                height: auto;
                overflow: visible;
              }

              button {
                display: none;
              }
            </style>
          </head>
          <body onload="window.print(); setTimeout(() => window.close(), 100);">
            <div class="print-container">
              ${divToPrint.innerHTML}
            </div>
          </body>
        </html>
        `);

      newWin.document.close();
    } else {
      console.error("divToPrintRef is not set.");
    }
  };
  return (
    <div className="mr-[1rem] mt-4">
      <style>
        {`
        @media print {
          button {
            display: none;
          }
        }
      `}
      </style>
      <button
        onClick={printDiv}
        style={{
          marginBottom: "1rem",
          padding: "10px 20px",
          border: "2px solid black",
          backgroundColor: "#f0f0f0",
          color: "black",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background-color 0.3s, transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#d3d3d3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FcPrint size={20} />
          Print Official Class List
        </span>
      </button>

      <div ref={divToPrintRef}>
        {studentList.length === 0 ? (
          <p>No students enrolled in this section and course.</p>
        ) : (
          <div className="w-full">
            <style>
              {`
              .top-row {
                display: flex;
              }
              .top-box {
                border: 0.5px solid black;
                padding: 4px 6px;
                font-size: 13px;
                text-align: left;
                white-space: nowrap;
                flex: 1;
              }
              table, th, td {
                border: 0.5px solid black;
                border-collapse: collapse;
              }
              th, td {
                padding: 4px 6px;
                font-size: 12px;
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              /* Make Student Name column flexible and wider on print */
              th:nth-child(2), td:nth-child(2) {
                width: 100%;         /* stretch to fill */
                max-width: none;     /* remove fixed max-width */
              }
            `}
            </style>

            {/* First row: Section | Course | Year Level | Unit */}
            <div className="top-row">
              <div className="top-box">
                <span style={{ fontWeight: "bold" }}>Section: </span>
                {program_code} - {classInfo.section_Description}
              </div>

              <div className="top-box">
                <span style={{ fontWeight: "bold" }}>Pre-req: </span>
                {classInfo.course_description} ({classInfo.course_code})
              </div>

              <div className="top-box">
                <span style={{ fontWeight: "bold" }}>Unit: </span>
                {classInfo.course_unit}
              </div>

            </div>

            {/* Second row: Time | Professor | Semester | School Year */}
            <div className="top-row">
              <div className="top-box">
                <strong>Schedule:</strong> {formattedDay}, {classInfo.school_time_start} – {classInfo.school_time_end}
              </div>
              <div className="top-box">
                <strong>Professor:</strong> {classInfo.fname} {classInfo.mname} {classInfo.lname}
              </div>
              <div className="top-box">
                <strong>Semester:</strong> {classInfo.semester_description}
              </div>

            </div>
            <div style={{ height: "20px" }}></div>
            <table className="mt-2 w-full">
              <thead>
                <tr
                  style={{
                    backgroundColor: '#800000',
                    color: 'white',
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  <th>Student Number</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Year Level</th>
                  <th>Status</th>
                </tr>
              </thead>


              <tbody>
                {studentList.map((student, index) => (
                  <tr key={index}>
                    <td>{student.student_number}</td>
                    <td>{student.first_name} {student.middle_name} {student.last_name}</td>
                    <td className="text-blue-500">
                      {student.program_description} ({student.program_code})
                    </td>
                    <td>{classInfo.year_level_description}</td>
                    <td>ENROLLED</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}
      </div>
    </div>
  );

};

export default StudentList;
