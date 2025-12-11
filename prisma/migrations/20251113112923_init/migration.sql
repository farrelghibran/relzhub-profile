/*
  Warnings:

  - Added the required column `destination` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkpoint" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "destination" TEXT NOT NULL;
