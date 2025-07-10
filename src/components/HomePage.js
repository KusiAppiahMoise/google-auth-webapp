import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

function HomePage({ user }) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #e0f7fa, #ffffff)",
        p: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #007aff, #0051c7)",
              color: "white",
              textAlign: "center",
              py: 4,
            }}
          >
            <EmojiPeopleIcon sx={{ fontSize: 60, mb: 1 }} />
            <Typography variant="h5" fontWeight={600}>
              {user ? `Welcome, ${user.name}!` : "Welcome to Google Auth WebApp"}
            </Typography>
          </Box>

          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user
                ? "You're successfully logged in. Enjoy exploring the app and its features."
                : "Please log in to unlock the full experience."}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" color="text.secondary">
              Secure authentication powered by Google or email.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default HomePage;
