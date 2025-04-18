-- CreateTable
CREATE TABLE "messages" (
    "senderId" SERIAL NOT NULL,
    "receiverId" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("senderId","receiverId")
);
