import LocationsPage from "./LocationsPage";
import { FilterProvider } from "@/app/context/FiltersContext";

export default function Home() {
  return (
    <FilterProvider>
      <LocationsPage />
    </FilterProvider>
  );
}

