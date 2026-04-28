"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FilterState {
  search: string;
  location: string[];
  amenities: string[];
  foodAndDrinks: string[];
  seatType: string[];
  studyType: string;
  noiseLevel: string;
  startTime: number;
  endTime: number;
  openNow: boolean;
}

const initialFilters: FilterState = {
  search: "",
  location: [],
  amenities: [],
  foodAndDrinks: [],
  seatType: [],
  studyType: "",
  noiseLevel: "",
  startTime: 480, // 8:00 AM
  endTime: 1320,  // 10:00 PM
  openNow: false,
};

interface FilterContextType {
  filters: FilterState;
  updateFilter: (category: keyof FilterState, value: any, type?: "multi" | "single" | "boolean") => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateFilter = (category: keyof FilterState, value: any, type: "multi" | "single" | "boolean" = "single") => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      
      if (type === "boolean") {
        (newFilters as any)[category] = value;
      } else if (type === "multi") {
        const currentArray = (prev[category] as string[]) || [];
        (newFilters as any)[category] = currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value];
      } else {
        (newFilters as any)[category] = (prev[category] === value) ? "" : value;
      }
      
      return newFilters;
    });
  };

  const resetFilters = () => setFilters(initialFilters);

  return (
    <FilterContext.Provider value={{ filters, updateFilter, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilters must be used within a FilterProvider");
  return context;
};
