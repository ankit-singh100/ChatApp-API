/*
  Warnings:

  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `receiverId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `messages` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "messages" DROP CONSTRAINT "messages_pkey",
DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "receiver_id" SERIAL NOT NULL,
ADD COLUMN     "sender_id" SERIAL NOT NULL,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("sender_id", "receiver_id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "receiver_id" SERIAL NOT NULL,
ADD COLUMN     "sender_id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id", "receiver_id", "sender_id");

-- CreateTable
CREATE TABLE "receivers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "receivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "senders" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "senders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- AddForeignKey
ALTER TABLE "receivers" ADD CONSTRAINT "receivers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "senders" ADD CONSTRAINT "senders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "receivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "senders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
