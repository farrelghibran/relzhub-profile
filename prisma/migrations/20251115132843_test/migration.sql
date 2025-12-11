/*
  Warnings:

  - A unique constraint covering the columns `[random]` on the table `Checkpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Checkpoint_random_key" ON "Checkpoint"("random");
