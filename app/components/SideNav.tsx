import Filters from "./Filters";
import Searchbar from "./Searchbar";

type SideNavProps = {
  filters: { search: string; [key: string]: any };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

function SideNav({ filters, setFilters }: SideNavProps) {
  return (
    <div className="bg-[#FFFDEE] sticky top-0 max-h-screen overflow-y-scroll w-72 p-6 flex flex-col gap-6">
      <Searchbar filters={filters} setFilters={setFilters} />
      <Filters filters={filters} setFilters={setFilters} />
    </div>
  );
}

export default SideNav;
