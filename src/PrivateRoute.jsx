// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// function PrivateRoute({ component: Component, ...rest }) {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to='/login' replace/>
//         )
//       }
//     />
//   );
// }

// export default PrivateRoute;


// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/authuser" replace />;
}

export default ProtectedRoute;

