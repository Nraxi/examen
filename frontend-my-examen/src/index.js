import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './handlers/ErrorPage';
import Home from './pages/Home'
import Login from './pages/Login'
import Products from './pages/Products'
import PrivateRoute from './handlers/PrivateRoute';
import StartpageLoggedIn from './pages/StartpageLoggedIn';
import LoggedOut from './pages/LoggedOut';
import Tryme from './pages/Tryme';
import Signup from './pages/Signup';
import ManageUsers from './pages/ManageUsers';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <LoggedOut />,
      },
      {
        path: "/manageusers",
        element:
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
      },
      {
        path: "/product",
        element:
          <PrivateRoute>
            <Products />
          </PrivateRoute>
      },
      {
        path: "/tryme",
        element:
          <PrivateRoute>
            <Tryme />
          </PrivateRoute>
      },
      {
        path: "/startpage",
        element:
          <PrivateRoute>
            <StartpageLoggedIn />
          </PrivateRoute>
      },
    ]
  }
])




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


