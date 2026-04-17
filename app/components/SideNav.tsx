//TODO: add filter props
type SideNavProps = {
  filters: { search: string; [key: string]: any };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

function SideNav() {
  return (
    <div className="bg-[#FFFDEE] h-[vw100] w-70 p-6">
    </div>  
  );
}

export default SideNav;
