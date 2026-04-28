//import LocationIcon from "../assets/location.png";
import Doe from '../../public/doe.png';
import OpenIcon from "../assets/green-circle.png";
import ClosedIcon from "../assets/red-circle.png";
import DefaultImg from "../assets/doe.png";
// import { isOpenNow } from "../utils/time";


import { Location } from "../location/types";

type LocationCardBigProps = {
  location: Location;
};

const LocationCardBig = ({ location }: LocationCardBigProps) => {
  if (!location) return null;
  return (
    <div className="bg-[#FFFDEE] h-auto w-auto rounded-[40px] p-10 m-8 flex flex-col shadow-[8px_8px_0px_0px_#EF9F27]">
      <h2 className="font-tienne font-bold text-[#2D2D2D] text-[36px] p-2 pb-2">
        {location.name}
      </h2>
      <div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 auto-rows-min">
          <div className="flex flex-col gap-2 md:col-start-1 md:row-start-1 md:row-span-2">
            <div className="flex flex-row justify-content gap-3">
              <img
                src="./green-circle.png"
                id="LocationStatus"
                className="h-4"
              />
              <p className="font-hind-guntur font-medium text-xl text-[#2D2D2D]">
                Open Now
              </p>
            </div>
            <a
              id="address"
              className="flex flex-row justify-content gap-3"
              href={location.googleMapsUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./location.png" id="Location" className="h-4" />
              <p className="font-hind-guntur font-medium text-xl text-[#2D2D2D]">
                {location.location}
              </p>
            </a>
            <h3 className="font-tienne font-bold text-[#2D2D2D] text-[1.5rem] mt-2">
              About
            </h3>
            <ul className="font-hind-guntur font-medium text-xl text-[#2D2D2D]">
              <li>
                <p>Loudness Level: {location.noiseLevel}</p>
              </li>
              <li>
                <p>Food: {location.allowsFood ? "Food allowed" : "No food allowed"}</p>
              </li>
              <li>
                <p>Seat Type: {location.hasDesk && location.hasSofa ? "Desks and Sofa" : location.hasDesk ? "Desks" : location.hasSofa ? "Sofa" : "N/A"}</p>
              </li>
              <li>
                <p>Study Type: {location.groupFriendly && location.soloFriendly ? "Group & Solo-friendly" : location.groupFriendly ? "Group-friendly" : location.soloFriendly ? "Solo-friendly" : "N/A"}</p>
              </li>
              <li>
                <p>Amenities: {location.hasOutlets ? "Has Outlets" : "None"}</p>
              </li>
            </ul>
          </div>
          <div className="max-h-[30vh] md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2 md:max-h-[40vh]">
            <img
              src={location.imageUrl || "./Doe.png"}
              id="LocationImage"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <h3 className="font-tienne font-bold text-[#2D2D2D] text-[1.5rem] mt-2">
          Description
        </h3>
        <p className="font-hind-guntur font-medium text-xl text-[#2D2D2D]">
          {location.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default LocationCardBig;

/** Description code: 
 * <div className="font-hind-guntur font-medium text-lg text-[#2D2D2D] md:col-start-1 md:col-span-3 md:row-start-3">
            <h3 className="font-tienne font-bold text-[#2D2D2D] text-[1.5rem]">Description</h3>
           <p>
                {display.description} 
           </p>
            </div>
    
 * */
