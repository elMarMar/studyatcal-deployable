import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type Location = RowDataPacket & {
  id: number;
  name: string;
  address: string;
};

//TODO: Rename all columns when taking in Location data
const LOCATION_SELECT_COLUMNS = '*';

export async function GET(request: Request, context: RouteContext) {
    const { id } = await context.params;
    //TODO: WRAP IN TRY/CATCH BLOCK
    // TODO: ONLY RETURN location.id = locationId
    const sql = `SELECT ${LOCATION_SELECT_COLUMNS}
                 FROM locations
                 WHERE id = ?
                 LIMIT 1;`;
    const [rows] = await pool.query<Location[]>(sql, [id]);
    return NextResponse.json({ locations: rows }, { status: 200 });
}

/*
    Notes for if I need to parse a request body in a route handler:
    export async function GET(request: Request) {
        try {
            const body = await request.json();
            const { locationId } = body;}
        } catch (error) { //... }
    }
*/