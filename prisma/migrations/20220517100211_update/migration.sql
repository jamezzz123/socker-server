/*
  Warnings:

  - You are about to drop the column `lesson` on the `Class` table. All the data in the column will be lost.
  - Added the required column `class_id` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `live_class_id` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_id` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "school_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "live_class_id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "state" TEXT,
    "data" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Class" ("data", "id", "state") SELECT "data", "id", "state" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
