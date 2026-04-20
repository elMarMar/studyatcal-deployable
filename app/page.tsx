import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import LocationCard from "./components/LocationCard";
import { AuthProvider } from "./api/auth/AuthContext";
import LocationCardBig from "./components/LocationCardBig";


export default async function Home() {
  // Fetch locations from the API route
  const res = await fetch("http://localhost:3000/api/locations", { cache: "no-store" });
  const data = await res.json();
  const locations = Array.isArray(data) ? data : [];

  return (
    <AuthProvider>
      <div className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-4 w-full content-start">
          {
            locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))
          }
        </div>
        <LocationCardBig/>
      </div>
    </AuthProvider>
  );
}

