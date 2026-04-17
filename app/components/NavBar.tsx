import Searchbar from "./Searchbar";

type NavbarProps = {
  //must have search property (that is a string)
  //can have any other properties but they must have a string key
  filters: {
    search: string;
    [key: string]: any;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};
//TODO: add props later

function Navbar() {
  return (
    <div className="bg-[#FFFDEE] h-17 w-full shadow-sm flex items-center justify-between px-10 sticky top-0">
      <Searchbar/>
      <h1 className="text-[#185FA5] text-[46px] font-black font-nunito">
        Study at Cal
      </h1>
      <div className="flex items-center justify-content px-5 gap-5">
        <button
          className="w-auto p-2.5 bg-[#EF9F27] hover:bg-[#F1AD46] font-tienne text-white text-md font-bold rounded-xl transition"
        >
          Log in
        </button>
        <button className="w-auto p-2.5 bg-[#378ADD] hover:bg-[#599EE3] font-tienne text-white text-md font-bold rounded-xl transition">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
