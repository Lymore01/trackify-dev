/*
  Warnings:

  - Added the required column `plan` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('Free_Plan', 'Premium_Plan', 'Enterprise_Plan');

-- AlterTable
ALTER TABLE "App" ADD COLUMN     "plan" "Plan" NOT NULL;
