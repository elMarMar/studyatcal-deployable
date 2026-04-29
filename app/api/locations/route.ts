import { NextResponse, NextRequest } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const whereClauses: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;

        if (searchParams.has("search")) {
            whereClauses.push(`name ILIKE $${paramIndex++}`);
            values.push(`%${searchParams.get("search")}%`);
        }

        if (searchParams.has("location")) {
            const locations = searchParams.getAll("location");
            if (locations.length > 0) {
                const placeholders = locations.map(() => `$${paramIndex++}`).join(",");
                whereClauses.push(`location IN (${placeholders})`);
                values.push(...locations);
            }
        }

        if (searchParams.has("amenities")) {
            const amenities = searchParams.getAll("amenities");
            const amenityMap: Record<string, string> = {
                "Has outlets": "has_outlets"
            };
            amenities.forEach((amenity) => {
                const dbField = amenityMap[amenity];
                if (dbField) whereClauses.push(`${dbField} = true`);
            });
        }

        if (searchParams.has("foodAndDrinks")) {
            const foodAndDrinks = searchParams.getAll("foodAndDrinks");
            const foodMap: Record<string, string> = {
                "Can purchase food/drinks": "can_purchase_food_drinks",
                "Drinks Allowed": "allows_drinks",
                "Food Allowed": "allows_food"
            };
            foodAndDrinks.forEach((item) => {
                const dbField = foodMap[item];
                if (dbField) whereClauses.push(`${dbField} = true`);
            });
        }

        if (searchParams.has("seatType")) {
            const seatTypes = searchParams.getAll("seatType");
            const seatMap: Record<string, string> = {
                "Desks": "has_desk",
                "Sofas": "has_sofa"
            };
            seatTypes.forEach((seat) => {
                const dbField = seatMap[seat];
                if (dbField) whereClauses.push(`${dbField} = true`);
            });
        }

        if (searchParams.has("noiseLevel")) {
            whereClauses.push(`noise_level = $${paramIndex++}`);
            values.push(searchParams.get("noiseLevel"));
        }

        const where = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
        const { rows } = await pool.query(`SELECT * FROM locations ${where}`, values);

        const camelRows = rows.map((row) => ({
            id: row.id,
            googlePlaceId: row.google_place_id,
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
            currentBusyness: row.current_busyness,
        }));

        return NextResponse.json(camelRows, { status: 200 });
    } catch (err) {
        console.error("Error fetching locations:", err);
        return NextResponse.json(
            { message: "Database error", error: String(err) },
            { status: 500 }
        );
    }
}
