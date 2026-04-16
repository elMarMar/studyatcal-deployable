import React from "react";
import { numberToTimeInput, timeInputToNumber } from "../../utils/time";

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
  //makes sure checkbox only stays "checked" if its name is
  //currently saved in your app's main filter list.
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
    <div className="filter-row">
      <input
        checked={isCheckedInState}
        onChange={(e) =>
          handleFilterChange(
            category,
            label,
            filters,
            setFilters,
            e.target.checked,
          )
        }
        type="checkbox"
        className="accent-[#123175] self-start mt-0.5 ml-5"
      />
      <p className="filter-label">{label}</p>
    </div>
  );
};

function handleFilterChange(
  category: string,
  value: string,
  filters: { search: string; [key: string]: any },
  setFilters: React.Dispatch<React.SetStateAction<any>>,
  isChecked: boolean,
) {
  let newFilters = { ...filters };

  switch (category) {
    //Toggle case:
    case "openNow":
      newFilters.openNow = isChecked;
      break;

    //List Filters
    case "amenities":
    case "foodAndDrinks":
    case "seatType":
    case "location":
      const currentArray = newFilters[category] || [];
      if (isChecked) {
        newFilters[category] = [...currentArray, value];
      } else {
        newFilters[category] = currentArray.filter(
          (item: string) => item !== value,
        );
      }
      break;

    //single choices
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
    <>
      <h1 className="filter-heading">Hours of Operation</h1>
      <FilterItem
        label="Open now"
        category="openNow"
        filters={filters}
        setFilters={setFilters}
      />
      <div className="filter-row">
        <p className="filter-label">Start time: </p>
        <input
          type="time"
          value={numberToTimeInput(filters.startTime)}
          onChange={(e) =>
            setFilters({
              ...filters,
              startTime: timeInputToNumber(e.target.value),
            })
          }
          className="rounded border border-[#123175] px-2 py-1"
        />
      </div>
      <div className="filter-row">
        <p className="filter-label">End time: </p>
        <input
          type="time"
          value={numberToTimeInput(filters.endTime)}
          onChange={(e) =>
            setFilters({
              ...filters,
              endTime: timeInputToNumber(e.target.value),
            })
          }
          className="rounded border border-[#123175] px-2 py-1"
        />
      </div>

      <h1 className="filter-heading">Location</h1>
      <FilterItem
        label="On Campus"
        category="location"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>
      <FilterItem
        label="South Campus"
        category="location"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>
      <FilterItem
        label="North Campus"
        category="location"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>
      <FilterItem
        label="Downtown"
        category="location"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>

      <h1 className="filter-heading">Noise Level</h1>
      <FilterItem
        label="Loud"
        category="noiseLevel"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>
      <FilterItem
        label="Quiet"
        category="noiseLevel"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>

      <h1 className="filter-heading">Food & Drinks</h1>
      <FilterItem
        label="Can purchase food/drinks"
        category="foodAndDrinks"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>
      <FilterItem
        label="Drinks Allowed"
        category="foodAndDrinks"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>
      <FilterItem
        label="Food Allowed"
        category="foodAndDrinks"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>

      <h1 className="filter-heading">Study Type</h1>
      <FilterItem
        label="Group-friendly"
        category="studyType"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>
        <FilterItem
        label="Solo-friendly"
        category="studyType"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>


      <h1 className="filter-heading">Seating</h1>
      <FilterItem
        label="Desks"
        category="seatType"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>
      <FilterItem
        label="Sofas"
        category="seatType"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>

      <h1 className="filter-heading">Amenities</h1>
      <FilterItem
        label="Has outlets"
        category="amenities"
        filters={filters}
        setFilters={setFilters}
      ></FilterItem>
    </>
  );
};

export default Filters;
