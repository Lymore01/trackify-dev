-- AlterTable
ALTER TABLE "UrlShort" ADD COLUMN     "appId" TEXT;

-- AddForeignKey
ALTER TABLE "UrlShort" ADD CONSTRAINT "UrlShort_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE SET NULL ON UPDATE CASCADE;
