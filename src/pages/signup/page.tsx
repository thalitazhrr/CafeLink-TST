import CoffeBanner from '@/assets/coffee-banner.jpeg'
import { SignUpForm } from "@/components/signup-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10" style={{backgroundImage: `url(${CoffeBanner})`, backgroundSize: 'cover'}}>
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}
