import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Link,
} from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import CreateRecipe from './pages/CreateRecipe'
import SingleRecipe from './pages/SingleRecipe'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'
import {AuthContextProvider} from './context/authContext.jsx'

import './styles.scss'
const NavFooterLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavFooterLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/CreateRecipe",
        element: <CreateRecipe />,
      },
      {
        path: "/Recipe/:id",
        element: <SingleRecipe />,
      },
      {
        path: "/UserProfile/",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
])

function App() {

  return (
    <div className='app'>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  )
}

export default App
