-- DropForeignKey
ALTER TABLE "Endpoint" DROP CONSTRAINT "Endpoint_appId_fkey";

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;
