/*
  Warnings:

  - You are about to drop the column `chatRoomId` on the `API` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_API" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "API_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_API" ("createdAt", "id", "name", "ownerId", "pictureUrl", "updatedAt", "url") SELECT "createdAt", "id", "name", "ownerId", "pictureUrl", "updatedAt", "url" FROM "API";
DROP TABLE "API";
ALTER TABLE "new_API" RENAME TO "API";
CREATE TABLE "new_ChatRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ChatRoom_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "API" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChatRoom" ("apiId", "createdAt", "id", "updatedAt") SELECT "apiId", "createdAt", "id", "updatedAt" FROM "ChatRoom";
DROP TABLE "ChatRoom";
ALTER TABLE "new_ChatRoom" RENAME TO "ChatRoom";
CREATE UNIQUE INDEX "ChatRoom_apiId_key" ON "ChatRoom"("apiId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
