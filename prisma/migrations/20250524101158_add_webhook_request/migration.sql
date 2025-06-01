-- CreateTable
CREATE TABLE "WebhookRequest" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "response" TEXT,
    "payload" JSONB NOT NULL,
    "eventType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookRequest_pkey" PRIMARY KEY ("id")
);
