-- CreateTable
CREATE TABLE "infor" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "number" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "infor_id_key" ON "infor"("id");
