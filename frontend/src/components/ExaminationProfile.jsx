import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Container, Typography, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import EaristLogo from "../assets/EaristLogo.png";
import '../styles/Print.css'
import { FcPrint } from "react-icons/fc";
import Search from '@mui/icons-material/Search';


const ExaminationProfile = () => {
    const [applicantID, setApplicantID] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
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


    useEffect(() => {
        const storedUser = localStorage.getItem("email");
        const storedRole = localStorage.getItem("role");
        const storedID = localStorage.getItem("person_id");

        console.log("Stored user:", storedUser);
        console.log("Stored role:", storedRole);
        console.log("Stored person_id:", storedID);

        if (storedUser && storedRole && storedID && storedID !== "undefined") {
            setUser(storedUser);
            setUserRole(storedRole);
            setUserID(storedID);

            if (storedRole === "registrar") {
                fetchApplicantNumber(storedID);  // ✅ safe to fetch here
            } else {
                window.location.href = "/login";
            }
        } else {
            console.warn("Login required or invalid stored data.");
            window.location.href = "/login";
        }
    }, []);

    const fetchApplicantNumber = async (applicant_number) => {
        if (!applicant_number) return;
        try {
            const res = await axios.get(`http://localhost:5000/uploads/by-applicant/${applicant_number}`);

        } catch (err) {
            console.error('Fetch uploads failed:', err);
            console.log("Fetching for applicant number:", applicant_number);

        }
    };



    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/upload_documents");
                setPersons(res.data);
            } catch (err) {
                console.error("Error fetching persons:", err);
            }
        };

        fetchPersons();
    }, []);



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

        } else {
            setSelectedPerson(null);

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
              margin: 0;
            }

            html, body {
              margin: 0;
              padding: 0;
              width: 210mm;
              height: 297mm;
            
              font-family: Arial, sans-serif;
              overflow: hidden;
            }

            .print-container {
              width: 110%;
              height: 100%;

              box-sizing: border-box;
   
              transform: scale(0.90);
              transform-origin: top left;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            button {
              display: none;
            }

            .student-table {
              margin-top: 5px !important;
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
            (item) =>
                item?.curriculum_id?.toString() === (person?.program ?? "").toString()
        )?.program_description || (person?.program ?? "")

    }


    return (
        <Box sx={{ height: 'calc(100vh - 120px)', overflowY: 'auto', paddingRight: 1, backgroundColor: 'transparent' }}>



            <div className="section">

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
                        EXAMINATION PROFILE
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
                        Print Examination Permit
                    </span>
                </button>

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
                    <div className="section">

                        <table
                            className="student-table"
                            style={{

                                borderCollapse: "collapse",
                                fontFamily: "Arial, Helvetica, sans-serif",
                                width: "8in",
                                margin: "0 auto", // Center the table inside the form
                                textAlign: "center",
                                tableLayout: "fixed",
                            }}
                        >
                            <style>
                                {`
                  @media print {
                    .Box {
                      display: none;
                    }

                  }
                `}
                            </style>

                            <tbody>
                                <tr>
                                    <td colSpan={2} style={{ height: "0.1in", fontSize: "72.5%" }}>
                                        <b>

                                        </b>
                                    </td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                    <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: "0.1in", fontSize: "62.5%" }}>

                                    </td>
                                </tr>
                                <tr>

                                    <td colSpan={40} style={{ height: "0.5in", textAlign: "center" }}>
                                        <table width="100%" style={{ borderCollapse: "collapse" }}>
                                            <tbody>
                                                <tr>


                                                    <td style={{ width: "20%", textAlign: "center" }}>
                                                        <img src={EaristLogo} alt="Earist Logo" style={{ marginLeft: "10px", width: "140px", height: "140px" }} />
                                                    </td>

                                                    {/* Center Column - School Information */}
                                                    <td style={{ width: "60%", textAlign: "center", lineHeight: "1", }}>
                                                        <div>Republic of the Philippines</div>
                                                        <b style={{ letterSpacing: '1px', fontSize: "20px" }}>Eulogio "Amang" Rodriguez</b>
                                                        <div style={{ letterSpacing: '1px', fontSize: "20px" }}><b>Institute of Science and Technology</b></div>
                                                        <div>Nagtahan St. Sampaloc, Manila</div>

                                                        {/* Add spacing here */}
                                                        <div style={{ marginTop: "30px" }}>
                                                            <b style={{ fontSize: "24px", letterSpacing: '1px', fontWeight: "bold" }}>
                                                                EXAMINATION PERMIT
                                                            </b>
                                                        </div>
                                                    </td>

                                                    <td
                                                        colSpan={4}
                                                        rowSpan={6}
                                                        style={{
                                                            textAlign: "center",
                                                            position: "relative",
                                                            width: "4.5cm",
                                                            height: "4.5cm",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "4.58cm",
                                                                height: "4.58cm",
                                                                marginRight: "10px",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                position: "relative",
                                                                border: "1px solid #ccc",
                                                                overflow: "hidden",
                                                                borderRadius: "4px",
                                                            }}
                                                        >
                                                            {person.profile_img ? (
                                                                <img
                                                                    src={`http://localhost:5000/uploads/${person.profile_img}`}
                                                                    alt="Profile"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "cover",
                                                                    }}
                                                                />
                                                            ) : (
                                                                <span style={{ fontSize: "12px", color: "#888" }}>No Image</span>
                                                            )}
                                                        </div>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>

                                </tr>


                            </tbody>
                        </table>
                        <div style={{ height: "30px" }}></div>
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
                                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                                    <td colSpan={40}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "flex-end",
                                                width: "100%",
                                                gap: "10px",
                                            }}
                                        >
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                                                Applicant No.:
                                            </label>
                                            <div
                                                style={{
                                                    borderBottom: "1px solid black",
                                                    fontFamily: "Arial",
                                                    fontWeight: "normal",
                                                    fontSize: "15px",
                                                    minWidth: "278px",
                                                    height: "1.2em",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {selectedPerson?.applicant_number}
                                            </div>
                                        </div>
                                    </td>


                                </tr>

                                {/* Email & Applicant ID */}
                                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                                    <td colSpan={20}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                width: "100%",
                                                gap: "10px",
                                            }}
                                        >
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                                                Name:
                                            </label>
                                            <div
                                                style={{
                                                    borderBottom: "1px solid black",
                                                    fontFamily: "Arial",
                                                    fontWeight: "normal",
                                                    fontSize: "15px",
                                                    minWidth: "328px",
                                                    height: "1.2em",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {selectedPerson?.last_name?.toUpperCase()}, {selectedPerson?.first_name?.toUpperCase()}{" "}
                                                {selectedPerson?.middle_name?.toUpperCase() || ""}{" "}
                                                {selectedPerson?.extension?.toUpperCase() || ""}
                                            </div>
                                        </div>
                                    </td>


                                    <td colSpan={20}>
                                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "10px" }}>Permit No.:</label>
                                            <span style={{ flexGrow: 1, borderBottom: "1px solid black", height: "1.2em" }}></span>
                                        </div>
                                    </td>
                                </tr>

                                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                                    <td colSpan={20}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                width: "100%",
                                                gap: "10px",
                                            }}
                                        >
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                                                Course Applied:
                                            </label>
                                            <div
                                                style={{
                                                    borderBottom: "1px solid black",
                                                    fontFamily: "Arial",
                                                    fontWeight: "normal",
                                                    fontSize: "15px",
                                                    minWidth: "300px",
                                                    height: "1.2em",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {curriculumOptions.length > 0
                                                    ? curriculumOptions.find(
                                                        (item) =>
                                                            item?.curriculum_id?.toString() === (person?.program ?? "").toString()
                                                    )?.program_description || (person?.program ?? "")
                                                    : "Loading..."}
                                            </div>
                                        </div>
                                    </td>

                                    <td colSpan={20}>
                                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "10px" }}>Major:</label>
                                            <span style={{ flexGrow: 1, borderBottom: "1px solid black", height: "1.2em" }}></span>
                                        </div>
                                    </td>
                                </tr>

                                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                                    <td colSpan={20}>
                                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "10px" }}>Date of Exam:</label>
                                            <span style={{ flexGrow: 1, borderBottom: "1px solid black", height: "1.2em" }}></span>
                                        </div>
                                    </td>
                                    <td colSpan={20}>
                                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "10px" }}>Time :</label>
                                            <span style={{ flexGrow: 1, borderBottom: "1px solid black", height: "1.2em" }}></span>
                                        </div>
                                    </td>
                                </tr>

                                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                                    <td colSpan={20}>
                                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "10px" }}>Bldg. :</label>
                                            <span style={{ flexGrow: 1, borderBottom: "1px solid black", height: "1.2em" }}></span>
                                        </div>
                                    </td>
                                    <td colSpan={20}>
                                        <div style={{ display: "flex", alignItems: "center", width: "60%" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "10px" }}>Room No. :</label>
                                            <span style={{ flexGrow: 1, borderBottom: "1px solid black", height: "1.2em" }}></span>
                                        </div>
                                    </td>
                                </tr>

                                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                                    <td colSpan={20}>
                                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "10px" }}>Scheduled by:</label>
                                            <span style={{ flexGrow: 1, borderBottom: "1px solid black", height: "1.2em" }}></span>
                                        </div>
                                    </td>

                                </tr>
                                <tr style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                                    <td colSpan={20}>
                                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap", marginRight: "10px" }}>Date:</label>
                                            <span style={{ flexGrow: 1, borderBottom: "1px solid black", height: "1.2em" }}></span>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>


                        <div style={{ height: "70px" }}></div>

                        <table
                            className="student-table"
                            style={{

                                borderCollapse: "collapse",
                                fontFamily: "Arial, Helvetica, sans-serif",
                                width: "8in",
                                margin: "0 auto", // Center the table inside the form
                                textAlign: "center",
                                tableLayout: "fixed",
                                border: "1px solid black"
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        colSpan={40}
                                        style={{
                                            textAlign: "justify",
                                            color: "black",
                                            padding: "8px",
                                            lineHeight: "1.5",
                                            textAlign: "Center",

                                            fontSize: "14px",
                                            fontFamily: "Arial, Helvetica, sans-serif",

                                            fontWeight: "200px"
                                        }}
                                    >
                                        <strong>
                                            <div>NOTE: Please bring this examination permit on the examination day together with</div>
                                            <div>Two short bond paper, pencil w/ erasers & ballpen. Please come on decent attire</div>
                                            <div>(no sleeveless or shorts) at least 1 hour before the examination</div>
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>


            </div>



        </Box>
    );
};

export default ExaminationProfile;
