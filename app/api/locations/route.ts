// TODO: MAKE SURE TO FILTER OUT LOCATIONS BASED ON FILTERS

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";


export async function GET() {
	try {
		const [rows] = await pool.query("SELECT * FROM locations");
		// Map snake_case DB fields to camelCase for frontend
		const camelRows = Array.isArray(rows) ? rows.map((row: any) => ({
			id: row.id,
			name: row.name,
			location: row.location,
			imageUrl: row.image_url,
			googleMapsUrl: row.google_maps_url,
			hasDesk: row.has_desk,
			hasSofa: row.has_sofa,
			canPurchaseFoodDrinks: row.can_purchase_food_drinks,
			allowsDrinks: row.allows_drinks,
			allowsFood: row.allows_food,
			noiseLevel: row.noise_level,
			groupFriendly: row.group_friendly,
			soloFriendly: row.solo_friendly,
			hasOutlets: row.has_outlets,
			currentBusyness: row.current_busyness, // Uncomment if needed
		})) : [];

		return NextResponse.json(camelRows, { status: 200 });
	} catch (err) {
		console.error("Error fetching locations:", err);
		return NextResponse.json({ message: "Database error", error: String(err) }, { status: 500 });
	}
}
