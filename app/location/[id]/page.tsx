import LocationCardBig from "@/app/components/LocationCardBig";
import { Location } from "@/app/location/types";

type Props = {
   params: Promise<{ id: string }>;
};

export default async function LocationPage({ params }: Props) {
  const { id: locationId} = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/location/${locationId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch location");
  }

  const location: Location = await res.json();

  return (
    <LocationCardBig location={location} />
  );
}