/*
  Warnings:

  - You are about to drop the `concecionaria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `concecionaria`;

-- CreateTable
CREATE TABLE `concessionaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `cnpj` VARCHAR(255) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
