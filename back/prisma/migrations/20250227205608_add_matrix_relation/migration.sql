-- CreateTable
CREATE TABLE "matrix_gold" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "matrix_gold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matrix_elite" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "matrix_elite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matrix_gold" ADD CONSTRAINT "matrix_gold_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matrix_elite" ADD CONSTRAINT "matrix_elite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
