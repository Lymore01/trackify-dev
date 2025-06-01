-- CreateEnum
CREATE TYPE "EventsToSubscribe" AS ENUM ('user_created', 'user_updated', 'user_deleted', 'link_created', 'link_updated', 'link_deleted');

-- AlterTable
ALTER TABLE "Endpoint" ADD COLUMN     "subscribedEvents" "EventsToSubscribe"[];
