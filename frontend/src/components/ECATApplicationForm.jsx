import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Container, } from "@mui/material";
import EaristLogo from "../assets/EaristLogo.png";
import axios from "axios";

const ECATApplicationForm = () => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [person, setPerson] = useState({
    profile_img: "",
    campus: "",
    academicProgram: "",
    classifiedAs: "",
    program: "",
    program2: "",
    program3: "",
    yearLevel: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    extension: "",
    nickname: "",
    height: "",
    weight: "",
    lrnNumber: "",
    gender: "",
    pwdType: "",
    pwdId: "",
    birthOfDate: "",
    age: "",
    birthPlace: "",
    languageDialectSpoken: "",
    citizenship: "",
    religion: "",
    civilStatus: "",
    tribeEthnicGroup: "",
    otherEthnicGroup: "",
    cellphoneNumber: "",
    emailAddress: "",
    telephoneNumber: "",
    facebookAccount: "",
    presentStreet: "",
    presentBarangay: "",
    presentZipCode: "",
    presentRegion: "",
    presentProvince: "",
    presentMunicipality: "",
    presentDswdHouseholdNumber: "",
    permanentStreet: "",
    permanentBarangay: "",
    permanentZipCode: "",
    permanentRegion: "",
    permanentProvince: "",
    permanentMunicipality: "",
    permanentDswdHouseholdNumber: "",
    father_deceased: "",
    father_family_name: "", father_given_name: "", father_middle_name: "", father_ext: "", father_contact: "", father_occupation: "",
    father_income: "", father_email: "", mother_deceased: "", mother_family_name: "", mother_given_name: "", mother_middle_name: "",
    mother_contact: "", mother_occupation: "", mother_income: "", guardian: "", guardian_family_name: "", guardian_given_name: "",
    guardian_middle_name: "", guardian_ext: "", guardian_nickname: "", guardian_address: "", guardian_contact: "", guardian_email: "",
  });
  // ✅ Fetch person data from backend
  const fetchPersonData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/person/${id}`);
      setPerson(res.data); // make sure backend returns the correct format
    } catch (error) {
      console.error("Failed to fetch person:", error);
    }
  };

  // ✅ Run only once on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");
    const storedID = localStorage.getItem("person_id");

    if (storedUser && storedRole && storedID) {
      setUser(storedUser);
      setUserRole(storedRole);
      setUserID(storedID);

      if (storedRole !== "applicant") {
        window.location.href = "/login";
      } else {
        fetchPersonData(storedID); // ✅ THIS fetches specific user data
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  const [shortDate, setShortDate] = useState("");


  useEffect(() => {
    const updateDates = () => {
      const now = new Date();

      // Format 1: MM/DD/YYYY
      const formattedShort = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}/${now.getFullYear()}`;
      setShortDate(formattedShort);

      // Format 2: MM DD, YYYY hh:mm:ss AM/PM
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours() % 12 || 12).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";


    };

    updateDates(); // Set initial values
    const interval = setInterval(updateDates, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

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
        margin-top: -115px;
        padding: 0;
        font-family: Arial, sans-serif;
        width: auto;
        height: auto;
        overflow: visible;
      }

      .print-container {
        width: 100%;
        box-sizing: border-box;
      }

         .student-table {
    margin-top: -100px !important;
  }


      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
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

  const [curriculumOptions, setCurriculumOptions] = useState([]);

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/applied_program");
        setCurriculumOptions(response.data);
      } catch (error) {
        console.error("Error fetching curriculum options:", error);
      }
    };

    fetchCurriculums();
  }, []);

  console.log("person.program:", person.program);
  console.log("curriculumOptions:", curriculumOptions);

  {
    curriculumOptions.find(
      (item) => item.curriculum_id.toString() === person.program.toString()
    )?.program_description || person.program
  }



  return (

    <Box sx={{ height: 'calc(100vh - 120px)', overflowY: 'auto', paddingRight: 1, backgroundColor: 'transparent' }}>
      <div ref={divToPrintRef}>
        <div>
          <style>
            {`
          @media print {
            button {
              display: none;
            }
          }
        `}
          </style>


        </div>
        <Container>
          <h1 style={{ fontSize: "40px", fontWeight: "bold", textAlign: "Left", color: "maroon", marginTop: "25px" }}> ECAT APPLICATION FORM</h1>
          <hr style={{ border: "1px solid #ccc", width: "44%" }} />
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
            Print Table
          </button>
        </Container>

        <Container>

          <Container>
            <br />



          </Container>
          <br />



          <form>

            <table
              className="student-table"
              style={{

                borderCollapse: "collapse",
                fontFamily: "Arial, Helvetica, sans-serif",
                width: "8in",
                margin: "0 auto",
                textAlign: "center",
                tableLayout: "fixed",
              }}
            >
              <tbody>



                {/* Title: PERSONAL DATA FORM */}

                <tr>
                  <td colSpan={40} style={{ border: "2px solid black", padding: 0 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody>
                        <tr>
                          {/* LEFT - Logo */}
                          <td colSpan={9} style={{ textAlign: "center" }}>
                            <img
                              src={EaristLogo}
                              alt="Earist Logo"
                              style={{
                                width: "120px",
                                height: "120px",
                                display: "block",
                                marginTop: "-7px",
                              }}
                            />
                          </td>

                          {/* CENTER - School Info */}
                          <td colSpan={15} style={{ textAlign: "center", fontFamily: "Arial", fontSize: "10px", lineHeight: "1.5", }}>
                            <div style={{ fontSize: "12px", letterSpacing: "1px", fontFamily: "Arial", }}>Republic of the Philippines</div>
                            <div style={{ fontSize: "12px", letterSpacing: "1px", fontFamily: "Arial", }}><b>EULOGIO "AMANG" RODRIGUEZ</b></div>
                            <div style={{ fontSize: "12px", letterSpacing: "1px", fontFamily: "Arial", }}><b>INSTITUTE OF SCIENCE AND TECHNOLOGY </b></div>
                            <div style={{ fontSize: "12px", letterSpacing: "1px", fontFamily: "Arial", }}>Nagtahan, Sampaloc, Manila 1008</div>
                            <div style={{ fontSize: "10px", fontFamily: "Arial", }}><b>STUDENT ADMISSION REGISTRATION AND RECORDS MANAGEMENT SERVICES</b></div>

                            <div style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "1px" }}>
                              ECAT APPLICATION FORM
                            </div>
                          </td>

                          {/* RIGHT - Document Metadata Table */}
                          <td colSpan={15} style={{ padding: 0 }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif", textAlign: "Left", fontSize: "11px" }}>
                              <tbody>
                                {[
                                  "Document No.",
                                  "Revision No.",
                                  "Process Type:",
                                  "Effective Date:",
                                ].map((label, index) => (
                                  <tr key={index}>
                                    <td style={{ border: "2px solid black", padding: "4px", fontWeight: "bold" }}>{label}</td>
                                    <td style={{ border: "2px solid black", padding: "4px" }}>
                                      <input
                                        type="text"
                                        style={{
                                          width: "100%",
                                          border: "none",
                                          outline: "none",
                                          fontSize: "12px",
                                          textAlign: "left",
                                          background: "none",
                                        }}
                                      />
                                    </td>
                                  </tr>
                                ))}

                                {/* Page Number */}
                                <tr>
                                  <td colSpan={2} style={{ border: "2px solid black", textAlign: "center", padding: "4px", fontWeight: "bold" }}>
                                    Page 1 of 1
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={40} style={{
                    height: "20px",            // Adjust height as needed

                    padding: 0,
                    border: "none"
                  }}></td>
                </tr>


                <tr>
                  <td colSpan={40} style={{ padding: 0, border: "none" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontFamily: "Arial, sans-serif",
                        tableLayout: "fixed",
                      }}
                    >
                      <tbody>
                        {/* First row: Applicant Instructions + Course Applied For */}
                        <tr>
                          <td
                            colSpan={24}
                            rowSpan={3}
                            style={{
                              border: "2px solid black",
                              borderRight: "2px solid black",
                              textAlign: "justify",
                              padding: "8px",
                              fontWeight: "bold",
                              fontSize: "10px",
                              verticalAlign: "top",
                            }}
                          >
                            TO THE APPLICANT<br />
                            Read carefully the ECAT Guidelines and Requirements before accomplishing this form.
                            <br />
                            Please write LEGIBLY and CORRECTLY in PRINT LETTERS without erasures.
                            <br />
                            ONLY APPLICATION FORMS ACCOMPLISHED CORRECTLY AND COMPLETELY WILL BE PROCESSED.
                          </td>
                          <td colSpan={1}></td>
                          <td
                            colSpan={15}
                            style={{
                              border: "2px solid black",
                              borderRight: "2px solid black",
                              textAlign: "left",
                              padding: "8px",
                              fontWeight: "bold",
                              fontSize: "10px",
                              verticalAlign: "top",
                            }}
                          >
                            COURSE APPLIED FOR (Preferred Course):
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={1}></td>
                          <td
                            colSpan={15}
                            style={{
                              border: "2px solid black",
                              borderRight: "2px solid black",
                              textAlign: "left",
                              padding: "8px",
                              fontWeight: "bold",
                              fontSize: "10px",
                              verticalAlign: "top",
                            }}
                          >
                            Course & Major: <br />
                            {
                              curriculumOptions.length > 0
                                ? curriculumOptions.find(
                                  (item) => item.curriculum_id.toString() === person.program.toString()
                                )?.program_description || person.program
                                : "Loading..."
                            }
                          </td>
                        </tr>



                      </tbody>
                    </table>
                  </td>
                </tr>

                <br />
                <tr>
                  {/* Entry Status Section */}
                  <td colSpan={20} style={{
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    fontFamily: "Arial, sans-serif",
                    verticalAlign: "top"
                  }}>
                    <div style={{ marginBottom: "5px" }}>ENTRY STATUS</div><br />
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      ( ) Currently Enrolled as Grade 12 Student <br />
                      ( )  Senior High School Graduate <br />
                      ( ) ALS Passer (equivalent to Senior High)
                    </div>
                  </td>

                  {/* Date Section */}
                  <td colSpan={20} style={{
                    textAlign: "left",
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                    fontFamily: "Arial, sans-serif",
                    verticalAlign: "top"
                  }}>
                    <br />
                    <br />
                    <div>
                      Date of Graduation:
                      <input
                        type="text"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "66.7%",
                          marginLeft: "10px",
                          fontSize: "12px",
                          fontFamily: "Arial, sans-serif",
                          background: "none",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      Year Graduated:
                      <input
                        type="text"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "70.6%",
                          marginLeft: "15px",
                          fontSize: "12px",
                          fontFamily: "Arial, sans-serif",
                          background: "none",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      ( ) Transferee from:
                      <input
                        type="text"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "67%",
                          marginLeft: "10px",
                          fontSize: "12px",
                          fontFamily: "Arial, sans-serif",
                          background: "none",
                          outline: "none"
                        }}
                      />
                    </div>
                  </td>
                </tr>
                <br />

                <tr>
                  <td
                    colSpan={40}
                    style={{
                      height: "0.2in",
                      fontSize: "72.5%",

                      color: "white",
                    }}
                  >
                    <b>
                      <b style={{
                        color: "black",
                        fontFamily: "Times new Roman",
                        fontSize: '15px',
                        textAlign: "center",
                        display: "block",
                        fontStyle: 'italic',
                        border: "2px solid black"
                      }}>
                        {"\u00A0\u00A0"}PERSONAL INFORMATION (Please print your name as written in your NSO/PSA Birth Certificate)
                      </b>

                    </b>
                  </td>
                </tr>
                <br />
                <tr>
                  <td colSpan={40} style={{ fontFamily: "Times New Roman", fontSize: "15px", paddingTop: "5px" }}>
                    <span style={{ fontWeight: "bold", marginRight: "10px", marginLeft: "1px" }}>Name:</span>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "88%",
                        position: "relative",
                        paddingBottom: "5px", // creates space for labels
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", top: "-10px", width: "100%" }}>
                        <div style={{ width: "20%", textAlign: "center" }}>{person.last_name}</div>
                        <div style={{ width: "20%", textAlign: "center" }}>{person.first_name}</div>
                        <div style={{ width: "20%", textAlign: "center" }}>{person.middle_name}</div>
                        <div style={{ width: "20%", textAlign: "center" }}>{person.extension}</div>
                        <div style={{ width: "20%", textAlign: "center" }}>{person.nickname}</div>
                      </div>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan={40}
                    style={{
                      fontFamily: "Times New Roman",
                      fontSize: "14px",
                      paddingTop: "2px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "87%",
                        marginLeft: "45px",
                      }}
                    >
                      <span style={{ width: "20%", textAlign: "center" }}>Last Name</span>
                      <span style={{ width: "20%", textAlign: "center" }}>Given Name</span>
                      <span style={{ width: "20%", textAlign: "center" }}>Middle Name</span>
                      <span style={{ width: "20%", textAlign: "center" }}>Ext. Name</span>
                      <span style={{ width: "20%", textAlign: "center" }}>Nickname</span>
                    </div>
                  </td>
                </tr>


                <br />

                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                  {/* Gender */}
                  <td colSpan={13} style={{ position: "relative" }}>
                    <b>Gender:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "120px",
                        marginLeft: "10px",
                        position: "relative",
                        paddingTop: "18px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: "0",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.gender === 0 ? "Male" : person.gender === 1 ? "Female" : ""}
                      </div>
                    </span>
                  </td>


                  {/* Civil Status */}
                  <td colSpan={14} style={{ position: "relative" }}>
                    <b>Civil Status:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "150px",
                        marginLeft: "10px",
                        position: "relative",
                        paddingTop: "18px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: "0",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.civilStatus}
                      </div>
                    </span>
                  </td>

                  <td colSpan={13} style={{ position: "relative" }}>
                    <b>Date of Birth:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "100px",
                        marginLeft: "10px",
                        position: "relative",
                        paddingTop: "18px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: "0",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.birthOfDate &&
                          new Date(person.birthOfDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                      </div>
                    </span>
                  </td>

                </tr>
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                  {/* Place of Birth */}
                  <td colSpan={13} style={{ position: "relative" }}>
                    <b>Place of Birth:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "120px",
                        marginLeft: "10px",
                        position: "relative",
                        paddingTop: "12px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-5px",
                          left: "0",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.birthPlace}
                      </div>
                    </span>
                  </td>

                  {/* Nationality */}
                  <td colSpan={14} style={{ position: "relative" }}>
                    <b>Nationality:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "150px",
                        marginLeft: "10px",
                        position: "relative",
                        paddingTop: "12px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-5px",
                          left: "0",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.citizenship}
                      </div>
                    </span>
                  </td>

                  {/* Religion */}
                  <td colSpan={13} style={{ position: "relative" }}>
                    <b>Religion:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "100px",
                        marginLeft: "10px",
                        position: "relative",
                        paddingTop: "12px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-5px",
                          left: "0",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.religion}
                      </div>
                    </span>
                  </td>
                </tr>
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                  {/* Cel / Tel No. */}
                  <td colSpan={20} style={{ position: "relative" }}>
                    <b>Cel / Tel No.:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "280px",
                        marginLeft: "10px",
                        position: "relative",
                        paddingTop: "12px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-5px",
                          left: "0",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.cellphoneNumber}
                      </div>
                    </span>
                  </td>

                  {/* Email Address */}
                  <td colSpan={20} style={{ position: "relative" }}>
                    <b>Email Address:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "240px",
                        marginLeft: "10px",
                        position: "relative",
                        paddingTop: "12px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-5px",
                          left: "0",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.emailAddress}
                      </div>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td colSpan={40} style={{ fontFamily: "Times New Roman", fontSize: "15px", paddingTop: "5px" }}>
                    <span style={{ fontWeight: "bold", marginRight: "30px" }}>Permanent Address:</span>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "75%",
                        position: "relative",
                        paddingBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          position: "absolute",
                          top: "-5px",
                          width: "100%",
                        }}
                      >
                        <div style={{ width: "25%", fontSize: "12px", fontFamily: "Times new roman", textAlign: "center" }}>{person.presentStreet}</div>
                        <div style={{ width: "20%", fontSize: "12px", fontFamily: "Times new roman", textAlign: "center" }}>{person.presentBarangay}</div>
                        <div style={{ width: "20%", fontSize: "12px", fontFamily: "Times new roman", textAlign: "center" }}>{person.presentMunicipality}</div>
                        <div style={{ width: "30%", fontSize: "12px", fontFamily: "Times new roman", textAlign: "center" }}>{person.presentProvince}</div>
                        <div style={{ width: "20%", fontSize: "12px", fontFamily: "Times new roman", textAlign: "center" }}>{person.presentZipCode}</div>
                      </div>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td colSpan={40} style={{ fontFamily: "Times New Roman", fontSize: "14px", paddingTop: "2px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "75%",
                        marginLeft: "173px", // aligns labels under the span
                      }}
                    >
                      <span style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}>No. Street</span>
                      <span style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}>Barangay</span>
                      <span style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}>City</span>
                      <span style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}>Province</span>
                      <span style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}>Zipcode</span>
                    </div>
                  </td>
                </tr>

                <br />
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b style={{ marginRight: "50px" }}>Residence:</b>{" "}
                    <span style={{ marginRight: "20px" }}>( ) With Parents</span>
                    <span style={{ marginRight: "20px" }}>( ) With Relatives</span>
                    <span style={{ marginRight: "20px" }}>( ) With Guardian</span>
                    <span>( ) Boarding</span>
                  </td>
                </tr>
                <br />
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Are you a member of any indigenous group?</b>{" "}
                    {person.tribeEthnicGroup === "Others" ? (
                      <>
                        (✓) YES ( ) NO If YES, please specify{" "}
                        <span
                          style={{
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            width: "200px",
                            marginLeft: "10px"
                          }}
                        >
                          {person.otherEthnicGroup?.trim()}
                        </span>
                      </>
                    ) : (
                      <>
                        ( ) YES (✓) NO If YES, please specify{" "}
                        <span
                          style={{
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            width: "200px",
                            marginLeft: "10px"
                          }}
                        ></span>
                      </>
                    )}
                  </td>
                </tr>



                <br />

                <tr>
                  <td
                    colSpan={40}
                    style={{
                      height: "0.2in",
                      fontSize: "72.5%",

                      color: "white",
                    }}
                  >
                    <b>
                      <b style={{
                        color: "black",
                        fontFamily: "Times new Roman",
                        fontSize: '15px',
                        textAlign: "center",
                        display: "block",
                        fontStyle: 'italic',
                        border: "2px solid black"
                      }}>
                        {"\u00A0\u00A0"}FAMILY BACKGROUND
                      </b>

                    </b>
                  </td>
                </tr>
                <br />
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Father's Name:</b>
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "360px",
                        marginLeft: "10px",
                        marginRight: "15px",
                        fontFamily: "times new roman",

                        fontSize: "14px",

                      }}
                    >
                      {`${person.father_given_name || ""} ${person.father_middle_name || ""} ${person.father_family_name || ""} ${person.father_ext || ""}`.toUpperCase()}

                    </span>
                    <span style={{ fontWeight: "normal", fontSize: "14px" }}>
                      ({person.father_deceased === "No" ? "✓" : " "}) Living&nbsp;&nbsp;
                      ({person.father_deceased === "Yes" ? "✓" : " "}) Deceased
                    </span>

                  </td>
                </tr>

                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Occupation:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "150px",
                        marginLeft: "10px",
                        fontFamily: "times new roman",


                        fontSize: "14px"
                      }}
                    >
                      {person.father_occupation}
                    </span>{" "}
                    <b>Monthly Income:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "150px",
                        marginLeft: "10px",
                        fontFamily: "times new roman",

                        fontSize: "14px"
                      }}
                    >
                      {person.father_income}
                    </span>{" "}
                    <b>Contact No:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "145px",
                        marginLeft: "10px",
                        fontFamily: "times new roman",

                        fontSize: "14px"
                      }}
                    >
                      {person.father_contact}
                    </span>
                  </td>
                </tr>

                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Mother's Name:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "350px",
                        marginLeft: "10px",
                        marginRight: "15px",
                        fontFamily: "times new roman",
                        fontSize: "14px",

                      }}
                    >
                      {`${person.mother_given_name || ""} ${person.mother_middle_name || ""} ${person.mother_family_name || ""}`.toUpperCase()}

                    </span>{" "}
                    <span style={{ fontWeight: "normal", fontSize: "14px" }}>
                      ({person.mother_deceased === "No" ? "✓" : " "}) Living&nbsp;&nbsp;
                      ({person.mother_deceased === "Yes" ? "✓" : " "}) Deceased
                    </span>

                  </td>
                </tr>

                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Occupation:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "150px",
                        marginLeft: "10px",
                        fontFamily: "Times New Roman",
                        fontSize: "14px"
                      }}
                    >
                      {person.mother_occupation}
                    </span>{" "}
                    <b>Monthly Income:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "150px",
                        marginLeft: "10px",
                        fontFamily: "Times New Roman",
                        fontSize: "14px"
                      }}
                    >
                      {person.mother_income}
                    </span>{" "}
                    <b>Contact No:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "145px",
                        marginLeft: "10px",
                        fontFamily: "Times New Roman",
                        fontSize: "14px"
                      }}
                    >
                      {person.mother_contact}
                    </span>
                  </td>
                </tr>

                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Guardian's Name:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "200px",
                        marginLeft: "10px",

                        fontSize: "14px",
                        fontFamily: "Times New Roman"
                      }}
                    >
                      {`${person.guardian_given_name || ""} ${person.guardian_middle_name || ""} ${person.guardian_family_name || ""} ${person.guardian_ext || ""}`.toUpperCase()}

                    </span>{" "}
                    <b>Relationship to the Applicant:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "220px",
                        marginLeft: "10px",

                        fontSize: "14px",
                        fontFamily: "Times New Roman"
                      }}
                    >
                      Guardian
                    </span>
                  </td>
                </tr>

                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Occupation:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "150px",
                        marginLeft: "10px",
                      }}
                    ></span>{" "}
                    <b>Monthly Income:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "150px",
                        marginLeft: "10px",
                      }}
                    >
                      0
                    </span>{" "}
                    <b>Contact No:</b>{" "}
                    <span
                      style={{
                        borderBottom: "1px solid black",
                        display: "inline-block",
                        width: "145px",
                        marginLeft: "10px",
                      }}
                    >
                      {person.guardian_contact}
                    </span>
                  </td>
                </tr>

                <br />








                <tr>
                  <td
                    colSpan={40}
                    style={{
                      height: "0.2in",
                      fontSize: "72.5%",

                      color: "white",
                    }}
                  >
                    <b>
                      <b style={{
                        color: "black",
                        fontFamily: "Times new Roman",
                        fontSize: '15px',
                        textAlign: "center",
                        display: "block",
                        fontStyle: 'italic',
                        border: "2px solid black"
                      }}>
                        {"\u00A0\u00A0"}EDUCATIONAL BACKGROUND
                      </b>

                    </b>
                  </td>
                </tr>
                <br />
                {/* Line 1 */}
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Last school attended or where you are currently completing Secondary Level Education:</b>
                  </td>
                </tr>

                {/* Line 2 */}
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Name of School:</b>{" "}
                    <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "653px" }}></span>
                  </td>
                </tr>

                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  {/* Complete Address */}
                  <td colSpan={20}>
                    <b>Complete Address:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "225px",
                        position: "relative",
                        paddingBottom: "5px",
                        marginLeft: "10px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-6px",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.completeAddress}
                      </div>
                    </span>
                  </td>

                  {/* LRN */}
                  <td colSpan={20}>
                    <b>Learner's Reference No.:</b>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid black",
                        width: "53%",
                        position: "relative",
                        paddingBottom: "5px",
                        marginLeft: "10px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {person.lrnNumber}
                      </div>
                    </span>
                  </td>
                </tr>


                {/* Line 4 */}
                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>Do you have any PHYSICAL DISABILITY OR CONDITION that requires special attention or</b>
                  </td>
                </tr>

                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px", textAlign: "left" }}>
                  <td colSpan={40}>
                    <b>would make it difficult for you to take a regular test?</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {[
                      "Blindness", "Low-vision", "Leprosy Cured persons", "Hearing Impairment", "Locomotor Disability",
                      "Dwarfism", "Intellectual Disability", "Mental Illness", "Autism Spectrum Disorder", "Cerebral Palsy",
                      "Muscular Dystrophy", "Chronic Neurological conditions", "Specific Learning Disabilities",
                      "Multiple Sclerosis", "Speech and Language disability", "Thalassemia", "Hemophilia",
                      "Sickle cell disease", "Multiple Disabilities including"
                    ].includes(person.pwdType) ? (
                      <>
                        ( ) NO&nbsp;&nbsp;(✓) YES (specify):{" "}
                        <span
                          style={{
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            width: "230px"
                          }}
                        >
                          {person.pwdType}
                        </span>
                      </>
                    ) : (
                      <>
                        (✓) NO&nbsp;&nbsp;( ) YES (specify):{" "}
                        <span
                          style={{
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            width: "230px"
                          }}
                        ></span>
                      </>
                    )}
                  </td>
                </tr>



                <br />


                <tr>
                  <td
                    colSpan={40}
                    style={{
                      height: "0.2in",
                      fontSize: "72.5%",

                      color: "white",
                    }}
                  >
                    <b>
                      <b style={{
                        color: "black",
                        fontFamily: "Times new Roman",
                        fontSize: '15px',
                        textAlign: "center",
                        display: "block",
                        border: "2px solid black",
                        fontStyle: 'italic'
                      }}>
                        {"\u00A0\u00A0"}ATTESTATION
                      </b>

                    </b>
                  </td>
                </tr>

                <table
                  style={{
                    border: "2px solid black",
                    borderCollapse: "collapse",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    width: "8in",
                    margin: "0 auto",
                    textAlign: "center",
                    tableLayout: "fixed",

                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        colSpan={40}
                        style={{
                          height: "0.2in",
                          fontSize: "12px",
                          textAlign: "justify",
                          color: "black",
                          fontFamily: "arial",
                          borderRight: "2px solid black",

                          padding: "8px", // added padding for readability
                          lineHeight: "1.5",
                        }}
                      >
                        <strong>
                          I certify that the information given above is true, complete, and accurate to the best of my knowledge and belief.
                          <br />
                          I promise to abide by the rules and regulations of Eulogio "Amang" Rodriguez Institute of Science and Technology
                          regarding the ECAT and my possible admission.
                          <br />
                          <br />
                          I am aware that any false or misleading information and/or statement may result in the refusal or disqualification
                          of my admission to the Institution.
                        </strong>
                      </td>
                    </tr>

                    <tr>
                      {/* Name Field in One Line */}
                      <td colSpan={20} style={{
                        textAlign: "center",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif",
                        verticalAlign: "top",
                        fontWeight: "bold",
                      }}>
                        <div style={{
                          display: "inline-block",
                          borderBottom: "1px solid black",
                          width: "350px",
                          marginTop: "-4px",
                          textAlign: "center",
                          fontSize: "14px", // Slightly larger for visibility
                          fontFamily: "Times New Roman",
                        }}>
                          {`${person.first_name || ""} ${person.middle_name || ""} ${person.last_name || ""} ${person.extension || ""}`.toUpperCase()}
                        </div>
                        <br />
                        <span style={{ fontSize: "12px", fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>Applicant</span>
                        <br />
                        <span style={{ fontSize: "12px", fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>(signature over printed name)</span>
                      </td>


                      {/* Date Section (unchanged) */}
                      <td colSpan={20} style={{
                        textAlign: "center",
                        padding: "8px",
                        fontWeight: "bold",
                        fontSize: "12px",
                        fontFamily: "Arial, sans-serif",
                        verticalAlign: "top",
                        borderRight: "2px solid black",
                      }}>
                        <input
                          type="text"
                          value={"_________________________________"}
                          style={{
                            paddingTop: "-1px",
                            color: "black",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '12px',
                            textDecoration: "underline",
                            width: "98%",
                            border: "none",
                            outline: "none",
                            background: "none"
                          }}
                          readOnly
                        />
                        <br />
                        Date
                        <input
                          type="text"
                          style={{
                            marginTop: "5px",
                            width: "100%",
                            border: "none",
                            outline: "none",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                          }}
                        />
                      </td>
                    </tr>

                  </tbody>
                </table>
                <br />
                <tr>
                  <td colSpan={40} style={{ padding: 0, border: "none" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontFamily: "Arial, sans-serif",
                        tableLayout: "fixed",
                      }}
                    >
                      <tbody>
                        {/* Main text cell and right-side top row */}
                        <tr>
                          <td
                            colSpan={30}
                            rowSpan={3}
                            style={{
                              border: "2px solid black",
                              textAlign: "left",
                              padding: "8px",
                              fontWeight: "bold",
                              fontSize: "12px",
                              verticalAlign: "top",
                            }}
                          >
                            This document is a sole property of Eulogio "Amang" Rodriguez Institute of Science and Technology (EARIST, Manila).
                            Any disclosure, unauthorized reproduction or use is strictly prohibited except with permission from EARIST Manila.
                          </td>
                          <td
                            colSpan={5}
                            style={{
                              borderLeft: "2px solid black",
                              borderTop: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 1 right side */}
                          </td>
                          <td
                            colSpan={5}
                            style={{
                              borderRight: "2px solid black",
                              borderTop: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 1 right side */}
                          </td>
                        </tr>

                        {/* Second row on right side */}
                        <tr>
                          <td
                            colSpan={5}
                            style={{
                              border: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 2 right side */}
                          </td>
                          <td
                            colSpan={5}
                            style={{
                              border: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 2 right side */}
                          </td>
                        </tr>

                        {/* Third row on right side */}
                        <tr>
                          <td
                            colSpan={5}
                            style={{
                              border: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 3 right side */}
                          </td>
                          <td
                            colSpan={5}
                            style={{
                              border: "2px solid black",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {/* Placeholder cell, row 3 right side */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>



              </tbody>
            </table>


          </form>


        </Container>


      </div>
    </Box >
  );
};

export default ECATApplicationForm;