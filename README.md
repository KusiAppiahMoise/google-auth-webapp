# Google Authentication Web Application

This project is a web application that allows users to authenticate using Google or traditional methods. It features a clean and aesthetic navigation bar, a home page, and a login page.

## Project Structure

- **public/**: Contains static files.
  - **index.html**: The main HTML document for the application.
  - **logo.svg**: The logo displayed in the navigation bar.

- **src/**: Contains the source code for the application.
  - **App.js**: The main component that manages routing and authentication state.
  - **components/**: Contains React components.
    - **Navbar.js**: Renders the navigation bar with a logo and login button.
    - **HomePage.js**: Displays content based on the user's authentication status.
    - **LoginPage.js**: Provides options for user login.
    - **GoogleAuth.js**: Handles Google authentication flow.
  - **styles/**: Contains CSS styles.
    - **navbar.css**: Styles for the navigation bar.
  - **utils/**: Contains utility functions for authentication.
    - **auth.js**: Functions for logging in, logging out, and checking authentication status.

- **package.json**: Configuration file for npm, listing dependencies.
- **.env**: Contains environment variables, including API keys for Google authentication.
- **README.md**: Documentation for the project.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd google-auth-webapp
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Google API credentials:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=<your-client-id>
   REACT_APP_GOOGLE_CLIENT_SECRET=<your-client-secret>
   ```

5. Start the development server:
   ```
   npm start
   ```

## Features

- User can log in using Google authentication or traditional methods.
- Aesthetic navigation bar with a logo and login options.
- Home page displays user-specific content based on authentication status.

## License

All rights reserved.
