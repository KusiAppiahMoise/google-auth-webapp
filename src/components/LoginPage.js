import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return setError("Invalid email address.");
    if (!password) return setError("Please enter your password.");
    const users = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser({ name: found.name, email: found.email, picture: "" });
      resetForm();
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword)
      return setError("Please fill in all fields.");
    if (!validateEmail(email)) return setError("Invalid email address.");
    if (!validatePassword(password))
      return setError("Password must be at least 8 characters with uppercase, lowercase, and a number.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    const users = JSON.parse(localStorage.getItem("localUsers") || "[]");
    if (users.find((u) => u.email === email)) return setError("User already exists.");
    users.push({ name: fullName, email, password });
    localStorage.setItem("localUsers", JSON.stringify(users));
    setUser({ name: fullName, email, picture: "" });
    resetForm();
    navigate("/");
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const base64Url = credentialResponse.credential.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const userObj = JSON.parse(jsonPayload);
    setUser({
      name: userObj.name,
      email: userObj.email,
      picture: userObj.picture || userObj.picture_url || "",
    });
    resetForm();
    navigate("/");
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #ffffff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: "background.paper",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight={600}
            mb={3}
            sx={{ color: "primary.main" }}
          >
            {registerMode ? "Create an Account" : "Welcome Back"}
          </Typography>

          <Stack spacing={2} component="form" onSubmit={registerMode ? handleRegister : handleEmailLogin}>
            {registerMode && (
              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
                required
              />
            )}

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            {registerMode && (
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                required
              />
            )}

            {error && (
              <Typography variant="body2" color="error" textAlign="center">
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ py: 1.4, fontWeight: 600, fontSize: "1rem" }}
            >
              {registerMode ? "Register" : "Login"}
            </Button>

            <Divider sx={{ my: 1.5 }}>OR</Divider>

            <Box textAlign="center">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google login failed.")} />
            </Box>

            <Button
              variant="text"
              fullWidth
              onClick={() => {
                setRegisterMode((prev) => !prev);
                resetForm();
              }}
              sx={{ mt: 1, textTransform: "none" }}
            >
              {registerMode ? "Back to Login" : "Create an Account"}
            </Button>
          </Stack>

          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            mt={4}
            color="text.secondary"
          >
            Authentication powered by Google or email. Your data is secure.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
