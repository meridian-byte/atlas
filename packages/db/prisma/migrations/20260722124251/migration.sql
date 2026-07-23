/*
  Warnings:

  - You are about to drop the column `color` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "calendars" ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "color";
