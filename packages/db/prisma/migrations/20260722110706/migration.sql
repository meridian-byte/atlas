/*
  Warnings:

  - You are about to drop the column `end_at` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `events` table. All the data in the column will be lost.
  - Added the required column `color` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "end_at",
DROP COLUMN "start_at",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;
