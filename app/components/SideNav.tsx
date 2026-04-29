import Filters from "./Filters"


function SideNav() {
  return (
    <div className="bg-[#FFFDEE] sticky top-0 max-h-screen overflow-y-scroll w-72 p-6 flex flex-col gap-6">
      <Filters />
    </div>
  );
}

export default SideNav;
