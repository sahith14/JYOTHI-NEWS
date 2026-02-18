import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.case.createMany({
    data: [
      {
        title: "TSPSC Paper Leak Case",
        description: "Recruitment exam leak case investigated by authorities.",
        sector: "Public Recruitment",
        year: 2023,
        amountInvolved: null,
        governmentInPower: "BRS Government (2014–2023)",
        legalStatus: "Under Investigation",
        sourceUrl: "https://example.com"
      },
      {
        title: "Telangana ESI Procurement Case",
        description: "Alleged irregularities in ESI medicine procurement.",
        sector: "Health",
        year: 2019,
        amountInvolved: null,
        governmentInPower: "BRS Government (2014–2023)",
        legalStatus: "Trial Ongoing",
        sourceUrl: "https://example.com"
      }
    ]
  })
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
