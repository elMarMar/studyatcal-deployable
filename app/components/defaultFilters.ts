// Default filters for the Locations page, matching all possible filter fields in Filters.tsx
export const defaultFilters = {
  search: "",
  openNow: false,
  startTime: "",
  endTime: "",
  location: [], // ["On Campus", "South Campus", "North Campus", "Downtown"]
  noiseLevel: "", // "Loud" or "Quiet"
  foodAndDrinks: [], // ["Can purchase food/drinks", "Drinks Allowed", "Food Allowed"]
  studyType: "", // "Group-friendly" or "Solo-friendly"
  seatType: [], // ["Desks", "Sofas"]
  amenities: [], // ["Has outlets"]
};
