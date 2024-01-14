import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const session = await supabase.auth.getSession();

      console.log(session);

      // Check if the user is authenticated
      const authTokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="));
      
      if (!authTokenCookie) {
        // If not authenticated, redirect to the login page
        navigate("/");
      } else {
        const authToken = authTokenCookie.split("=")[1];

        // You can use authToken for additional checks or validation if needed
      }
    };

    // Call the asynchronous function
    checkAuthentication();
  }, [navigate]);

  // Render the provided element (component)
  return <>{element}</>;
};

export default PrivateRoute;
