import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import type { Location } from "../../../location/types";
import type { RowDataPacket } from "mysql2";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const LOCATION_SELECT_COLUMNS = `
  id,
  google_place_id AS googlePlaceId,
  name,
  location,
  image_url AS imageUrl,
  google_maps_url AS googleMapsUrl,
  has_desk AS hasDesk,
  has_sofa AS hasSofa,
  can_purchase_food_drinks AS canPurchaseFoodDrinks,
  allows_drinks AS allowsDrinks,
  allows_food AS allowsFood,
  noise_level AS noiseLevel,
  group_friendly AS groupFriendly,
  solo_friendly AS soloFriendly,
  has_outlets AS hasOutlets
`;

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const sql = `
      SELECT ${LOCATION_SELECT_COLUMNS}
      FROM locations
      WHERE id = ?
      LIMIT 1;
    `;

    const [rows] = await pool.query<RowDataPacket[]>(sql, [id]);

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Location not found" },
        { status: 404 }
      );
    }

    // SQL already aliases everything to camelCase
    const location = rows[0] as Location;

    const responseData = {
      ...location,
      hasDesk: location.hasDesk,
      hasSofa: location.hasSofa,
      canPurchaseFoodDrinks: location.canPurchaseFoodDrinks,
      allowsDrinks: location.allowsDrinks,
      allowsFood: location.allowsFood,
      groupFriendly: location.groupFriendly,
      soloFriendly: location.soloFriendly,
      hasOutlets: location.hasOutlets,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (err) {
    console.error("Error fetching location by id:", err);

    return NextResponse.json(
      {
        message: "Database error",
        error: String(err),
      },
      { status: 500 }
    );
  }
}