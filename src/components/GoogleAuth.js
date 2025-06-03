import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

function GoogleAuth({ setUser }) {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
    navigate("/");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Erreur lors de la connexion Google")}
        useOneTap
      />
    </div>
  );
}

export default GoogleAuth;