// TODO: MAKE SURE TO FILTER OUT LOCATIONS BASED ON FILTERS


import { NextResponse } from "next/server";
import { pool } from "@/lib/db";


export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const whereClauses = [];
		const values = [];
		if (searchParams.has("search")) {
			whereClauses.push("name LIKE ?");
			values.push(`%${searchParams.get("search")}%`);
		}
		if (searchParams.has("location")) {
			// Can be multiple location params
			const locations = searchParams.getAll("location");
			if (locations.length > 0) {
				whereClauses.push(`location IN (${locations.map(() => "?").join(",")})`);
				values.push(...locations);
			}
		}
		if (searchParams.has("noiseLevel")) {
			whereClauses.push("noise_level = ?");
			values.push(searchParams.get("noiseLevel"));
		}
		if (searchParams.has("openNow")) {

			if (searchParams.get("openNow") === "true") {
				// TODO: IMPLEMENT openNow Logic
			}
		}

		const where = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
		const [rows] = await pool.query(`SELECT * FROM locations ${where}`, values);

		// Map snake_case DB fields to camelCase for frontend
		const camelRows = Array.isArray(rows) ? rows.map((row: any) => ({
			id: row.id,
			google_id : row.google_place_id,
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
