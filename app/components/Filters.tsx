import React from "react";
import { numberToTimeInput, timeInputToNumber } from "../../utils/time";
import { defaultFilters } from "./defaultFilters";

//TODO: check this works properly and is in alignment
type FiltersProps = {
  filters: { search: string; [key: string]: any };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

type category =
  | "amenities"
  | "foodAndDrinks"
  | "seatType"
  | "location"
  | "studyType"
  | "noiseLevel"
  | "startTime"
  | "endTime"
  | "openNow";

const FilterItem = ({
  label,
  category,
  filters,
  setFilters,
}: {
  label: string;
  category: string;
  filters: { search: string; [key: string]: any };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}) => {
  let isCheckedInState = false;
  if (Array.isArray(filters[category])) {
    if (filters[category].includes(label)) {
      isCheckedInState = true;
    }
  } else {
    if (filters[category] === label || filters[category] === true) {
      isCheckedInState = true;
    }
  }

  return (
    <div className="flex flex-row items-center gap-2 pl-4 py-1">
      <input
        checked={isCheckedInState}
        onChange={(e) =>
          handleFilterChange(
            category,
            label,
            filters,
            setFilters,
            e.target.checked
          )
        }
        type="checkbox"
        name={category}
        className="accent-[#123175] h-4 w-4"
      />
      <label className="ml-2 text-sm">{label}</label>
    </div>
  );
};

function handleFilterChange(
  category: string,
  value: string,
  filters: { search: string; [key: string]: any },
  setFilters: React.Dispatch<React.SetStateAction<any>>,
  isChecked: boolean
) {
  let newFilters = { ...filters };

  switch (category) {
    case "openNow":
      newFilters.openNow = isChecked;
      break;
    case "amenities":
    case "foodAndDrinks":
    case "seatType":
    case "location":
      const currentArray = newFilters[category] || [];
      if (isChecked) {
        newFilters[category] = [...currentArray, value];
      } else {
        newFilters[category] = currentArray.filter((item: string) => item !== value);
      }
      break;
    case "studyType":
    case "noiseLevel":
      newFilters[category] = isChecked ? value : "";
      break;
    default:
      console.warn(`Category ${category} not recognized.`);
  }
  setFilters(newFilters);
}

const Filters = ({ filters, setFilters }: FiltersProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-md mt-2">Hours of Operation</h2>
      <div className="flex flex-col gap-1 pl-2">
        <FilterItem
          label="Open now"
          category="openNow"
          filters={filters}
          setFilters={setFilters}
        />
        <div className="flex flex-row items-center gap-2 pl-4 py-1">
          <label className="text-sm flex-1">Start time:</label>
          <input
            type="time"
            value={numberToTimeInput(filters.startTime)}
            onChange={(e) => setFilters({ ...filters, startTime: timeInputToNumber(e.target.value) })}
            className="rounded border border-[#123175] px-1 py-0.5 w-28"
          />
        </div>
        <div className="flex flex-row items-center gap-2 pl-4 py-1">
          <label className="text-sm flex-1">End time:</label>
          <input
            type="time"
            value={numberToTimeInput(filters.endTime)}
            onChange={(e) => setFilters({ ...filters, endTime: timeInputToNumber(e.target.value) })}
            className="rounded border border-[#123175] px-1 py-0.5 w-28"
          />
        </div>
      </div>

      <h2 className="font-bold text-md mt-2">Location</h2>
      <div className="flex flex-col gap-1 pl-2">
        <FilterItem label="On Campus" category="location" filters={filters} setFilters={setFilters} />
        <FilterItem label="South Campus" category="location" filters={filters} setFilters={setFilters} />
        <FilterItem label="North Campus" category="location" filters={filters} setFilters={setFilters} />
        <FilterItem label="Downtown" category="location" filters={filters} setFilters={setFilters} />
      </div>

      <h2 className="font-bold text-md mt-2">Noise Level</h2>
      <div className="flex flex-col gap-1 pl-2">
        <FilterItem label="Loud" category="noiseLevel" filters={filters} setFilters={setFilters} />
        <FilterItem label="Quiet" category="noiseLevel" filters={filters} setFilters={setFilters} />
      </div>

      <h2 className="font-bold text-md mt-2">Food & Drinks</h2>
      <div className="flex flex-col gap-1 pl-2">
        <FilterItem label="Can purchase food/drinks" category="foodAndDrinks" filters={filters} setFilters={setFilters} />
        <FilterItem label="Drinks Allowed" category="foodAndDrinks" filters={filters} setFilters={setFilters} />
        <FilterItem label="Food Allowed" category="foodAndDrinks" filters={filters} setFilters={setFilters} />
      </div>

      <h2 className="font-bold text-md mt-2">Study Type</h2>
      <div className="flex flex-col gap-1 pl-2">
        <FilterItem label="Group-friendly" category="studyType" filters={filters} setFilters={setFilters} />
        <FilterItem label="Solo-friendly" category="studyType" filters={filters} setFilters={setFilters} />
      </div>

      <h2 className="font-bold text-md mt-2">Seating</h2>
      <div className="flex flex-col gap-1 pl-2">
        <FilterItem label="Desks" category="seatType" filters={filters} setFilters={setFilters} />
        <FilterItem label="Sofas" category="seatType" filters={filters} setFilters={setFilters} />
      </div>

      <h2 className="font-bold text-md mt-2">Amenities</h2>
      <div className="flex flex-col gap-1 pl-2">
        <FilterItem
          label="Has outlets"
          category="amenities"
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <button
        className="mt-4 mx-auto px-4 py-1 bg-[#185FA5] text-white rounded hover:bg-[#378ADD] text-sm"
        onClick={() => setFilters(defaultFilters)}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
