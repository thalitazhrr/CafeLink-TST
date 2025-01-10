import { Footer } from "@/components/footer";
import NavBar from "@/components/navbar";
import Home from "@/pages/home/page";



const routeList = [
    {
        path: '/',
        element: <> 
                <NavBar/>
                <Home/>
                <Footer/>
                </>
    }
]

export default routeList;