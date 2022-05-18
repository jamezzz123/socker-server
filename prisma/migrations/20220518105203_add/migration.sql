-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "school_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Live Class',
    "subject_id" TEXT NOT NULL,
    "live_class_id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "state" TEXT,
    "data" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Class" ("active", "class_id", "createdAt", "data", "id", "lesson_id", "live_class_id", "school_id", "state", "subject_id") SELECT "active", "class_id", "createdAt", "data", "id", "lesson_id", "live_class_id", "school_id", "state", "subject_id" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_live_class_id_key" ON "Class"("live_class_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
