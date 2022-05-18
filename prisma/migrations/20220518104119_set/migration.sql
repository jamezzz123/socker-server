/*
  Warnings:

  - A unique constraint covering the columns `[live_class_id]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_live_class_id_key" ON "Class"("live_class_id");
