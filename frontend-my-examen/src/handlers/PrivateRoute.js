// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const hasAccessTokenCookie = document.cookie.includes('AccessToken');

//   return hasAccessTokenCookie ? (
//     children
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default PrivateRoute;
import React from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { setJwtToken } = useOutletContext();

  if (setJwtToken !== "") {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
