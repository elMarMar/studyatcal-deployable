import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
    const data = await request.json();
    const {
        id,
        name,
        location,
        description,
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
        current_busyness
    } = data;

    try {
        const [result] = await pool.execute(
            `INSERT INTO locations (
                id, name, location, description, image_url, google_maps_url, has_desk, has_sofa, 
                can_purchase_food_drinks, allows_drinks, allows_food, noise_level, 
                group_friendly, solo_friendly, has_outlets, current_busyness
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, // 16 placeholders now
            [
                id,
                name,
                location,
                description, // Added
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
                current_busyness
            ]
        );
        return NextResponse.json({ message: 'Location created successfully'}, { status: 201 });
    } catch (err) {
        console.log(String(err));
        return NextResponse.json({ message: 'Database error', error: String(err) }, { status: 500 });
    }
}
