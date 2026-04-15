import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
    const data = await request.json();
    // Destructure all expected fields from the request body
    const {
        name,
        location,
        image_url,
        google_maps_url,
        has_desk,
        has_sofa,
        can_purchase_food_drinks,
        allows_drinks,
        allows_food,
        noise_level,
        group_friendly,
        solo_friendly,
        has_outlets,
        //current_busyness
    } = data;

    try {
        const [result] = await pool.execute(
            `INSERT INTO locations (
                name, location, image_url, google_maps_url, has_desk, has_sofa, can_purchase_food_drinks, allows_drinks, allows_food, noise_level, group_friendly, solo_friendly, has_outlets
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                location,
                image_url,
                google_maps_url,
                has_desk,
                has_sofa,
                can_purchase_food_drinks,
                allows_drinks,
                allows_food,
                noise_level,
                group_friendly,
                solo_friendly,
                has_outlets,
                //current_busyness || null
            ]
        );
        return NextResponse.json({ message: 'Location created successfully'}, { status: 201 });
    } catch (err) {
        console.log(String(err));
        return NextResponse.json({ message: 'Database error', error: String(err) }, { status: 500 });
    }
}