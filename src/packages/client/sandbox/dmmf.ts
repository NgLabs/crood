import { getConfig, getDMMF } from '@prisma/sdk'

const datamodel = /* prisma */ `

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["uncheckedScalarInputs", "createMany"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

/// muser
model User {
  id        Int      @id @default(autoincrement())
  // some other comment
  /// some comment
  uuid      String   @default(uuid())
  email     String   @unique
  firstName String
  lastName  String
  password  String
  status    Boolean  @default(true)
  locked    Boolean  @default(false)
  role      Role     @default(USER)
  public    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  trips      Trip[]
  activities UsersToActivities[]
}

model Trip {
  id            Int      @id @default(autoincrement())
  uuid          String   @default(uuid())
  userId        Int
  name          String
  description   String?
  public        Boolean
  dateFrom      DateTime
  dateTo        DateTime
  adults        Int
  children      Int?     @default(0)
  infants       Int?     @default(0)
  backgroundUrl String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  user       User       @relation(fields: [userId], references: [id])
  activities Activity[]

  @@unique([userId, id])
}

model Activity {
  id             Int      @id @default(autoincrement())
  uuid           String   @default(uuid())
  tripId         Int
  activityTypeId Int
  name           String
  description    String?
  location       String
  date           DateTime
  timezone       String
  public         Boolean
  maxPeople      Int?     @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  trip         Trip                @relation(fields: [tripId], references: [id])
  activityType ActivityType        @relation(fields: [activityTypeId], references: [id])
  users        UsersToActivities[]

  @@unique([tripId, id])
}

model ActivityType {
  id        Int      @id @default(autoincrement())
  uuid      String   @default(uuid())
  name      String
  type      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  activities Activity[]
}

model UsersToActivities {
  userId     Int
  activityId Int
  createdAt  DateTime @default(now())

  user     User     @relation(fields: [userId], references: [id])
  activity Activity @relation(fields: [activityId], references: [id])

  @@id([userId, activityId])
}

enum Role {
  USER
  ADMIN
}
`

async function main() {
  const dmmf = await getDMMF({ datamodel })
  console.log(dmmf)
  const config = await getConfig({ datamodel, ignoreEnvVarErrors: true })
  console.log(config)
  debugger
}

main()