import { NextResponse } from "next/server";
import { faker } from '@faker-js/faker';
import { ReportCardData } from "../../../../../../lib/services/ReportCardService";

export async function GET() {

    const valid = faker.number.int({min: 1, max: 500});
    const invalid = faker.number.int({min: 1, max: 500});
    const applications = faker.number.int({min: 1, max: 800});
    const showings = faker.number.int({min:1, max: applications})
    
    return NextResponse.json(
        {
            label: "Leads",
            aggregates: [
               {label: "Total",  value: valid + invalid},
               {label: "Valid", value: valid},
               {label: "Invalid", value: invalid},
               {label: "Fit", value: faker.number.int({min: 1, max: 200})},
               {label: "Applications", value: applications},
               {label: "Showings", value: showings}
            ]
           
        } as ReportCardData
    );
}
