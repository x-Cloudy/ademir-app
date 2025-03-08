-- AlterTable
ALTER TABLE "matrix_elite" ADD COLUMN     "parentId" BIGINT;

-- AlterTable
ALTER TABLE "matrix_gold" ADD COLUMN     "parentId" BIGINT;

-- AddForeignKey
ALTER TABLE "matrix_gold" ADD CONSTRAINT "matrix_gold_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "matrix_gold"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matrix_elite" ADD CONSTRAINT "matrix_elite_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "matrix_elite"("id") ON DELETE SET NULL ON UPDATE CASCADE;
