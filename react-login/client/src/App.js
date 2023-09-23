import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
// import all components
import Username from './components/Username';
import Profile from './components/Profile';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Password from './components/Password';
// root routes
const router = createBrowserRouter([
    {
        path:'/',
        element: <Username></Username>
    },
    {
        path:'/register',
        element: <Register></Register>
    },
    {
        path:'/password',
        element: <Password></Password>
    },
    {
        path:'/profile',
        element: <Profile></Profile>
    },
    {
        path:'/recovery',
        element: <Recovery></Recovery>
    },
    {
        path:'/reset',
        element: <Reset></Reset>
    },
    {
        path:'*',
        element: <PageNotFound></PageNotFound>
    }
])
const App = () => {
  return (
    <main>
        <RouterProvider router={router}>

        </RouterProvider>
    </main>
  )
}

export default App