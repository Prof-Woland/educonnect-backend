-- CreateTable
CREATE TABLE "public"."PendingCourses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "time" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "students_count" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "detailDescription" TEXT NOT NULL,
    "parts" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendingCourses_pkey" PRIMARY KEY ("id")
);
