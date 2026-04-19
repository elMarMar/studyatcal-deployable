//import LocationIcon from "../assets/location.png";
import Doe from '../../public/doe.png';
import OpenIcon from "../assets/green-circle.png";
import ClosedIcon from "../assets/red-circle.png";
import DefaultImg from "../assets/doe.png";
// import { isOpenNow } from "../utils/time";

type LocationCardBigProps = {
  location?: {
    name?: string;
    campus?: string;
    noiseLevel?: string;
    food?: string;
    seatType?: string;
    studyType?: string;
    amenities?: string;
    description?: string;
    addressUrl?: string;
    imageUrl?: string;
    openTime?: number | string | null;
    closeTime?: number | string | null;
  };
};

const LocationCardBig = () => {

  return (
    <div className="bg-[#FFFDEE] h-auto w-auto rounded-[40px] p-10 m-8 flex flex-col">
      <h2 className="font-tienne font-bold text-[#2D2D2D] text-[36px] p-2 pb-2">
        Doe Library
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 auto-rows-min">
        <div className="flex flex-col gap-2 md:col-start-1 md:row-start-1 md:row-span-2">
          <div className="flex flex-row justify-content gap-3">
            <img
              src = './green-circle.png'
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
            href="google.com"
          >
            <img src='./location.png' id="Location" className="h-4" />
            <p className="font-hind-guntur font-medium text-xl text-[#2D2D2D]">
              On Campus
            </p>
          </a>
          <h3 className="font-tienne font-bold text-[#2D2D2D] text-[1.5rem] mt-2">
            About
          </h3>
          <ul className="font-hind-guntur font-medium text-xl text-[#2D2D2D]">
            <li>
              <p>Loudness Level: Loud</p>
            </li>
            <li>
              <p>Food: No food allowed</p>
            </li>
            <li>
              <p>Seat Type: Desks and Sofa</p>
            </li>
            <li>
              <p>Study Type: Solo-friendly</p>
            </li>
            <li>
              <p>Amenities: has Outlets</p>
            </li>
          </ul>
          <h3 className="font-tienne font-bold text-[#2D2D2D] text-[1.5rem] mt-2">
            Description
          </h3>
          <p>The Doe Memorial Library is the main library of the University of California, Berkeley Library System. The library is named after its benefactor, Charles Franklin Doe, who in 1904 bequeathed funds for its construction. It is located near the center of the Berkeley campus, facing Memorial Glade, and is adjacent to and physically connected with the Bancroft Library.</p>
        </div>
        <div className="max-h-[30vh] md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2 md:max-h-[40vh]">
          <img
            src='./Doe.png'
            id="LocationImage"
            className="h-full w-full object-contain"
          />
        </div>
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
