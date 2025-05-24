/*
  Warnings:

  - You are about to drop the column `endpoint` on the `WebhookRequest` table. All the data in the column will be lost.
  - Added the required column `endpointId` to the `WebhookRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebhookRequest" DROP COLUMN "endpoint",
ADD COLUMN     "endpointId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WebhookRequest" ADD CONSTRAINT "WebhookRequest_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
