import { NextResponse } from "next/server";
import { faker } from '@faker-js/faker';
import { ReportCardData } from "../../../../../../lib/services/ReportCardService";

export async function GET() {

    return NextResponse.json(
        {
            aggregates: [
                { label: "Live Tours", value: faker.number.int({ min: 1, max: 100 }) },
                { label: "SGT Tours", value: faker.number.int({ min: 1, max: 100 }) },
                { label: "Organic SMS", value: faker.number.int({ min: 1, max: 100 }) },
                { label: "Organic Emails", value: faker.number.int({ min: 1, max: 100 }) },
                { label: "Leasing Agent Calls", value: faker.number.int({ min: 1, max: 100 }) },
                { label: "Automatic Emails", value: faker.number.int({ min: 1, max: 100 }) },
                { label: "Call Center Calls", value: faker.number.int({ min: 1, max: 100 }) },
            ]
        } as ReportCardData
    );
}
