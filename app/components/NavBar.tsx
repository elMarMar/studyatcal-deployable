"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../api/auth/AuthContext";
import Link from "next/link";
import Searchbar from "./Searchbar";

function Navbar() {
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();
  return (
    <div className="bg-[#FFFDEE] h-17 w-full shadow-sm flex items-center justify-between px-10 sticky top-0 z-50">
      <Searchbar />
      <Link href="/">
        <h1 className="text-[#185FA5] text-[46px] font-black font-nunito">
          Study at Cal
        </h1>
      </Link>
      <div className="flex items-center justify-content px-5 gap-5">
        {user && isAdmin && (
          <Link href="/create-locations">
            <button
             className="w-auto p-2.5 bg-[#EF9F27] hover:bg-[#F1AD46] font-tienne text-white text-md font-bold rounded-xl transition"
            >
              Create Location
            </button>
          </Link>
        )}

        {!user ? (
          <>
            <Link href="/login">
              <button
              className="w-auto p-2.5 bg-[#EF9F27] hover:bg-[#F1AD46] font-tienne text-white text-md font-bold rounded-xl transition"
              >
                Log in
              </button>
            </Link>

            <Link href="/signup">
              <button
              className="w-auto p-2.5 bg-[#378ADD] hover:bg-[#599EE3] font-tienne text-white text-md font-bold rounded-xl transition"
              onClick={() => router.push("/signup")}
              >
                Sign up 
              </button>
            </Link>
          </>
        ) : (
          <>
            <button onClick={logout}
             className="w-auto p-2.5 bg-[#378ADD] hover:bg-[#599EE3] font-tienne text-white text-md font-bold rounded-xl transition"
             >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
