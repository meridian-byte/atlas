/*
  Warnings:

  - You are about to drop the column `parent_note_id` on the `notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "parent_note_id";
