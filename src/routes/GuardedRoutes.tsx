import { isLoggedin } from "@/utils/user"
import { Navigate } from "react-router-dom";
import CafePage from "@/pages/cafe/page"
import CafeDetailPage from "@/pages/cafe-detail/page"
import TripPage from "@/pages/Trips/page"
import NavBar from "@/components/navbar";
import { Footer } from "@/components/footer";
const isUserAuthenticated = () => {
    return isLoggedin();
}

const GuardedRoutes = ({ children }: { children: React.ReactNode }) => {
    return isUserAuthenticated() ? <>{children}</> : <Navigate to="/" />
}

const WithNav = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <NavBar/>
            {children}
        <Footer/>
        </>
    )
}

const routeList = [
    {
        path: '/cafe',
        element: <GuardedRoutes>
            <WithNav>
                <CafePage />
            </WithNav>
        </GuardedRoutes>
    },
    {
        path: '/cafe/:id',
        element: <GuardedRoutes>
            <WithNav>
                <CafeDetailPage />
            </WithNav>
        </GuardedRoutes>
    },
    {
        path: '/trips',
        element: <GuardedRoutes>
            <WithNav>
                <TripPage />
            </WithNav>
        </GuardedRoutes>
    }
]

export default routeList;