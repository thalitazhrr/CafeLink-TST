import { LoginForm } from "@/components/login-form"
import CoffeBanner from '@/assets/coffee-banner.jpeg'

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10" style={{backgroundImage: `url(${CoffeBanner})`, backgroundSize: 'cover'}}>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
