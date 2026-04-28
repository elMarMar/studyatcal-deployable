"use client";
import React, { useState, useEffect } from "react";
import LocationCard from "./components/LocationCard";
import SideNav from "./components/SideNav";
import { defaultFilters } from "./components/defaultFilters";

export default function LocationsPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [locations, setLocations] = useState([]);

  // Fetch locations whenever filters change
  useEffect(() => {
    // Build query params from filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== "" && value !== false) {
        params.append(key, value);
      }
    });
    fetch(`/api/locations?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setLocations(Array.isArray(data) ? data : []));

    console.log(filters);
  }, [filters]);

  return (
    <div className="flex flex-row w-full">
      <SideNav filters={filters} setFilters={setFilters} />
      <div className="p-3 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-4 w-full content-start">
          {locations.map((location) => (
            <LocationCard key={location.id || location.googlePlaceId} location={location} />
          ))}
        </div>
      </div>
    </div>
  );
}
