import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import LocationCard from "./components/LocationCard";
import { AuthProvider } from "./api/auth/AuthContext";
import LocationCardBig from "./components/LocationCardBig";

export default function Home() {
  return (
    <AuthProvider>
      <LocationCardBig/>
    </AuthProvider>
  );
}


/* <div className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-4 w-full content-start">
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
        </div>
      </div>

*/
