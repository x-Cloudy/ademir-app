-- AlterTable
ALTER TABLE "users" ADD COLUMN     "binaryTreeid" INTEGER;

-- CreateTable
CREATE TABLE "binary_tree" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sponsorId" INTEGER,
    "leftChildId" INTEGER,
    "rightChildId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "binary_tree_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "binary_tree_userId_key" ON "binary_tree"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_binaryTreeid_fkey" FOREIGN KEY ("binaryTreeid") REFERENCES "binary_tree"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "binary_tree" ADD CONSTRAINT "binary_tree_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "binary_tree" ADD CONSTRAINT "binary_tree_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "binary_tree"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "binary_tree" ADD CONSTRAINT "binary_tree_leftChildId_fkey" FOREIGN KEY ("leftChildId") REFERENCES "binary_tree"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "binary_tree" ADD CONSTRAINT "binary_tree_rightChildId_fkey" FOREIGN KEY ("rightChildId") REFERENCES "binary_tree"("id") ON DELETE SET NULL ON UPDATE CASCADE;
