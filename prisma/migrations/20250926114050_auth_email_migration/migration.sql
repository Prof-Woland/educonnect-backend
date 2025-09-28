/*
  Warnings:

  - Added the required column `email` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Auth" ADD COLUMN     "email" TEXT NOT NULL;
