import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Checkbox, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import '../styles/Container.css';
import Logo from '../assets/Logo.png';
import SchoolImage from '../assets/image.png';

const LoginEnrollment = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/login", { email, password }, { headers: { "Content-Type": "application/json" } });
            console.log(response.data);
            // Store token, username, and role in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email); // Store username
            localStorage.setItem("role", response.data.role); // Store role
            localStorage.setItem("person_id", response.data.person_id); // Store role

            alert("Login successful!");
            setIsAuthenticated(true);
            // Redirect to dashboard
            navigate("/dashboard");
        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Invalid credentials");
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
                    <div style={{ border: "5px solid white" }}
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
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    className="border"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="TextField" style={{ position: 'relative' }}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        color: "rgba(0,0,0,0.3)",
                                        outline: "none",
                                        position: "absolute",
                                        top: "2.5rem",
                                        right: "1rem",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </button>
                            </div>
                            <div className="Checkbox">
                                <Checkbox id="checkbox" sx={{ color: '#A31D1D', '&.Mui-checked': { color: '#A31D1D' } }} />
                                <label htmlFor="checkbox">Remember Me</label>
                            </div>
                            <div className="Button" onClick={handleLogin}>
                                <span>Log In</span>
                            </div>
                            <div className="LinkContainer">
                                <span><Link to="/forgot_password">Forgot your password</Link></span>

                            </div>
                            <div className="LinkContainer RegistrationLink" style={{ margin: '0.1rem 0rem' }}>
                                <p>Doesn't Have an Account?</p>
                                <span><Link to={'/register'}>Register Here</Link></span>
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
}

export default LoginEnrollment;
