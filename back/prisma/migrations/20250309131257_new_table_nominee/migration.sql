-- CreateTable
CREATE TABLE "indicate_nominee" (
    "id" SERIAL NOT NULL,
    "indicatesId" INTEGER NOT NULL,
    "indicateeId" INTEGER NOT NULL,
    "insertedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "indicate_nominee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "indicate_nominee" ADD CONSTRAINT "indicate_nominee_indicatesId_fkey" FOREIGN KEY ("indicatesId") REFERENCES "indicates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicate_nominee" ADD CONSTRAINT "indicate_nominee_indicateeId_fkey" FOREIGN KEY ("indicateeId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
