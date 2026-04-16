import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./api/auth/AuthContext";


export default function Home() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
}
