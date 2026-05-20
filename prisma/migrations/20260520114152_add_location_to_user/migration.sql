/*
  Warnings:

  - You are about to drop the column `country` on the `MasterProfile` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `MasterProfile` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `MasterProfile` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `MasterProfile` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `MasterProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "city" TEXT;
ALTER TABLE "User" ADD COLUMN "country" TEXT;
ALTER TABLE "User" ADD COLUMN "latitude" REAL;
ALTER TABLE "User" ADD COLUMN "longitude" REAL;
ALTER TABLE "User" ADD COLUMN "state" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MasterProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bio" TEXT,
    "title" TEXT,
    "city" TEXT,
    "minBudget" REAL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "MasterProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MasterProfile" ("bio", "city", "createdAt", "id", "isVerified", "minBudget", "title", "updatedAt", "userId") SELECT "bio", "city", "createdAt", "id", "isVerified", "minBudget", "title", "updatedAt", "userId" FROM "MasterProfile";
DROP TABLE "MasterProfile";
ALTER TABLE "new_MasterProfile" RENAME TO "MasterProfile";
CREATE UNIQUE INDEX "MasterProfile_userId_key" ON "MasterProfile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
