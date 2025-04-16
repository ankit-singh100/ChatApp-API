-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" VARCHAR(191) NOT NULL,
    "Password" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_Email_key" ON "users"("Email");
