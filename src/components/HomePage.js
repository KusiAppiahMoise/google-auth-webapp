import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function HomePage({ user }) {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome {user ? user.name : "to Google Auth WebApp"}!
        </Typography>
        <Typography variant="body1">
          {user
            ? "You are logged in. Enjoy exploring the app!"
            : "Please log in to access more features."}
        </Typography>
      </Paper>
    </Container>
  );
}

export default HomePage;