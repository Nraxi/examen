import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setJwtToken } = useOutletContext();

  useEffect(() => {
    // Make a request to the server to check if the user is authenticated
    axios.get('/admin/auth', {
      withCredentials: true,
    })
      .then(response => {
        setJwtToken(response);
        // No action needed if the response status is 200 (OK)
        // The user is authenticated and can access the protected route
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            // Access token has expired, send a POST request to refresh endpoint
            axios.post('/v1/refresh', null, {
              withCredentials: true,
            })
              .then(refreshResponse => {
                setJwtToken(refreshResponse);
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
            console.error('Error:', error);
            // Handle other error cases
          }
        } else {
          console.error('Error:', error);
          // Handle other error cases
        }
      });
  }, [navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
