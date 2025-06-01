/*
  Warnings:

  - Added the required column `signingSecret` to the `Endpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Endpoint" ADD COLUMN     "signingSecret" TEXT NOT NULL;
