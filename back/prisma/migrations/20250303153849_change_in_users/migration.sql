-- AlterTable
ALTER TABLE "users" ALTER COLUMN "wallet" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT true;
