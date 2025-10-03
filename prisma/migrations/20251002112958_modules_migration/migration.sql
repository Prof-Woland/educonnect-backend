/*
  Warnings:

  - You are about to drop the column `parts` on the `Courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Courses" DROP COLUMN "parts";

-- CreateTable
CREATE TABLE "public"."Modules" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lessons" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Modules" ADD CONSTRAINT "Modules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
