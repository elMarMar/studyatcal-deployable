"use client";
import React from "react";
import { numberToTimeInput, timeInputToNumber } from "../../utils/time";
import { useFilters } from '@/app/context/FiltersContext';

const Filters = () => {
  const { filters, updateFilter, resetFilters } = useFilters();

  return (
    <div className="flex flex-col gap-2 p-2">
      <h2 className="font-tienne text-[#042C53] font-bold text-lg mt-1">Hours of Operation</h2>
      <div className="flex flex-col gap-1">
        <CheckboxItem 
          label="Open now" 
          checked={filters.openNow} 
          onChange={(checked) => updateFilter("openNow", checked, "boolean")} 
        />
        <TimeInput 
          label="Start time:" 
          value={filters.startTime} 
          onChange={(val) => updateFilter("startTime", val)} 
        />
        <TimeInput 
          label="End time:" 
          value={filters.endTime} 
          onChange={(val) => updateFilter("endTime", val)} 
        />
      </div>

      <FilterSection title="Location">
        {["On Campus", "South Campus", "North Campus", "Downtown"].map((loc) => (
          <CheckboxItem
            key={loc}
            label={loc}
            checked={filters.location.includes(loc)}
            onChange={() => updateFilter("location", loc, "multi")}
          />
        ))}
      </FilterSection>

      <FilterSection title="Noise Level">
        {["Loud", "Quiet"].map((level) => (
          <CheckboxItem
            key={level}
            label={level}
            checked={filters.noiseLevel === level}
            onChange={() => updateFilter("noiseLevel", level, "single")}
          />
        ))}
      </FilterSection>

      <FilterSection title="Food & Drinks">
        {["Can purchase food/drinks", "Drinks Allowed", "Food Allowed"].map((item) => (
          <CheckboxItem
            key={item}
            label={item}
            checked={filters.foodAndDrinks.includes(item)}
            onChange={() => updateFilter("foodAndDrinks", item, "multi")}
          />
        ))}
      </FilterSection>

      <FilterSection title="Study Type">
        {["Group-friendly", "Solo-friendly"].map((type) => (
          <CheckboxItem
            key={type}
            label={type}
            checked={filters.studyType === type}
            onChange={() => updateFilter("studyType", type, "single")}
          />
        ))}
      </FilterSection>

      <FilterSection title="Seating">
        {["Desks", "Sofas"].map((seat) => (
          <CheckboxItem
            key={seat}
            label={seat}
            checked={filters.seatType.includes(seat)}
            onChange={() => updateFilter("seatType", seat, "multi")}
          />
        ))}
      </FilterSection>

      <FilterSection title="Amenities">
        <CheckboxItem
          label="Has outlets"
          checked={filters.amenities.includes("Has outlets")}
          onChange={() => updateFilter("amenities", "Has outlets", "multi")}
        />
      </FilterSection>

      <button
        className="mt-4 w-full px-6 py-2 bg-transparent text-[#042C53] border border-[#042C53] rounded font-medium hover:bg-[#042C53] hover:text-white transition-colors duration-200 text-sm"
        onClick={resetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};

// --- Helper Sub-components for Cleanliness & Reusability ---

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <>
    <h2 className="font-tienne text-[#042C53] font-bold text-lg mt-1">{title}</h2>
    <div className="flex flex-col gap-1">{children}</div>
  </>
);

const CheckboxItem = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) => (
  <label className="font-hind-guntur font-bold text-[#042C53] flex flex-row items-center gap-2 pl-4 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="accent-[#123175] h-4 w-4 cursor-pointer"
    />
    <span className="ml-2 text-sm group-hover:text-[#123175] transition-colors">{label}</span>
  </label>
);

const TimeInput = ({ label, value, onChange }: { label: string; value: number | null; onChange: (v: number | null) => void }) => (
  <div className="flex flex-row items-center gap-2 pl-2">
    <label className="font-hind-guntur font-bold text-[#042C53] text-sm flex-1">{label}</label>
    <input
      type="time"
      value={numberToTimeInput(value)}
      onChange={(e) => onChange(timeInputToNumber(e.target.value))}
      className="rounded border border-[#123175] px-1 py-0.5 w-28 text-sm focus:ring-1 focus:ring-[#123175] outline-none"
    />
  </div>
);

export default Filters;