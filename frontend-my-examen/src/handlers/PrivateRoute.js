import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setJwtToken } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a request to the server to check if the user is authenticated
    axios
      .get('/admin/auth', {
        withCredentials: true,
      })
      .then(response => {
        setJwtToken(response);
        setLoading(false);
        // No action needed if the response status is 200 (OK)
        // The user is authenticated and can access the protected route
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            // Access token has expired, send a POST request to refresh endpoint
            axios
              .post('/v1/refresh', null, {
                withCredentials: true,
              })
              .then(refreshResponse => {
                setJwtToken(refreshResponse);
                setLoading(false);
                // Refresh token successful, access token renewed
                // You can optionally handle additional logic here
              })
              .catch(refreshError => {
                console.error('Error refreshing access token:', refreshError);
                // Handle error case during refresh token request
                // For example, redirect to login page
                navigate('/login', { replace: true });
              });
          } else {
            // Handle other error cases
            setLoading(false);
            navigate('/login', { replace: true });
          }
        } else {
          // Handle other error cases
          setLoading(false);
          navigate('/login', { replace: true });
        }
      });
  }, [navigate, setJwtToken]);

  if (loading) {
    return null; // Render nothing while checking authentication status
  }

  return <>{children}</>;
};

export default PrivateRoute;
