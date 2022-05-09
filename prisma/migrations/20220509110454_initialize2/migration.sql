-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lesson" TEXT NOT NULL,
    "state" TEXT,
    "data" TEXT
);
INSERT INTO "new_Class" ("data", "id", "lesson", "state") SELECT "data", "id", "lesson", "state" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
