/*
  Warnings:

  - Added the required column `durationMs` to the `WebhookRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebhookRequest" ADD COLUMN     "durationMs" INTEGER NOT NULL;
