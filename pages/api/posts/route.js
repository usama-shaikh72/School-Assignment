import { createConnection } from '/lib/db';
import {NextResponse} from 'next/server';

export async function GET(){
    try {
        const db= await createConnection()
        const sql= "SELECT * FROM schools"
        const [school]= await db.query(sql)
        return NextResponse.json(schools)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message})
    }
}