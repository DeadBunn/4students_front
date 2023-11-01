import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE } from "./utils/consts";
import Auth from "./pages/Auth";
import Main from "./pages/main";
import Admin from "./pages/Admin";
export const authRoutes =[
    {
        path: ADMIN_ROUTE,
        Component: Admin 
    },
]

export const publicRoutes =[
    {
        path: LOGIN_ROUTE,
        Component: Auth 
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main 
    }

]