import LocationsPage from "./LocationsPage";
import { FilterProvider } from "@/app/context/FiltersContext";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  return (
    <FilterProvider>
      <LocationsPage />
    </FilterProvider>
  );
}
