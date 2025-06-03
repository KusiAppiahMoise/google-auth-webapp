import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

// Email and password validation helpers
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);

function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [registerMode, setRegisterMode] = useState(false);

  const navigate = useNavigate();

  // Email/password login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ name: found.name, email: found.email, picture: "" });
      setError("");
      setEmail("");
      setPassword("");
      setFullName("");
      setConfirmPassword("");
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  // Registration
  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, and a number."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("localUsers") || "[]");
    if (users.find((u) => u.email === email)) {
      setError("User already exists.");
      return;
    }
    users.push({ name: fullName, email, password });
    localStorage.setItem("localUsers", JSON.stringify(users));
    setUser({ name: fullName, email, picture: "" });
    setError("");
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");
    navigate("/");
  };

  // Google login
  const handleGoogleSuccess = (credentialResponse) => {
    const base64Url = credentialResponse.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const userObj = JSON.parse(jsonPayload);
    setUser({
      name: userObj.name,
      email: userObj.email,
      picture: userObj.picture || userObj.picture_url || "",
    });
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");
    setError("");
    navigate("/");
  };

  const handleGoogleError = () => {
    setError("Google Login Failed. Please try again.");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          {registerMode ? "Register for Google Auth WebApp" : "Sign in to Google Auth WebApp"}
        </Typography>
        {!registerMode && (
          <>
            <Box sx={{ mt: 4 }}>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            </Box>
            <Divider sx={{ my: 4 }}>or</Divider>
            <form onSubmit={handleEmailLogin}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                error={!!error && error.toLowerCase().includes("email")}
                helperText={!!error && error.toLowerCase().includes("email") ? error : ""}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                error={!!error && error.toLowerCase().includes("password")}
                helperText={!!error && error.toLowerCase().includes("password") ? error : ""}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login with Email
              </Button>
            </form>
            <Button
              variant="text"
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => {
                setRegisterMode(true);
                setError("");
                setEmail("");
                setPassword("");
                setFullName("");
                setConfirmPassword("");
              }}
            >
              Register
            </Button>
          </>
        )}
        {registerMode && (
          <>
            <form onSubmit={handleRegister}>
              <TextField
                label="Full Name"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                fullWidth
                margin="normal"
                error={!!error && error.toLowerCase().includes("name")}
                helperText={!!error && error.toLowerCase().includes("name") ? error : ""}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                error={!!error && error.toLowerCase().includes("email")}
                helperText={!!error && error.toLowerCase().includes("email") ? error : ""}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                error={!!error && error.toLowerCase().includes("password") && !error.toLowerCase().includes("confirm")}
                helperText={!!error && error.toLowerCase().includes("password") && !error.toLowerCase().includes("confirm") ? error : ""}
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
                error={!!error && error.toLowerCase().includes("confirm")}
                helperText={!!error && error.toLowerCase().includes("confirm") ? error : ""}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </form>
            <Button
              variant="text"
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => {
                setRegisterMode(false);
                setError("");
                setEmail("");
                setPassword("");
                setFullName("");
                setConfirmPassword("");
              }}
            >
              Back to Login
            </Button>
          </>
        )}
        {error && !(
          error.toLowerCase().includes("email") ||
          error.toLowerCase().includes("password") ||
          error.toLowerCase().includes("name") ||
          error.toLowerCase().includes("confirm")
        ) && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Typography variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
          Your authentication is secure and powered by Google or email.
        </Typography>
      </Paper>
    </Container>
  );
}

export default LoginPage;