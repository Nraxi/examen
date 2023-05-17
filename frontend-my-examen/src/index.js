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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/product",
        element:
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ,
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


