import LocationCardBig from "@/app/components/LocationCardBig";
import { Location } from "@/app/location/types";
import { pool } from "@/lib/db";

type Props = {
   params: Promise<{ id: string }>;
};

export default async function LocationPage({ params }: Props) {
  const { id: locationId } = await params;

  const { rows } = await pool.query(
    `SELECT
      id,
      google_place_id AS "googlePlaceId",
      name,
      location,
      description,
      image_url AS "imageUrl",
      google_maps_url AS "googleMapsUrl",
      has_desk AS "hasDesk",
      has_sofa AS "hasSofa",
      can_purchase_food_drinks AS "canPurchaseFoodDrinks",
      allows_drinks AS "allowsDrinks",
      allows_food AS "allowsFood",
      noise_level AS "noiseLevel",
      group_friendly AS "groupFriendly",
      solo_friendly AS "soloFriendly",
      has_outlets AS "hasOutlets"
    FROM locations WHERE id = $1 LIMIT 1`,
    [locationId]
  );

  if (rows.length === 0) throw new Error("Location not found");

  return <LocationCardBig location={rows[0] as Location} />;
}
