-- AlterTable
ALTER TABLE "public"."Courses" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "public"."PendingCourses" ADD COLUMN     "comments" TEXT NOT NULL DEFAULT '';
