import SignupForm from "./components/SignupForm";
import { AuthProvider } from "./api/auth/AuthContext";


export default function Home() {
  return (
    <AuthProvider>
      <SignupForm />
    </AuthProvider>
  )
}
