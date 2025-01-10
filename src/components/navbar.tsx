/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import CafeLinkLogo from "@/assets/cafelink-logo.png"
import CafeLinkText from "@/assets/cafelink-text.png"
import { isLoggedin, logOut } from "@/utils/user"
import { useLocalStorage } from "@uidotdev/usehooks"



export default function NavBar() {
  const [name,] = useLocalStorage('name', 'Guest')
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-gray-950/90 shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link to="#" className="flex items-center">
            <img
                src={CafeLinkLogo}
                alt="BucketQ"
                className="h-12 w-auto"
            />
            <img
                src={CafeLinkText}
                alt="BucketQ"
                className="h-12 w-auto"
            />
          </Link>
          <nav className="hidden text-white md:flex gap-4">
            <Link
              to="/"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Home
            </Link>
            <Link
              to="/cafe"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Cafe
            </Link>
            <Link
              to="/trips"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Trips
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {isLoggedin() && (
              <>
              <span className="text-white text-sm">{name}</span>
              <Button size="sm" onClick={() => logOut()}>
                  Logout
              </Button>
              </>
            )}
            {!isLoggedin() && (
              <>
              <Link to="/login">
                  <Button variant="outline" size="sm">
                      Sign in
                  </Button>
              </Link>
              <Link to="/signup">
                  <Button size="sm">
                      Sign up
                  </Button>
              </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}