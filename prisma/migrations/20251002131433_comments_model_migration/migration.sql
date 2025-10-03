/*
  Warnings:

  - You are about to drop the column `comments` on the `PendingCourses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."PendingCourses" DROP COLUMN "comments";

-- CreateTable
CREATE TABLE "public"."AdminComments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "admin_email" TEXT NOT NULL,
    "pendCourseId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AdminComments" ADD CONSTRAINT "AdminComments_pendCourseId_fkey" FOREIGN KEY ("pendCourseId") REFERENCES "public"."PendingCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
