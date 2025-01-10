import LoginPage from "@/pages/login/page";
import SignUpPage from "@/pages/signup/page";


const routeList = [
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignUpPage />
    }
]

export default routeList;