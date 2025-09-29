/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Article` ADD COLUMN `authorId` INTEGER NULL,
    ADD COLUMN `isPublished` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `language` VARCHAR(10) NOT NULL DEFAULT 'id',
    ADD COLUMN `metaDescription` VARCHAR(500) NULL,
    ADD COLUMN `metaKeywords` VARCHAR(500) NULL,
    ADD COLUMN `metaTitle` VARCHAR(255) NULL,
    ADD COLUMN `ogImageURL` VARCHAR(255) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Article_slug_key` ON `Article`(`slug`);

-- CreateIndex
CREATE INDEX `Article_isPublished_idx` ON `Article`(`isPublished`);
