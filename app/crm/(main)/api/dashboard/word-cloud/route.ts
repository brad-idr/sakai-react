import { NextResponse } from "next/server";
import { faker } from '@faker-js/faker';
import { ReportCardData } from "../../../../../../lib/services/ReportCardService";

export async function GET() {

    const entries = [...Array(100)].map(()=>{
      return {
        id: faker.lorem.word(),
        value: faker.number.int({min: 1, max: 50})
      }
    });
    
    return NextResponse.json(
        {
          totalEntries: entries.reduce((total, entry) => {
            return total + entry.value
          }, 0),
          uniqueEntries: entries.length,
          entries,
           
        } as ReportCardData
    );
}
