import { PrismaClient } from '@prisma/client'

// tslint:disable

// This file will not be executed, just compiled to check if the typings are valid
async function main() {
  const prisma = new PrismaClient()
  const result: { key1: string; key2: number } | null =
    await prisma.atAtIdNamed.findUnique({
      where: {
        namedConstraint: {
          key1: 'data',
          key2: 2,
        },
      },
    })
  const result2: { key1: string; key2: number } | null =
    await prisma.atAtId.findUnique({
      where: {
        key1_key2: {
          key1: 'data',
          key2: 2,
        },
      },
    })
}

main().catch((e) => {
  console.error(e)
})
