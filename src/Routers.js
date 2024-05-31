import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signIn",
        element: <SignIn />,
    },
    {
        path: "/signUp",
        element: <SignUp />
    }
]);