/*
  Warnings:

  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `receiver_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `receivers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `senders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "receivers" DROP CONSTRAINT "receivers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "senders" DROP CONSTRAINT "senders_user_id_fkey";

-- AlterTable
ALTER TABLE "messages" DROP CONSTRAINT "messages_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "receiver_id" DROP DEFAULT,
ALTER COLUMN "sender_id" DROP DEFAULT,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "messages_receiver_id_seq";
DROP SEQUENCE "messages_sender_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "receiver_id",
DROP COLUMN "sender_id";

-- DropTable
DROP TABLE "receivers";

-- DropTable
DROP TABLE "senders";

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
