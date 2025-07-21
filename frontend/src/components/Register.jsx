import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Container.css';
import Logo from '../assets/Logo.png';
import { Container, Checkbox, Box } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SchoolImage from '../assets/image.png';



const Register = () => {
    const [usersData, setUserData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:5000/register", usersData);
            setUserData({ email: '', password: '' });

            localStorage.setItem('person_id', response.data.person_id);

            navigate('/')
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <>
            <Box
                sx={{
                    /* 🔗 full‑screen background */
                    backgroundImage: `url(${SchoolImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    minHeight: "100vh",   // 100 % of the viewport height
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* keep your existing Container for the card itself */}
                <Container
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        /* you don’t need margin‑top any more because we’re vertically‑centred */
                    }}
                    maxWidth={false}   /* optional: remove MUI max‑width limit */
                >
                 <div style={{border: "5px solid white"}}
                 className="Container">

                        <div className="Header">
                            <div className="HeaderTitle">
                                <div className="CircleCon">
                                    <img src={Logo} alt="" />
                                </div>
                            </div>
                            <div className="HeaderBody">
                                <strong>EARIST</strong>
                                <p>Information System</p>
                            </div>
                        </div>
                        <div className="Body">
                            <div className="TextField">
                                <label htmlFor="email">Email Address</label>
                                <input type="text" id="email" className="border" name="email" placeholder="Enter your email address" value={usersData.email} onChange={handleChanges} />
                            </div>
                            <div className="TextField">
                                <label htmlFor="password">Password</label>
                                <input type={showPassword ? "text" : "password"} className="border" id="password" name="password" placeholder="Enter your password" value={usersData.password} onChange={handleChanges} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ color: "rgba(0,0,0,0.3)", outline: "none", position: "absolute", top: "2.5rem", right: "1rem", background: "none", border: "none", cursor: "pointer" }}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </button>
                            </div>
                            <div className="Button" onClick={handleRegister}>
                                <span>Register</span>
                            </div>
                            <div className="LinkContainer">
                                <span>Forget password?</span>
                            </div>
                            <div className="LinkContainer RegistrationLink" style={{ margin: '0.1rem 0rem' }}>
                                <p>Already Have an Account?</p>
                                <span><Link to={'/login'}>Sign In here</Link></span>
                            </div>
                        </div>
                        <div className="Footer">
                            <div className="FooterText">
                                &copy; 2025 EARIST Information System. All rights reserved.
                            </div>
                        </div>
                    </div>
                </Container>
            </Box>
        </>
    );
};

export default Register;
