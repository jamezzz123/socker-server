-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "school_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'Live Class',
    "subject_id" TEXT NOT NULL,
    "live_class_id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "state" TEXT,
    "data" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_live_class_id_key" ON "Class"("live_class_id");
