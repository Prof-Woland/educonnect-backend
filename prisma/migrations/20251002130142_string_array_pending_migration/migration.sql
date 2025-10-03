/*
  Warnings:

  - The `comments` column on the `PendingCourses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."PendingCourses" DROP COLUMN "comments",
ADD COLUMN     "comments" TEXT[] DEFAULT ARRAY[]::TEXT[];
