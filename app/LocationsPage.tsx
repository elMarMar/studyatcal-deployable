"use client";
import React, { useState, useEffect } from "react";
import LocationCard from "./components/LocationCard";
import SideNav from "./components/SideNav";
import { useFilters } from "@/app/context/FiltersContext";

export default function LocationsPage() {
  const { filters } = useFilters();
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();

        // 3. Build query params dynamically
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // Handle multi-select arrays (location, amenities, etc.)
            value.forEach((v) => params.append(key, v));
          } else if (value !== "" && value !== false && value !== null) {
            // Handle strings and booleans
            params.append(key, String(value));
          }
        });

        const response = await fetch(`/api/locations?${params.toString()}`);
        const data = await response.json();

        setLocations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [filters]);

  return (
    <div className="flex flex-row w-full">
      <SideNav />
      <div className="p-3 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-4 w-full content-start">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </div>
    </div>
  );
}
