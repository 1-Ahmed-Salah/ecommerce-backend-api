/*
  Warnings:

  - You are about to drop the column `defaultBillingAddressId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "defaultBillingAddressId",
ADD COLUMN     "defaultBillingAddress" TEXT;
