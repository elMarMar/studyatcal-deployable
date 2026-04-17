type LocationCardProps = {
  id: number;
  name: string;
  location: string;
  openTime: number | string | null;
  closeTime: number | string | null;
  imageUrl: string;
};

//TODO: Add props
//Make titles dynamic

function LocationCard() {
  return (
    <div>
      <div className="bg-[#FFFDEE] h-58 w-58 rounded-[35px] p-5 flex flex-col gap-1 shadow-[6px_6px_0px_0px_#EF9F27] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[9.5px_9.5px_0px_0px_#EF9F27] transition-all duration-150 ease-in-out">
        <h1 className="font-tienne font-bold text-[#2D2D2D] text-[20px] p-0">
          Doe Library
        </h1>
        <div className="flex flex-row justify-content gap-3">
          <img src="./green-circle.png" id="LocationStatus" className="h-4" />
          <p className="font-hind-guntur font-medium text-[#2D2D2D]">
            Open now
          </p>
        </div>
        <div id="address" className="flex flex-row justify-content gap-3">
          <img src="./location.png" id="Location" className="h-4" />
          <p className="font-hind-guntur font-medium text-[#2D2D2D]">
            On campus
          </p>
        </div>
        <img
          src="./Doe.png"
          id="LocationImage"
          className="h-28 w-auto object-contain"
        />
      </div>
    </div>
  );
}

export default LocationCard;
