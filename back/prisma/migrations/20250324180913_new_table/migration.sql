-- CreateTable
CREATE TABLE "IndicatedUsers" (
    "id" SERIAL NOT NULL,
    "indicatorId" INTEGER NOT NULL,
    "indicatedId" INTEGER NOT NULL,

    CONSTRAINT "IndicatedUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IndicatedUsers_indicatorId_indicatedId_key" ON "IndicatedUsers"("indicatorId", "indicatedId");

-- AddForeignKey
ALTER TABLE "IndicatedUsers" ADD CONSTRAINT "IndicatedUsers_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicatedUsers" ADD CONSTRAINT "IndicatedUsers_indicatedId_fkey" FOREIGN KEY ("indicatedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
