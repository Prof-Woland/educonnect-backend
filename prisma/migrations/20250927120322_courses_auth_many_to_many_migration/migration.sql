-- CreateTable
CREATE TABLE "public"."_AuthToCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AuthToCourses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AuthToCourses_B_index" ON "public"."_AuthToCourses"("B");

-- AddForeignKey
ALTER TABLE "public"."_AuthToCourses" ADD CONSTRAINT "_AuthToCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AuthToCourses" ADD CONSTRAINT "_AuthToCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
